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

    document.getElementById("price").innerText = property.price || "";

    document.getElementById("location").innerText = property.location || "";

    document.getElementById("status").innerText = property.status || "متاح";

    document.getElementById("description").innerText = property.description || "";

    document.getElementById("space").innerText = property.space || "";

    document.getElementById("rooms").innerText = property.rooms || "";

    document.getElementById("baths").innerText = property.baths || "";

    document.getElementById("direction").innerText = property.direction || "";

    // الصورة
    if (property.images && property.images.length > 0) {
        document.getElementById("mainImage").src = property.images[0];
    }

    //موقع عالخريطة
    let lat = property.pointOfWidth;
    let lng = property.pointOfLength;
     // إذا الإحداثيات موجودة
    if (lat !== undefined && lng !== undefined) {
       document.getElementById("map").src =
          `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
     } else {
      document.querySelector(".map-section").style.display = "none";
   }



}
else {
    document.body.innerHTML =
        "<h2 style='text-align:center;color:red'>العقار غير موجود</h2>";
}

