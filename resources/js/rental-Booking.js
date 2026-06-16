let params = new URLSearchParams(window.location.search);

let id = Number(params.get("id"));

let type = params.get("type");

let properties = JSON.parse(localStorage.getItem("properties")) || [];

//البحث عن العقار المطلوب
let property = properties.find(function(item) {
    return item.id == id;
});

let bookingInfo = document.getElementById("bookingInfo");

let pageTitle = document.getElementById("pageTitle");

console.log(type);

let publishBtn = document.getElementById("publishBtn");

if (type === "buy") {

    // تغيير عنوان الصفحة
    pageTitle.innerText = "طلب شراء عقار";

    // إخفاء معلومات الحجز
    bookingInfo.style.display = "none";

    // تغيير نص الزر
    publishBtn.innerText = "ارسال طلب الشراء";
}

else if (type === "rent") {

    // إبقاء العنوان كما هو
    pageTitle.innerText = "طلب حجز عقار";
    // تغيير نص الزر
    publishBtn.innerText = "إرسال طلب الحجز";
}


//تأثير الظهور عند التمرير
let reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll", function(){

  reveals.forEach(function(card){

    let windowHeight =
    window.innerHeight;

    let cardTop =
    card.getBoundingClientRect().top;

    if(cardTop < windowHeight - 100){

      card.classList.add("active");

    }

  });

});

//زر العودة

let backBtn = document.getElementById("backBtn");
let propertyId = params.get("id");

backBtn.onclick = function () {
    window.location.href = `details.html?id=${propertyId}`;
};

if (property) {

    document.getElementById("name").value = property.title || "";

    document.getElementById("price").value = property.price || "";

    document.getElementById("city").value = property.location || "";

    document.getElementById("propertyType").value = property.type || "";

    document.getElementById("sdate").addEventListener("change", calculateDays);

    document.getElementById("edate").addEventListener("change", calculateDays);
}

let startDate = document.getElementById("sdate").value;
let endDate = document.getElementById("edate").value;

publishBtn.onclick = function () {

    let name = document.getElementById("name").value.trim();

    let phone = document.getElementById("phone-number").value.trim();

    let email = document.getElementById("email").value.trim();

    let startDate = document.getElementById("sdate").value;

    let endDate = document.getElementById("edate").value;

    // التأكد من تعبئة جميع الحقول
    if ( !phone ||
         !name ||
         !email
    ) {
        alert("يرجى تعبئة جميع الحقول");
        return;
    }

    if(type === "rent")
    {
        //  تحقق من التواريخ
    if (!startDate || !endDate) {
        alert("يرجى إدخال تاريخ البداية والنهاية");
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        alert("تاريخ البداية يجب ان يكون قبل تاريخ النهاية");
        return;
    }
    }


    // إنشاء الطلب
    let request = {
        id: Date.now(),
        propertyId: property.id,
        type: type,
        startDate: startDate,
        endDate: endDate,
        status: "pending"
    };

    // تخزين الطلب
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("تم إرسال الطلب بنجاح ");
    window.location.href = "index.html";
};


let request = {
    id: Date.now(),
    propertyId: property.id,
    type: type,
    startDate,
    endDate,
    days: days,
    status: "pending"
};

//حساب عدد الأيام بين تاريخ البداية والنهاية
function calculateDays() {

    let sdate = document.getElementById("sdate").value;
    let edate = document.getElementById("edate").value;
    let daysInput = document.getElementById("days");

    if (sdate && edate) {

        let start = new Date(sdate);
        let end = new Date(edate);

        //حساب كم يوم الحجز
        let diffTime = end - start;

        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));// تحويل الفرق من ميلي ثانية لأيام باستخدام math

        daysInput.value = diffDays > 0 ? diffDays : 0;
    }
}