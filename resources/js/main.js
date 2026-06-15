// ==========================
// زر البحث
// ==========================

function searchProperties() {

    let cityInput = document.getElementById("city").value;
    let typeInput = document.getElementById("type").value;
    let priceInput = document.getElementById("price").value;
    let stateInput = document.getElementById("state").value;

    if (cityInput === "" ||
        typeInput === "" ||
        priceInput === "" ||
        stateInput === ""
    ) {

        alert("الرجاء إدخال جميع البيانات");
        return;
    }
    else {
    alert("تم إرسال بيانات البحث");
    }

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

//لفتح التفاصيل
//============
//let cards = document.querySelectorAll(".property-card");

cards.forEach(function(card){

    card.addEventListener("click", function(){

        let id = card.getAttribute("data-id");

        window.location.href = "details.html?id=" + id;

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
let expanded = false;


// عند الضغط على زر عرض المزيد
btn.onclick = function () {

    if(expanded === false){
        hiddenCards.forEach(function (card) {

            card.style.display = "block";
        });

        btn.innerHTML = "↑ عرض أقل";
        expanded = true;

    }else{

        hiddenCards.forEach(function (card) {

            card.style.display = "none";
        });

        btn.innerHTML = "عرض المزيد";
        expanded = false;
    }
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

//عرض العقارات في الرئيسية
// جلب العقارات


let properties = JSON.parse(localStorage.getItem("properties")) || [];

let container = document.querySelector(".property-grid");

properties.forEach(function(p){

    container.innerHTML += `
        <div class="property-card" data-id="${p.id}">

            <div style="position: relative;">
                <img src="/public/images/default.jpg">
               <span class="tag">
               ${p.state === "sale" ? "للبيع" : "للإيجار"}
              </span>
            </div>

            <div class="content">
                <div class="price">${p.price}</div>

                <h4>${p.title}</h4>

                <p>${p.location}</p>

                <div class="details">
                    <span>${p.rooms} غرف</span>
                    <span>${p.baths} حمامات</span>
                    <span>${p.space} م²</span>
                </div>

            </div>

        </div>
    `;
});




//فتح التفاصيل
document.addEventListener("click", function (e) {

    let card = e.target.closest(".property-card");

    if (card) {
        let id = card.getAttribute("data-id");
        window.location.href = "details.html?id=" + id;
    }

});
