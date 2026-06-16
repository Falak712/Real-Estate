// ==========================
// صفحة إضافة عقار
// ==========================

// اختيار نوع العقار
let typeButtons = document.querySelectorAll(".type-btn");
typeButtons.forEach(function(button) {
    button.onclick = function() {
        typeButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    };
});

// المتغيرات
let title = document.getElementById("title");
let price = document.getElementById("price");
let city = document.getElementById("city");
let description = document.getElementById("descriptionInput");
let space = document.getElementById("space");
let rooms = document.getElementById("rooms");
let baths = document.getElementById("baths");
let direction = document.getElementById("direction");

// ==========================
// زر النشر - ربط بالباك
// ==========================
let publishButton = document.querySelector(".publish");

publishButton.onclick = async function(e) {
    e.preventDefault();

    // تحقق من تسجيل الدخول
    let token = localStorage.getItem('token');
    if (!token) {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = '/login.html';
        return;
    }

    // تحقق من الحقول
    if (!title.value || !price.value || !city.value) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    // نوع العقار
    let typeBtn = document.querySelector(".type-btn.active");
    if (!typeBtn) {
        alert('الرجاء اختيار نوع العقار');
        return;
    }

    // نوع العقد (بيع أو إيجار)
    let contractType = document.querySelector('input[name="contract_type"]:checked')?.value;
    if (!contractType) {
        alert('الرجاء اختيار نوع العقد (بيع أو إيجار)');
        return;
    }

    try {
        // الخطوة 1: إرسال بيانات العقار
        let response = await fetch('http://127.0.0.1:8000/api/real-estate', {
            method: 'POST',
            headers: {
                'Authorization':` Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                price: price.value,
                description: description?.value || '',
                size: space.value,
                bedrooms: rooms.value,
                bathrooms: baths.value,
                address: city.value,
                direction: direction.value,
                type_real_estate: typeBtn.innerText,
                contract_type: contractType,
                area_id: 1, // مؤقتاً
            })
        });

        let data = await response.json();

        if (!response.ok) {
            alert(data.message || 'حدث خطأ أثناء إضافة العقار');
            return;
        }

        let realEstateId = data.id || data.real_estate?.id;

        // الخطوة 2: رفع الصور لو في صور
        let uploadInput = document.querySelector("#images");
        if (uploadInput && uploadInput.files.length > 0) {
            let formData = new FormData();
            
            for (let i = 0; i < uploadInput.files.length; i++) {
                formData.append('images[]', uploadInput.files[i]);
            }

            await fetch(`http://127.0.0.1:8000/api/real-estates/${realEstateId}/pictures`, {
                method: 'POST',
                headers: {
                    'Authorization':` Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData
            });
        }

        alert('تم إرسال العقار للمراجعة بنجاح! سيتم التواصل معك قريباً');
        window.location.href = '/index.html';

    } catch (error) {
        alert('حدث خطأ في الاتصال بالسيرفر');
        console.error(error);
    }
};

// ==========================
// معاينة الصور
// ==========================
let uploadInput = document.querySelector("#images");
let uploadText = document.querySelector(".upload-text");
let previewContainer = document.querySelector(".preview-container");
if (uploadInput) {
    uploadInput.onchange = function() {
        let fileCount = uploadInput.files.length;
        if (uploadText) uploadText.innerHTML = "تم اختيار " + fileCount + " صورة";
        if (previewContainer) previewContainer.innerHTML = "";

        for (let i = 0; i < fileCount; i++) {
            let image = document.createElement("img");
            image.src = URL.createObjectURL(uploadInput.files[i]);
            image.style.width = "100px";
            image.style.margin = "5px";
            if (previewContainer) previewContainer.appendChild(image);
        }
    };
}

// ==========================
// صورة الهوية
// ==========================
let identityInput = document.querySelector("#identityImage");
let identityPreview = document.querySelector(".identity-preview");

if (identityInput) {
    identityInput.onchange = function() {
        let file = identityInput.files[0];
        if (!file) return;
        identityPreview.src = URL.createObjectURL(file);
        identityPreview.style.display = "block";
    };
}

// ==========================
// صورة الملكية
// ==========================
let ownershipInput = document.querySelector("#ownershipImage");
let ownershipPreview = document.querySelector(".ownership-preview");

if (ownershipInput) {
    ownershipInput.onchange = function() {
        let file = ownershipInput.files[0];
        if (!file) return;
        ownershipPreview.src = URL.createObjectURL(file);
        ownershipPreview.style.display = "block";
    };
}

// ==========================
// صورة الوكالة
// ==========================
let agencyInput = document.querySelector("#agencyImage");
let agencyPreview = document.querySelector(".agency-preview");

if (agencyInput) {
    agencyInput.onchange = function() {
        let file = agencyInput.files[0];
        if (!file) return;
        agencyPreview.src = URL.createObjectURL(file);
        agencyPreview.style.display = "block";
    };
}

// ==========================
// زر الإلغاء
// ==========================
document.querySelector(".cancel").onclick = function() {
    window.location.href = "/index.html";
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