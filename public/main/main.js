const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');

// ==========================
// التحقق من تسجيل الدخول
// ==========================
function isLoggedIn() {
    return !!token;
}

// ==========================
// تحديث أزرار الهيدر
// ==========================
function updateHeader() {
    const authBtn = document.getElementById("authBtn");
    const headerAddBtn = document.getElementById("headerAddBtn");

    if (isLoggedIn()) {
        if (authBtn) {
            authBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> تسجيل خروج';
            authBtn.href = "#";
            authBtn.onclick = async function(e) {
                e.preventDefault();
                try {
                    await fetch(`${API}/logout`, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json'
                        }
                    });
                } catch (e) {}
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                location.reload();
            };
        }
    } else {
        if (authBtn) {
            authBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> تسجيل دخول';
            authBtn.href = "../auth/login.html";
            authBtn.onclick = null;
        }
    }
}

// ==========================
// زر إضافة عقار
// ==========================
function goToAddProperty(e) {
    e.preventDefault();
    if (isLoggedIn()) {
        window.location.href = "../realEstate/add-property.html";
    } else {
        window.location.href = "../auth/login.html";
    }
}

// ==========================
// تحميل العقارات من الباك
// ==========================
async function loadProperties(filters = {}) {
    try {
        // بناء URL مع الفلاتر
        let url =`${API}/real-estate?`;
        if (filters.search) url += search=`${filters.search}&`;
        if (filters.contract_type) url += `contract_type=${filters.contract_type}&`;
        if (filters.type_real_estate) url += `type_real_estate=${filters.type_real_estate}&`;
        if (filters.min_price) url += min_price=`${filters.min_price}&`;
        if (filters.max_price) url += max_price=`${filters.max_price}&`;

        const headers = { 'Accept': 'application/json' };
        if (token) headers['Authorization'] = 'Bearer ' + token;

        const response = await fetch(url, { headers });
        const data = await response.json();

        // الباك يرجع paginated data
        const properties = data.real_estates?.data || data.real_estates || [];
        displayProperties(properties);

    } catch (error) {
        console.error('خطأ في تحميل العقارات:', error);
        document.querySelector(".property-grid").innerHTML =
            '<p style="color:#888; text-align:center; padding:40px;">حدث خطأ في تحميل العقارات</p>';
    }
}

// ==========================
// عرض العقارات
// ==========================
function displayProperties(properties) {
    const container = document.querySelector(".property-grid");
    const showMoreBtn = document.getElementById("showMoreBtn");

    container.innerHTML = "";

    if (properties.length === 0) {
        container.innerHTML = '<p style="color:#888; text-align:center; padding:40px; grid-column:1/-1;">لا توجد عقارات متاحة</p>';
        if (showMoreBtn) showMoreBtn.style.display = "none";
        return;
    }

    properties.forEach((property, index) => {
        // صورة العقار
        let image = "../images/default.jpg";
        if (property.pictures && property.pictures.length > 0) {
            image = `http://127.0.0.1:8000/storage/${property.pictures[0].image_path}`;
        }

        // إخفاء بعد 3
        let hiddenClass = index >= 3 ? "hidden-property" : "";
        container.innerHTML += `
            <div class="property-card ${hiddenClass}"
                data-id="${property.id}"
                data-type="${property.type_real_estate}"
                data-state="${property.contract_type}"
                data-address="${property.address || ''}">

                <div style="position:relative">
                    <img src="${image}" alt="عقار"
                         onerror="this.src='../images/default.jpg'"
                         style="width:100%; height:200px; object-fit:cover;">
                    <span class="tag">
                        ${property.contract_type === 'sale' ? 'للبيع' : 'للإيجار'}
                    </span>
                </div>

                <div class="content">
                    <div class="price">
                        ${Number(property.price).toLocaleString()} ل.س
                    </div>
                    <h4>${property.type_real_estate === 'apartment' ? 'شقة' :
                          property.type_real_estate === 'villa' ? 'فيلا' :
                          property.type_real_estate === 'house' ? 'منزل' :
                          property.type_real_estate === 'land' ? 'أرض' :
                          property.type_real_estate === 'office' ? 'مكتب' :
                          property.type_real_estate}</h4>
                    <p>${property.address || ''}</p>
                    <div class="details">
                        <span><i class="fa-solid fa-bed"></i> ${property.bedrooms || 0} غرف</span>
                        <span><i class="fa-solid fa-bath"></i> ${property.bathrooms || 0} حمامات</span>
                        <span><i class="fa-solid fa-ruler-combined"></i> ${property.size || 0} م²</span>
                    </div>
                </div>
            </div>
        ;`
    });

    // زر عرض المزيد
    if (showMoreBtn) {
        showMoreBtn.style.display = properties.length <= 3 ? "none" : "block";
    }

    // تفعيل تأثيرات الكروت بعد العرض
    initCardEffects();
}

// ==========================
// تأثيرات الكروت
// ==========================
function initCardEffects() {
    const cards = document.querySelectorAll(".property-card");

    // إخفاء الكروت المخفية
    document.querySelectorAll(".hidden-property").forEach(card => {
        card.style.display = "none";
    });

    // تأثير Hover
    cards.forEach(card => {
        card.style.cursor = "pointer";

        card.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.03)";
            this.style.transition = "0.3s";
        });

        card.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
        });
    });

    // فتح التفاصيل عند الضغط
    document.querySelector(".property-grid").onclick = function(e) {
        const card = e.target.closest(".property-card");
        if (card) {
            const id = card.getAttribute("data-id");
            window.location.href = `../realEstate/details.html?id=${id}`;
        }
    };
}

// ==========================
// تأثير الظهور عند التمرير
// ==========================
window.addEventListener("scroll", function() {
    document.querySelectorAll(".property-card:not(.hidden-property)").forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "0.7s";
        }
    });
});

// ==========================
// زر عرض المزيد
// ==========================
const showMoreBtn = document.getElementById("showMoreBtn");
let expanded = false;

if (showMoreBtn) {
    showMoreBtn.onclick = function() {
        if (!isLoggedIn()) {
            window.location.href = "../auth/login.html";
            return;
        }

        const hiddenCards = document.querySelectorAll(".hidden-property");
        hiddenCards.forEach(card => {
            card.style.display = expanded ? "none" : "block";
        });
        expanded = !expanded;
        showMoreBtn.innerHTML = expanded ? "↑ عرض أقل" : "عرض المزيد ←";
    };
}

// ==========================
// البحث من الباك (الصح)
// ==========================
function searchProperties() {
    const city = document.getElementById("city")?.value || '';
    const type = document.getElementById("type")?.value || '';
    const state = document.getElementById("state")?.value || '';
    const minPrice = document.getElementById("minPrice")?.value || '';
    const maxPrice = document.getElementById("maxPrice")?.value || '';

    loadProperties({
        search: city,
        type_real_estate: type,
        contract_type: state,
        min_price: minPrice,
        max_price: maxPrice
    });
}

// ==========================
// الروابط السريعة
// ==========================
function showSale() {
    loadProperties({ contract_type: 'sale' });
}

function showRent() {
    loadProperties({ contract_type: 'rent' });
}

function showAll() {
    loadProperties();
}

// ==========================
// زر القائمة للموبايل
// ==========================
const menuBtn = document.getElementById("menubtn");
const navLinks = document.getElementById("navlinks");

if (menuBtn && navLinks) {
    menuBtn.onclick = function() {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
        }
    };
}

// ==========================
// أزرار إضافة عقار
// ==========================
const headerAddBtn = document.getElementById("headerAddBtn");
const addPropertyBtn = document.getElementById("addPropertyBtn");

if (headerAddBtn) headerAddBtn.onclick = goToAddProperty;
if (addPropertyBtn) addPropertyBtn.onclick = goToAddProperty;

// ==========================
// تشغيل عند فتح الصفحة
// ==========================
document.addEventListener("DOMContentLoaded", function() {
    updateHeader();
    loadProperties();
});
