// ==========================
// صفحة تفاصيل العقار
// ==========================

let description = document.getElementById("description");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");



// 1. نجيب id من الرابط
let params = new URLSearchParams(window.location.search);
let id = params.get("id");

// 2. نجيب البيانات من التخزين (حالياً localStorage)
let properties = JSON.parse(localStorage.getItem("properties")) || [];

// 3. نبحث عن العقار حسب id
let property = properties.find(function (item) {
    return item.id == id;
});

// 4. إذا موجود
if (property) {

    document.getElementById("title").innerText = property.title || "";

    //document.getElementById("price").innerText = property.price || "";

    document.getElementById("location").innerText = property.location || "";

    document.getElementById("status").innerText = property.status || "متاح";

    document.getElementById("description").innerText = property.description || "";

    document.getElementById("space").innerText = property.space || "";

    document.getElementById("rooms").innerText = property.rooms || "";

    document.getElementById("baths").innerText = property.baths || "";

    document.getElementById("direction").innerText = property.direction || "";

    document.getElementById("type").innerText = property.type || "";



   // document.getElementById("currency").innerText = property.currency || "";

    const currencySymbols = {
        USD: "$",
        SYP: "ل.س"
    };

    let symbol = currencySymbols[property.currency] || property.currency;

     document.getElementById("price").innerText =
        `${Number(property.price).toLocaleString()} ${symbol}`;



    // الصورة
    if (property.images && property.images.length > 0) {

        let mainImage = document.getElementById("mainImage");
        let thumbnails = document.querySelector(".thumbnails");

        mainImage.src = property.images[0];

        thumbnails.innerHTML = "";

        property.images.forEach(function(image) {

            let img = document.createElement("img");

            img.src = image;

            img.onclick = function () {
                mainImage.src = image;
            };

            thumbnails.appendChild(img);

        });

    }

    //موقع عالخريطة
    /*
    let lat = property.pointOfWidth;
    let lng = property.pointOfLength;
    //اذا الاحداثيات موجودة
    if (lat !== undefined && lng !== undefined) {
       document.getElementById("map").src =
          `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
     } else {
      document.querySelector(".map-section").style.display = "none";
   }
      if (property.location) {
        document.getElementById("map").src =
            `https://www.google.com/maps?q=${property.location}&output=embed`;
    } else {
        document.querySelector(".map-section").style.display = "none";
    }
*/
let lat = property.latitude;
let lng = property.longitude;

// إذا في إحداثيات (الأفضل)
if (lat && lng) {
    document.getElementById("map").src =
        `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
}
/*
// إذا ما في إحداثيات → نستخدم النص (الحالي عندك)
else if (property.location) {
    document.getElementById("map").src =
        `https://www.google.com/maps?q=${property.location}&output=embed`;
}*/

// إذا لا هذا ولا هذا → نخفي الخريطة
else {
    document.querySelector(".map-section").style.display = "none";
}

}
else {
    document.body.innerHTML =
        "<h2 style='text-align:center;color:red'>العقار غير موجود</h2>";
}

//زر الشراء والاستئجار
let buyBtn = document.querySelector(".buy-btn");
let rentBtn = document.querySelector(".rent-btn");

buyBtn.onclick = function () {
    window.location.href = `../realEstate/rental-Booking.html?type=buy&id=${property.id}`;
}

rentBtn.onclick = function () {
    window.location.href = `../realEstate/rental-Booking.html?type=rent&id=${property.id}`;
}

//حالة العقار
let statusText = "";

switch (property.status) {

    case "available":
        statusText = "متاح";
        break;

    case "booked":
        statusText = "محجوز";
        break;

    case "sold":
        statusText = "مباع";
        break;

    default:
        statusText = "غير معروف";
}

document.getElementById("status").innerText = statusText;


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