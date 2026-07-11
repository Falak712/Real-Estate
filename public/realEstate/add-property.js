// ==========================
// خريطة OpenStreetMap
// ==========================
let map = L.map('map').setView([33.5138, 36.2765], 13);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
}).addTo(map);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 19
}).addTo(map);

let marker = null;

function setMarker(lat, lng) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById('pointWidth').value = lat;
    document.getElementById('pointLength').value = lng;

    document.getElementById('selectedCoords').textContent =`
        خط العرض: ${lat.toFixed(6)} | خط الطول: ${lng.toFixed(6)}`;
}

map.on('click', function(e) {
    setMarker(e.latlng.lat, e.latlng.lng);
});

let locateBtn = L.control({ position: 'topright' });

locateBtn.onAdd = function() {
    let btn = L.DomUtil.create('button', 'locate-btn');
    btn.innerHTML = '📍 موقعي الحالي';
    btn.type = 'button';
    btn.style.cssText = `
        background: #d4a84f;
        color: #000;
        border: none;
        padding: 8px 14px;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
    ;
`
    btn.onclick = function() {
        if (!navigator.geolocation) {
            alert('المتصفح لا يدعم تحديد الموقع');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function(position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                map.setView([lat, lng], 16);
                setMarker(lat, lng);
            },
            function() {
                alert('تعذر تحديد موقعك، تأكدي من تفعيل صلاحية الموقع');
            }
        );
    };

    return btn;
};

locateBtn.addTo(map);

// ==========================
// جلب المناطق
// ==========================
async function loadAreas() {
    try {
        let response = await fetch('http://127.0.0.1:8000/api/areas');
        let data = await response.json();
        let areas = data.data || data;

        let areaSelect = document.getElementById('areaSelect');
        areaSelect.innerHTML = '<option value="">اختر المنطقة</option>';

        areas.forEach(area => {
            let option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.name;
            option.setAttribute('data-lat', area.latitude);
            option.setAttribute('data-lng', area.longitude);
            areaSelect.appendChild(option);
        });

        areaSelect.addEventListener('change', function() {
            let selectedOption = this.options[this.selectedIndex];
            let lat = parseFloat(selectedOption.getAttribute('data-lat'));
            let lng = parseFloat(selectedOption.getAttribute('data-lng'));

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
// اختيار نوع العقار
// ==========================
let typeButtons = document.querySelectorAll(".type-btn");
typeButtons.forEach(function(button) {
    button.onclick = function() {
        typeButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    };
});

// ==========================
// متغيرات الحقول
// ==========================
let title = document.getElementById("title");
let price = document.getElementById("price");
let city = document.getElementById("city");
let descriptionInput = document.getElementById("descriptionInput");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");

// ==========================
// صورة الهوية
// ==========================
let identityInput = document.querySelector("#identityImage");
let identityPreview = document.querySelector(".identity-preview");

identityInput.onchange = function() {
    let file = identityInput.files[0];
    if (!file) return;
    identityPreview.src = URL.createObjectURL(file);
    identityPreview.style.display = "block";
};

// ==========================
// صورة الملكية
// ==========================
let ownershipInput = document.querySelector("#ownershipImage");
let ownershipPreview = document.querySelector(".ownership-preview");

ownershipInput.onchange = function() {
    let file = ownershipInput.files[0];
    if (!file) return;
    ownershipPreview.src = URL.createObjectURL(file);
    ownershipPreview.style.display = "block";
};

// ==========================
// صورة الوكالة
// ==========================
let agencyInput = document.querySelector("#agencyImage");
let agencyPreview = document.querySelector(".agency-preview");

agencyInput.onchange = function() {
    let file = agencyInput.files[0];
    if (!file) return;
    agencyPreview.src = URL.createObjectURL(file);
    agencyPreview.style.display = "block";
};

// ==========================
// معاينة صور العقار
// ==========================
let uploadInput = document.querySelector("#images");
let uploadText = document.querySelector(".upload-text");
let previewContainer = document.querySelector(".preview-container");

uploadInput.onchange = function() {
    let fileCount = uploadInput.files.length;
    uploadText.innerHTML = "تم اختيار " + fileCount + " صورة";
    previewContainer.innerHTML = "";

    for (let i = 0; i < fileCount; i++) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(uploadInput.files[i]);
        previewContainer.appendChild(image);
    }
};

// ==========================
// زر النشر
// ==========================
let publishButton = document.querySelector(".publish");

publishButton.onclick = async function(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');
    if (!token) {
        alert('يجب تسجيل الدخول أولاً لإضافة عقار');
        window.location.href = 'login.html';
        return;
    }

    let directionSelect = document.getElementById('direction');
    let pointLength = document.getElementById('pointLength');
    let pointWidth = document.getElementById('pointWidth');
    let areaSelect = document.getElementById('areaSelect');

    if (!title.value || !price.value || !city.value || !space.value) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    if (!directionSelect.value) {
        alert('الرجاء اختيار اتجاه العقار');
        return;
    }

    if (!pointLength.value || !pointWidth.value) {
        alert('الرجاء تحديد موقع العقار على الخريطة');
        return;
    }

    if (!areaSelect.value) {
        alert('الرجاء اختيار المنطقة');
        return;
    }

    let identityFile = document.getElementById('identityImage').files[0];
    let ownershipFile = document.getElementById('ownershipImage').files[0];

    if (!identityFile) {
        alert('الرجاء رفع صورة الهوية');
        return;
    }

    if (!ownershipFile) {
        alert('الرجاء رفع وثيقة الملكية');
        return;
    }

    let contractBtn = document.querySelector(".type-btn.active");
    let contractType = contractBtn.getAttribute("data-state");

    let typeSelect = document.getElementById("typeSelect");
    let propertyType = typeSelect.value;

    if (!propertyType || propertyType === "اختر النوع") {
        alert('الرجاء اختيار نوع العقار');
        return;
    }
    try {
        let formData = new FormData();
        formData.append('price', price.value);
        formData.append('description', descriptionInput?.value || '');
        formData.append('size', space.value);
        formData.append('bedrooms', rooms.value);
        formData.append('bathrooms', baths.value);
        formData.append('address', city.value);
        formData.append('direction', directionSelect.value);
        formData.append('point_of_length', pointLength.value);
        formData.append('point_of_width', pointWidth.value);
        formData.append('type_real_estate', propertyType);
        formData.append('contract_type', contractType);
        formData.append('area_id', areaSelect.value);
        formData.append('identity_image', identityFile);
        formData.append('ownership_document', ownershipFile);

        let agencyFile = document.getElementById('agencyImage').files[0];
        if (agencyFile) {
            formData.append('agency_image', agencyFile);
        }

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
            alert('انتهت صلاحية الجلسة، سجل دخول من جديد');
            window.location.href = 'login.html';
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

        let realEstateId = data.id || data.real_estate?.id;

        if (uploadInput.files.length > 0) {
            let picturesFormData = new FormData();
            for (let i = 0; i < uploadInput.files.length; i++) {
                picturesFormData.append('images[]', uploadInput.files[i]);
            }
            await fetch('http://127.0.0.1:8000/api/real-estates/' + realEstateId + '/pictures', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                },
                body: picturesFormData
            });
        }

        alert('تم إرسال العقار للمراجعة بنجاح! سيتم التواصل معك قريباً');
        window.location.href = 'index.html';

    } catch (error) {
        alert('حدث خطأ في الاتصال بالسيرفر');
        console.error(error);
    }
};

// ==========================
// زر الإلغاء
// ==========================
document.querySelector(".cancel").onclick = function() {
    window.location.href = "index.html";
};

// ==========================
// تأثير الظهور عند التمرير
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