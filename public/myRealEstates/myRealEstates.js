const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const realestatesContainer = document.getElementById('realestatesContainer');
const realestatesCount = document.getElementById('realestatesCount');

// تحقق من تسجيل الدخول
if (!token) {
    alert('يجب تسجيل الدخول أولاً');
    window.location.href = '../auth/login.html';
}

// تشغيل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (token) {
        getMyRealEstates();
    }
});

// جلب عقارات المستخدم
async function getMyRealEstates() {
    try {
        realestatesContainer.innerHTML = '<p style="text-align:center; color:#888; padding:40px;">جاري التحميل...</p>';

        const response = await fetch(`${API}/my-properties`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '../auth/login.html';
            return;
        }

        const data = await response.json();
        displayRealEstates(data.properties || []);

    } catch (error) {
        console.error(error);
        realestatesContainer.innerHTML = `
            <div class="empty-realestates">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>حدث خطأ أثناء تحميل العقارات</p>
            </div>
        ;`
    }
}

// عرض العقارات
function displayRealEstates(realestates) {
    realestatesContainer.innerHTML = '';

    if (realestatesCount) {
        realestatesCount.textContent = realestates.length;
    }

    if (realestates.length === 0) {
        realestatesContainer.innerHTML =` 
            <div class="empty-realestates">
                <i class="fa-solid fa-house-circle-xmark"></i>
                <p>لا يوجد لديك أي عقارات</p>
            </div>
        ;`
        return;
    }

    realestates.forEach(realestate => {
        // صورة العقار
        let image = '../images/default.jpg';
        if (realestate.pictures && realestate.pictures.length > 0) {
            image = `http://127.0.0.1:8000/storage/${realestate.pictures[0].image_path}`;
        }

        // حالة الطلب
        const statusMap = {
            pending: { label: 'قيد المراجعة', color: '#c8962e' },
            approved: { label: 'مقبول', color: '#2ecc71' },
            rejected: { label: 'مرفوض', color: '#e74c3c' }
        };
        const status = statusMap[realestate.order_status] || { label: realestate.order_status, color: '#888' };

        const card = document.createElement('div');
        card.className = 'realestate-card';
        card.innerHTML = `
            <div class="realestate-image">
                <img src="${image}" alt="عقار"
                     onerror="this.src='../images/default.jpg'"
                     style="width:100%; height:200px; object-fit:cover;">
                <span class="realestate-status" style="background:${status.color}20; color:${status.color};">
                    ${status.label}
                </span>
            </div>
            <div class="realestate-content">
                <h3 class="realestate-title">
                    <i class="fa-solid fa-house"></i>
                    ${realestate.type_real_estate || ''}
                </h3>
                <p class="realestate-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${realestate.address || ''}
                </p>
                <h2 class="realestate-price">
                    <i class="fa-solid fa-sack-dollar"></i>
                    ${Number(realestate.price).toLocaleString()} ل.س
                </h2>
                <div class="realestate-details">
                    <span><i class="fa-solid fa-bed"></i> ${realestate.bedrooms || 0} غرف</span>
                    <span><i class="fa-solid fa-bath"></i> ${realestate.bathrooms || 0} حمامات</span>
                    <span><i class="fa-solid fa-ruler-combined"></i> ${realestate.size || 0} م²</span>
                </div>
                <button class="details-btn" data-id="${realestate.id}">
                    عرض التفاصيل
                </button>
            </div>
        ;`

        realestatesContainer.appendChild(card);
    });

    // أزرار التفاصيل
    initDetailsButtons();
}

// أزرار التفاصيل
function initDetailsButtons() {
    document.querySelectorAll('.details-btn').forEach(button => {
        button.onclick = function() {
            const id = this.dataset.id;
            window.location.href = `../realEstate/details.html?id=${id}`;
        };
    });
}

// زر القائمة للموبايل
const menuBtn = document.getElementById('menubtn');
const navLinks = document.getElementById('navlinks');

if (menuBtn && navLinks) {
    menuBtn.onclick = function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
        }
    };
}

// زر تسجيل الخروج
const logoutBtn = document.getElementById('logoutbtn');
if (logoutBtn) {
    logoutBtn.onclick = async function(e) {
        e.preventDefault();
        try {
            await fetch(`${API}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
        } catch (e) {}
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '../auth/login.html';
    };
}