//صفحة اضافة عقار

const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');

// ==========================
// اختيار نوع العقد (بيع/إيجار)
// ==========================
let typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(button => {
    button.onclick = function () {
        typeButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    };
});

// ==========================
// عناصر الفورم
// ==========================
let price = document.getElementById("price");
let description = document.getElementById("descriptionInput");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");

// ==========================
// تحميل المناطق من الباك
// ==========================
async function loadAreas() {
    const areaSelect = document.getElementById("areaSelect");
    try {
        const response = await fetch(`${API}/areas`, {
            headers: { 'Accept': 'application/json' }
        });
        const areas = await response.json();

        areaSelect.innerHTML = '<option value="">اختر المنطقة</option>';
        areas.forEach(area => {
            areaSelect.innerHTML += `<option value="${area.id}">${area.name}</option>`;
        });
    } catch (error) {
        areaSelect.innerHTML = '<option value="">تعذر تحميل المناطق</option>';
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", loadAreas);

// ==========================
// زر نشر العقار
// ==========================
let publishButton = document.querySelector(".publish");

publishButton.onclick = async function (e) {
    e.preventDefault();

    let stateBtn = document.querySelector(".type-btn.active");
    let contractType = stateBtn ? stateBtn.dataset.state : ""; // sale / rent

    let areaId = document.getElementById("areaSelect").value;
    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;
    let typeRealEstate = document.getElementById("typeSelect").value;
    let addressInput = document.querySelector('input[placeholder="اسم الشارع، رقم المبنى"]');

    // التحقق من الحقول المطلوبة فعليًا حسب الباك
    if (
        price.value === "" ||
        space.value === "" ||
        direction.value === "" ||
        contractType === "" ||
        typeRealEstate === "" ||
        areaId === "" ||
        lat === "" ||
        lng === "" ||
        addressInput.value === "" ||
        !identityFile ||
        !ownershipFile
    ) {
        alert("الرجاء ملء جميع الحقول المطلوبة (بما فيها صورة الهوية ووثيقة الملكية)");
        return;
    }

    let formData = new FormData();

    formData.append("price", price.value);
    formData.append("description", description.value);
    formData.append("size", space.value);
    formData.append("direction", direction.value);
    formData.append("bedrooms", rooms.value);
    formData.append("bathrooms", baths.value);
    formData.append("address", addressInput.value);
    formData.append("point_of_length", lng);
    formData.append("point_of_width", lat);
    formData.append("type_real_estate", typeRealEstate);
    formData.append("contract_type", contractType);
    formData.append("area_id", areaId);
    formData.append("identity_image", identityFile);
    formData.append("ownership_document", ownershipFile);

    // الصور - كلها بنفس الطلب
    imagesArray.forEach(function (image) {
        formData.append("images[]", image);
    });

    try {
        const response = await fetch(`${API}/real-estate`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "حدث خطأ أثناء إضافة العقار");
            console.error(data.errors);
            return;
        }
        alert(data.message);
        window.location.href = "../main/index.html";

    } catch (error) {
        console.error(error);
        alert("تعذر الاتصال بالخادم");
    }
};

// ==========================
// تأثير الظهور عند التمرير
// ==========================
let reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function () {
    reveals.forEach(function (card) {
        let windowHeight = window.innerHeight;
        let cardTop = card.getBoundingClientRect().top;

        if (cardTop < windowHeight - 100) {
            card.classList.add("active");
        }
    });
});

// ==========================
// صورة الهوية
// ==========================
let identityInput = document.querySelector("#identityImage");
let identityFile = null;
let identityPreview = document.querySelector(".identity-preview");

identityInput.onchange = function () {
    let file = identityInput.files[0];
    if (!file) return;

    let name = file.name.toLowerCase();

    if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        alert("مسموح فقط صور PNG / JPG / JPEG");
        this.value = "";
        identityFile = null;
        identityPreview.style.display = "none";
        identityPreview.src = "";
        return;
    }

    identityFile = file;
    identityPreview.src = URL.createObjectURL(file);
    identityPreview.style.display = "block";
};

// ==========================
// وثيقة الملكية
// ==========================
let ownershipInput = document.querySelector("#ownershipImage");
let ownershipFile = null;
let ownershipPreview = document.querySelector(".ownership-preview");

ownershipInput.onchange = function () {
    let file = ownershipInput.files[0];
    if (!file) return;

    let name = file.name.toLowerCase();

    if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        alert("مسموح فقط صور PNG / JPG / JPEG");
        this.value = "";
        ownershipFile = null;
        ownershipPreview.style.display = "none";
        ownershipPreview.src = "";
        return;
    }

    ownershipFile = file;
    ownershipPreview.src = URL.createObjectURL(file);
    ownershipPreview.style.display = "block";
};

// ==========================
// رفع صور العقار
// ==========================
let imagesArray = [];

let uploadInput = document.querySelector("#images");
let uploadText = document.querySelector(".upload-text");
let previewContainer = document.querySelector(".preview-container");

uploadInput.onchange = function () {
    let files = Array.from(this.files);

    // التحقق من نوع الصور
    for (let file of files) {
        let name = file.name.toLowerCase();
        if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
            alert("مسموح فقط صور PNG / JPG / JPEG");
            this.value = "";
            return;
        }
    }

    // التحقق من العدد
    if (imagesArray.length + files.length > 10) {
        alert("الحد الأقصى 10 صور");
        this.value = "";
        return;
    }

    imagesArray.push(...files);

    uploadText.innerHTML = "تم اختيار " + imagesArray.length + " صور";

    previewContainer.innerHTML = "";
    imagesArray.forEach(function (file) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        previewContainer.appendChild(image);
    });

    // حتى يسمح باختيار نفس الصورة مرة ثانية
    this.value = "";
};

// ==========================
// زر إلغاء
// ==========================
document.querySelector(".cancel").onclick = function () {
    window.location.href = "index.html";
};

// ==========================
// زر القائمة للموبايل
// ==========================
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
// ==========================
// زر تسجيل الخروج
// ==========================
const logoutButtons = document.querySelectorAll("#logoutBtn, .mobile-logout");

logoutButtons.forEach(btn => {
    btn.addEventListener("click", async function (e) {
        e.preventDefault();

        try {
            await fetch(`${API}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                }
            });
        } catch (err) {}

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "../main/index.html";
    });
});

// ==========================
// الخريطة
// ==========================
const map = L.map('map').setView([33.5138, 36.2765], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

let marker = null;

// اختيار الموقع بالضغط على الخريطة
map.on('click', function (e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    document.getElementById("selectedLocation").innerText =`
        الموقع المحدد: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
});

// زر تحديد الموقع الحالي
const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {
    locationBtn.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            map.setView([lat, lng], 15);

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup("موقعك الحالي")
                .openPopup();

            document.getElementById("lat").value = lat;
            document.getElementById("lng").value = lng;

            document.getElementById("selectedLocation").innerText =`
                الموقع الحالي: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        }, function () {
            alert("لم يتم السماح بالوصول إلى الموقع");
        });
    };
}
