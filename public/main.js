// ==========================
// زر البحث
// ==========================

function searchProperties() {

    let cityInput = document.getElementById("city").value;

    if (cityInput === "") {

        alert("الرجاء إدخال المدينة أو المنطقة");
        return;
    }

    alert("تم إرسال بيانات البحث");

}

// ==========================
// تأثير ظهور بطاقات العقارات
// ==========================

let cards = document.querySelectorAll(".property-card");

cards.forEach(function(card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

});

window.addEventListener("scroll", function () {

    cards.forEach(function(card) {

        let cardTop = card.getBoundingClientRect().top;

        if (cardTop < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "0.7s";

        }

    });

});



// ==========================
// تأثير Hover للكروت
// ==========================

cards.forEach(function(card) {

    card.addEventListener("mouseenter", function() {

        card.style.transform = "scale(1.03)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseleave", function() {

        card.style.transform = "scale(1)";

    });

});


// ==========================
// تأثير كتابة العنوان الرئيسي
// ==========================

let mainTitle = document.querySelector(".search-section h2");

let originalText = mainTitle.innerHTML;

mainTitle.innerHTML = "";

let index = 0;

function typeWriter() {

    mainTitle.innerHTML += originalText[index];

    index++;

    if (index < originalText.length) {

        setTimeout(typeWriter, 80);

    }

}

typeWriter();

//================
// زر عرض المزيد
//================
const btn = document.getElementById("showMoreBtn");
const hiddenCards = document.querySelectorAll(".hidden-property");
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {

    btn.style.display = "flex";

} else {

    btn.style.display = "none";

    hiddenCards.forEach(card => {
        card.style.display = "none";
    });

}


btn.onclick = function () {

    hiddenCards.forEach(card => {

        if(card.style.display === "block"){
            card.style.display = "none";
            btn.innerHTML = 'عرض المزيد <span>←</span>';
            btn.classList.remove("active");
        } else {
            card.style.display = "block";
            btn.innerHTML = 'عرض أقل <span>^</span>';
            btn.classList.add("active");
        }

    });

};
//================
//الروابط السريعة لاظهر عقارات للبيع وللايجار وكل العقارات
//البيع
function showSale() {

    let properties = document.querySelectorAll(".property-card");

    properties.forEach(function(property) {

        if (property.dataset.state === "sale") {

            property.style.display = "block";

        } else {

            property.style.display = "none";

        }

    });

}

//عقارات الايجار
function showRent() {

    let properties = document.querySelectorAll(".property-card");

    properties.forEach(function(property) {

        if (property.dataset.state === "rent") {

            property.style.display = "block";

        } else {

            property.style.display = "none";

        }

    });

}

//كل العقارات
function showAll() {

    let properties = document.querySelectorAll(".property-card");

    properties.forEach(function(property) {

        property.style.display = "block";

    });

}

