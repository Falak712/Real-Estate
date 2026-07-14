// ==========================
// زر البحث
// ==========================
/*
function searchProperties() {

    let cityInput = document.getElementById("city").value;
    let typeInput = document.getElementById("type").value;
    let priceInput = document.getElementById("price").value;
    let stateInput = document.getElementById("state").value;
    let currencyInput = document.getElementById("currencyFilter").value;
    let cards = document.querySelectorAll(".property-card");



    if (cityInput === "" ||
        typeInput === "" ||
        priceInput === "" ||
        stateInput === "" ||
        currencyInput === ""
    ) {

        alert("الرجاء إدخال جميع البيانات");
        return;
    }
    else {
    alert("تم إرسال بيانات البحث");
    }

}
*/
function searchProperties() {
    let city = document.getElementById("city").value.toLowerCase();
    let type = document.getElementById("type").value;
    let currency = document.getElementById("currencyFilter").value;
    let price = document.getElementById("price").value;
    let state = document.getElementById("state").value;

    let cards = document.querySelectorAll(".property-card");

    cards.forEach((card) => {
        let match = true;

        if (city && !card.innerText.toLowerCase().includes(city)) {
            match = false;
        }

        if (type && card.dataset.type !== type) {
            match = false;
        }

        if (currency && card.dataset.currency !== currency) {
            match = false;
        }

        if (state && card.dataset.state !== state) {
            match = false;
        }

        let propertyPrice = Number(card.dataset.price);

        if (price === "low" && propertyPrice >= 500000) {
            match = false;
        }

        if (price === "medium" &&
            (propertyPrice < 500000 || propertyPrice > 2000000)) {
            match = false;
        }

        if (price === "high" && propertyPrice <= 2000000) {
            match = false;
        }
        // ============================

        card.style.display = match ? "block" : "none";

    });
}

//login
/*let logbtn = document.getElementById("logbtn");

let isLoggedIn = localStorage.getItem("loggedIn");

if (isLoggedIn === "true") {

    authBtn.innerText = "تسجيل خروج";

    authBtn.href = "#";

    authBtn.onclick = function (e) {
        e.preventDefault();

        localStorage.removeItem("loggedIn");

        window.location.reload();
    };
}*/


//================
// زر عرض المزيد
/*
const btn = document.getElementById("showMoreBtn");
const hiddenCards = document.querySelectorAll(".hidden-property");
let expanded = false;

// عند الضغط على زر عرض المزيد
btn.onclick = function () {
    if (expanded === false) {
        hiddenCards.forEach(function (card) {
            card.style.display = "block";
        });

        btn.innerHTML = "↑ عرض أقل";
        expanded = true;
    } else {
        hiddenCards.forEach(function (card) {
            card.style.display = "none";
        });

        btn.innerHTML = "عرض المزيد";
        expanded = false;
    }
};
*/
const btn = document.getElementById("showMoreBtn");
let expanded = false;

btn.onclick = function () {
     // التحقق من تسجيل الدخول
     if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "../views/login.html";
        return;
    }
    const hiddenCards = document.querySelectorAll(".hidden-property");

    hiddenCards.forEach(function (card) {

        if (expanded) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }

    });

    expanded = !expanded;

    if (expanded) {
        btn.innerHTML = "↑ عرض أقل";
    } else {
        btn.innerHTML = "عرض المزيد←";
    }
};

let properties = JSON.parse(localStorage.getItem("properties")) || [];

let container = document.querySelector(".property-grid");
let showMoreBtn = document.getElementById("showMoreBtn");

container.innerHTML = "";

properties.forEach(function (p, index) {


    let hiddenClass = index >= 3 ? "hidden-property" : "";

    container.innerHTML += `
      <div
        class="property-card ${hiddenClass}"
        data-id="${p.id}"
        data-type="${p.type}"
        data-state="${p.state}"
        data-currency="${p.currency}"
        data-price="${p.price}">

            <div style="position: relative;">
                <img src="${p.images && p.images.length ? p.images[0] : 'images/default.jpg'}">
                <span class="tag">
                    ${p.state === "sale" ? "للبيع" : "للإيجار"}
                </span>
            </div>

            <div class="content">
                <div class="price">
                    ${p.price.toLocaleString()} ${p.currency}
                </div>

                <h4>${p.title}</h4>

                <p>${p.location}</p>

                <div class="details">
                    <span> <i class="fa-solid fa-bed"></i> ${p.rooms} غرف</span>
                    <span> <i class="fa-solid fa-bath"></i> ${p.baths} حمامات</span>
                    <span> <i class="fa-solid fa-ruler-combined"></i> ${p.space} م²</span>
                </div>
            </div>

        </div>
    `;
});



// إظهار أو إخفاء زر عرض المزيد
if (properties.length <= 3) {
    showMoreBtn.style.display = "none";
} else {
    showMoreBtn.style.display = "block";
}


// ==========================
// تأثير ظهور بطاقات العقارات
// ==========================

let cards = document.querySelectorAll(".property-card");

cards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
});

window.addEventListener("scroll", function () {
    cards.forEach(function (card) {
        let cardTop = card.getBoundingClientRect().top;

        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "0.7s";
        }
    });
});



//فتح التفاصيل
document.addEventListener("click", function (e) {
    let card = e.target.closest(".property-card");

    if (card) {
        let id = card.getAttribute("data-id");
        window.location.href = "details.html?id=" + id;
    }
});

/*زر القائمة للموبايل*/
const menuBtn = document.getElementById("menubtn");
const navLinks = document.getElementById("navlinks");

menuBtn.onclick = function () {
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }
};

/*زر تسجيل الدخول يتحول لتتسجيل خروج*/
const authBtn = document.getElementById("authBtn");

if (localStorage.getItem("isLoggedIn") === "true") {
    authBtn.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i> تسجيل خروج';

    authBtn.href = "#";

    authBtn.onclick = function (e) {
        e.preventDefault();

        // حذف حالة تسجيل الدخول
        localStorage.removeItem("isLoggedIn");

        // إعادة تحميل الصفحة
        location.reload();
    };
}

function goToAddProperty(e) {

    e.preventDefault();

    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "add-property.html";
    } else {
        window.location.href = "login.html";
    }
}


document.getElementById("addPropertyBtn").onclick = goToAddProperty;
document.getElementById("mobileAddPropertyBtn").onclick = goToAddProperty;
