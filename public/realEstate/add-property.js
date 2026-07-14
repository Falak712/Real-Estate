// ==========================
// اختيار نوع العقد (للبيع/للإيجار)
// ==========================
let typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(button => {
    button.onclick = function() {
        typeButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    };
});

// ==========================
// المتغيرات
// ==========================
let price = document.getElementById("price");
let city = document.getElementById("city");
let description = document.getElementById("descriptionInput");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");

// ==========================
// تحميل المناطق من الباك
// ==========================
async function loadAreas() {
    try {
        let response = await fetch('http://127.0.0.1:8000/api/areas');
        let data = await response.json();
        let areas = data.data || data;

        let areaSelect = document.getElementById('areaSelect');
        areaSelect.innerHTML = '<option value="">دمشق</option>';

        areas.forEach(area => {
            let option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.name;
            if (area.latitude && area.longitude) {
                option.setAttribute('data-lat', area.latitude);
                option.setAttribute('data-lng', area.longitude);
            }
            areaSelect.appendChild(option);
        });

        // تحريك الخريطة عند اختيار منطقة
        areaSelect.addEventListener('change', function() {
            let selected = this.options[this.selectedIndex];
            let lat = parseFloat(selected.getAttribute('data-lat'));
            let lng = parseFloat(selected.getAttribute('data-lng'));
            if (!isNaN(lat) && !isNaN(lng)) {
                map.setView([lat, lng], 15);
            }
        });

    } catch (error) {
        console.error('فشل تحميل المناطق:', error);
    }
}

loadAreas();

// ==========================
// صورة الهوية
// ==========================
let identityInput = document.querySelector("#identityImage");
let identityFile = null;
let identityPreview = document.querySelector(".identity-preview");

identityInput.onchange = function() {
    let file = identityInput.files[0];
    if (!file) return;

    let name = file.name.toLowerCase();
    if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        alert("مسموح فقط صور PNG / JPG / JPEG");
        this.value = "";
        identityPreview.style.display = "none";
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

ownershipInput.onchange = function() {
    let file = ownershipInput.files[0];
    if (!file) return;

    let name = file.name.toLowerCase();
    if (!name.endsWith(".png") && !name.endsWith(".jpg") &&
        !name.endsWith(".jpeg") && !name.endsWith(".pdf")) {
        alert("مسموح فقط PNG / JPG / JPEG / PDF");
        this.value = "";
        ownershipPreview.style.display = "none";
        return;
    }

    ownershipFile = file;
    if (!name.endsWith(".pdf")) {
        ownershipPreview.src = URL.createObjectURL(file);
        ownershipPreview.style.display = "block";
    } else {
        ownershipPreview.style.display = "none";
        alert("تم اختيار ملف PDF بنجاح ✅");
    }
};

// ==========================
// صور العقار
// ==========================
let imagesArray = [];
let uploadInput = document.querySelector("#images");
let uploadText = document.querySelector(".upload-text");
let previewContainer = document.querySelector(".preview-container");
uploadInput.onchange = function() {
    let files = Array.from(this.files);

    for (let file of files) {
        let name = file.name.toLowerCase();
        if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
            alert("مسموح فقط صور PNG / JPG / JPEG");
            this.value = "";
            return;
        }
    }

    if (imagesArray.length + files.length > 10) {
        alert("الحد الأقصى 10 صور");
        this.value = "";
        return;
    }

    imagesArray.push(...files);
    uploadText.innerHTML = "تم اختيار " + imagesArray.length + " صور";
    previewContainer.innerHTML = "";

    imagesArray.forEach(function(file) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        previewContainer.appendChild(image);
    });

    this.value = "";
};

// ==========================
// زر النشر - مربوط بالباك
// ==========================
let publishButton = document.querySelector(".publish");

publishButton.onclick = async function(e) {
    e.preventDefault();

    // تحقق من تسجيل الدخول
    let token = localStorage.getItem('token');
    if (!token) {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = '../auth/login.html';
        return;
    }

    // نوع العقد
    let stateBtn = document.querySelector(".type-btn.active");
    if (!stateBtn) {
        alert('الرجاء اختيار نوع العقد');
        return;
    }
    let contractType = stateBtn.dataset.state; // rent أو sale

    // نوع العقار
    let typeSelect = document.getElementById("typeSelect");
    let propertyType = typeSelect.value;
    if (!propertyType) {
        alert('الرجاء اختيار نوع العقار');
        return;
    }

    // المنطقة
    let areaSelect = document.getElementById('areaSelect');
    if (!areaSelect.value) {
        alert('الرجاء اختيار المنطقة');
        return;
    }

    // الاتجاه
    if (!direction.value) {
        alert('الرجاء اختيار اتجاه العقار');
        return;
    }

    // الحقول المطلوبة
    if (!price.value || !city.value || !space.value) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    // الإحداثيات
    let lat = document.getElementById('lat').value;
    let lng = document.getElementById('lng').value;
    if (!lat || !lng) {
        alert('الرجاء تحديد موقع العقار على الخريطة');
        return;
    }

    // صور التحقق
    if (!identityFile) {
        alert('الرجاء رفع صورة الهوية');
        return;
    }
    if (!ownershipFile) {
        alert('الرجاء رفع وثيقة الملكية');
        return;
    }

    try {
        // بناء FormData بنفس أسماء الباك بالضبط
        let formData = new FormData();
        formData.append('price', price.value);
        formData.append('description', description.value || '');
        formData.append('size', space.value);
        formData.append('bedrooms', rooms.value || 0);
        formData.append('bathrooms', baths.value || 0);
        formData.append('address', city.value);
        formData.append('direction', direction.value);
        formData.append('point_of_length', lng);
        formData.append('point_of_width', lat);
        formData.append('type_real_estate', propertyType);
        formData.append('contract_type', contractType);
        formData.append('area_id', areaSelect.value);
        formData.append('identity_image', identityFile);
        formData.append('ownership_document', ownershipFile);

        // إرسال للباك
        let response = await fetch('http://127.0.0.1:8000/api/real-estate', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            },
            body: formData
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            alert('انتهت صلاحية الجلسة');
            window.location.href = '../auth/login.html';
            return;
        }

        let data = await response.json();
        if (!response.ok) {
            let firstError = data.errors
                ? Object.values(data.errors)[0][0]
                : data.message;
            alert(firstError || 'حدث خطأ أثناء إضافة العقار');
            return;
        }

        let realEstateId = data.real_estate?.id || data.id;

        // رفع صور العقار
        if (imagesArray.length > 0 && realEstateId) {
            let picturesFormData = new FormData();
            imagesArray.forEach(file => {
                picturesFormData.append('images[]', file);
            });

            await fetch(`http://127.0.0.1:8000/api/real-estate/${realEstateId}/pictures`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                },
                body: picturesFormData
            });
        }

        alert('تم إرسال العقار للمراجعة بنجاح!');
        window.location.href = '../main/index.html';

    } catch (error) {
        alert('حدث خطأ في الاتصال بالسيرفر');
        console.error(error);
    }
};

// ==========================
// زر الإلغاء
// ==========================
document.querySelector(".cancel").onclick = function() {
    window.location.href = "../main/index.html";
};

// ==========================
// زر القائمة للموبايل
// ==========================
const menuBtn = document.getElementById("menubtn");
const navLinks = document.getElementById("navlinks");

menuBtn.onclick = function() {
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }
};

// ==========================
// الخريطة
// ==========================
const map = L.map('map').setView([33.5138, 36.2765], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

let marker;
// تحديد الموقع تلقائياً عند فتح الصفحة
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        function(position){

            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            map.setView([lat, lng], 15);

            marker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup("موقعك الحالي")
                .openPopup();

            document.getElementById("lat").value = lat;
            document.getElementById("lng").value = lng;

            document.getElementById("selectedLocation").innerText =`
            الموقع الحالي: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        },

        function(error){

            console.log(error);

        }

    );

}

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (marker) map.removeLayer(marker);

    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("selectedLocation").innerText =`
        الموقع المحدد: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;
});

// ==========================
// البحث بالخريطة
// ==========================
let searchInput = document.getElementById("searchInput");
let searchMarker;

searchInput.addEventListener("keypress", function(e) {
   
    if (e.key === "Enter") {
        let query = searchInput.value;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    let lat = data[0].lat;
                    let lon = data[0].lon;

                    map.setView([lat, lon], 14);

                    if (searchMarker) map.removeLayer(searchMarker);

                    searchMarker = L.marker([lat, lon]).addTo(map);

                    document.getElementById("lat").value = lat;
                    document.getElementById("lng").value = lon;

                    document.getElementById("selectedLocation").innerText =`
                        الموقع: ${parseFloat(lat).toFixed(6)}, ${parseFloat(lon).toFixed(6)}`;
                } else {
                    alert('لم يتم العثور على الموقع');
                }
            })
            .catch(() => alert('خطأ في البحث'));
    }
});

// ==========================
// تأثير التمرير
// ==========================
let reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", function() {
    reveals.forEach(function(card) {
        let windowHeight = window.innerHeight;
        let cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 100) {
            card.classList.add("active");
        }
    });
});