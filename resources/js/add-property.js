//صفحة اضافة عقار
//اختيار نوع العقار

let typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(button => {
    button.onclick = function () {

        typeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
    };
});

let title = document.getElementById("title");
let price = document.getElementById("price");
let city = document.getElementById("city");
let description = document.getElementById("descriptionInput");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");
let currency = document.getElementById("currency");
//let currency = localStorage.getItem("currency") || "SYP";



//التحقق من الحقول قبل النشر
//زر نشر العقار

let publishButton = document.querySelector(".publish");

publishButton.onclick = function (e) {

    e.preventDefault();



    let stateBtn = document.querySelector(".type-btn.active");

    let state = stateBtn ? stateBtn.dataset.state : "";

    let type = document.querySelector(".type-btn.active")?.innerText || "غير محدد";


     if (
        title.value === "" ||
        price.value === "" ||
        city.value === "" ||
        description.value === "" ||
        space.value === "" ||
        rooms.value === "" ||
        baths.value === "" ||
        direction.value === "" ||
        currency.value === ""
    ) {
        alert("الرجاء ملء جميع الحقول المطلوبة");
        return;
    }

    let formData = new FormData();


formData.append("title", title.value);
formData.append("price", Number(price.value));
formData.append("currency", currency.value);
formData.append("location", city.value);
formData.append("description", description.value);

formData.append("space", space.value);
formData.append("rooms", rooms.value);
formData.append("baths", baths.value);

formData.append("direction", direction.value);

formData.append("type", type);

formData.append("state", state);


// الحالة عند الأدمن
formData.append("status", "pending");


// الإحداثيات
formData.append(
    "latitude",
    document.getElementById("lat").value
);

formData.append(
    "longitude",
    document.getElementById("lng").value
);


// صور العقار
imagesArray.forEach(function(image){

    formData.append("images[]", image);

});


// الهوية
if(identityFile){
    formData.append(
        "identityImage",
        identityFile
    );
}


// وثيقة الملكية
if(ownershipFile){
    formData.append(
        "ownershipImage",
        ownershipFile
    );
}
console.log([...formData]);

alert("تم إرسال العقار للمراجعة");

window.location.href = "../views/index.html";
};



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

let identityInput = document.querySelector("#identityImage");
let identityFile = null;
let identityPreview = document.querySelector(".identity-preview");

identityInput.onchange = function () {

    let file = identityInput.files[0];


    if (!file) return;
    identityFile = file;


    let name = file.name.toLowerCase();

    if (
        !name.endsWith(".png") &&
        !name.endsWith(".jpg") &&
        !name.endsWith(".jpeg")
    ) {
        alert("مسموح فقط صور PNG / JPG / JPEG");

        this.value = "";
        identityPreview.style.display = "none";
        identityPreview.src = "";
        return;
    }

    // عرض الصورة
    identityPreview.src = URL.createObjectURL(file);
    identityPreview.style.display = "block";
};

/*صورة الملكية*/
let ownershipInput = document.querySelector("#ownershipImage");
let ownershipFile = null;  //ملف لحفظ الصور
let ownershipPreview = document.querySelector(".ownership-preview");

ownershipInput.onchange = function () {

    let file = ownershipInput.files[0];

    ownershipFile = file;

    if (!file) return;

    let name = file.name.toLowerCase();

    if (
        !name.endsWith(".png") &&
        !name.endsWith(".jpg") &&
        !name.endsWith(".jpeg")
    ) {
        alert("مسموح فقط صور PNG / JPG / JPEG");

        this.value = "";
        ownershipPreview.style.display = "none";
        ownershipPreview.src = "";
        return;
    }

    // عرض الصورة
    ownershipPreview.src = URL.createObjectURL(file);
    ownershipPreview.style.display = "block";
};


//رفع الصورة

let imagesArray = [];

let uploadInput = document.querySelector("#images");
let uploadText = document.querySelector(".upload-text");
let previewContainer = document.querySelector(".preview-container");

//رفع الصور
uploadInput.onchange = function () {

    let files = Array.from(this.files);


    // التحقق من نوع الصور
    for (let file of files) {

        let name = file.name.toLowerCase();

        if (
            !name.endsWith(".png") &&
            !name.endsWith(".jpg") &&
            !name.endsWith(".jpeg")
        ) {
            alert("مسموح فقط صور PNG / JPG / JPEG");

            this.value = "";
            return;
        }
    }


    // التحقق من العدد
    if(imagesArray.length + files.length > 10){
        alert("الحد الأقصى 10 صور");
        this.value = "";
        return;
    }


    // إضافة الصور الجديدة مع القديمة
    imagesArray.push(...files);


    uploadText.innerHTML =
    "تم اختيار " + imagesArray.length + " صور";


    previewContainer.innerHTML = "";


    imagesArray.forEach(function(file){

        let image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        previewContainer.appendChild(image);

    });


    // حتى يسمح باختيار نفس الصورة مرة ثانية
    this.value = "";

};
document.querySelector(".cancel").onclick = function () {
    window.location.href = "index.html";
};


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

// إنشاء الخريطة
const map = L.map('map').setView([33.5138, 36.2765], 30);

// طبقة الخريطة
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }).addTo(map);


let marker;

// عند الضغط على الخريطة
map.on('click', function (e) {

  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // حذف marker القديم
  if (marker) {
    map.removeLayer(marker);
  }

  // عرض النص
  document.getElementById("selectedLocation").innerText =
    `الموقع المحدد: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

  // تخزين القيم
  document.getElementById("lat").value = lat;
  document.getElementById("lng").value = lng;
});


let searchInput = document.getElementById("searchInput");
let searchMarker;

// البحث عند الضغط Enter
searchInput.addEventListener("keypress", function (e) {

  if (e.key === "Enter") {

    let query = searchInput.value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then(res => res.json())
      .then(data => {

        if (data.length > 0) {

          let lat = data[0].lat;
          let lon = data[0].lon;

          // تحريك الخريطة
          map.setView([lat, lon], 14);

          // حذف ماركر قديم
          if (searchMarker) {
            map.removeLayer(searchMarker);
          }

          // إضافة ماركر جديد
          searchMarker = L.marker([lat, lon]).addTo(map);

          // حفظ القيم
          document.getElementById("lat").value = lat;
          document.getElementById("lng").value = lon;

          document.getElementById("selectedLocation").innerText =
            `الموقع: ${parseFloat(lat).toFixed(6)}, ${parseFloat(lon).toFixed(6)}`;
        }
      });
  }
});
//زر تسجيل الخروج

const logoutButtons = document.querySelectorAll("#logoutBtn, .mobile-logout");

logoutButtons.forEach(btn => {

    btn.addEventListener("click", function(e){

        e.preventDefault();

        // حذف حالة تسجيل الدخول
        localStorage.removeItem("isLoggedIn");

        // الرجوع للصفحة الرئيسية
        window.location.href = "index.html";

    });

});