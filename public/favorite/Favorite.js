const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const favoritesContainer = document.getElementById('favoritesContainer');

// ==========================
// تحقق من تسجيل الدخول
// ==========================
if (!token) {
    alert('يجب تسجيل الدخول أولاً');
    window.location.href = '../auth/login.html';
}

// ==========================
// جلب المفضلة
// ==========================
async function getFavorites() {
    try {
        favoritesContainer.innerHTML = '<p style="text-align:center; color:#888; padding:40px;">جاري التحميل...</p>';

        const response = await fetch(`${API}/favorites`, {
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
        displayFavorites(data.real_estates || data.favorites || []);

    } catch (error) {
        console.error(error);
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>حدث خطأ في تحميل المفضلة</p>
            </div>
        ;`
    }
}

// ==========================
// عرض العقارات
// ==========================
function displayFavorites(realestates) {
    favoritesContainer.innerHTML = '';

    if (realestates.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fa-solid fa-heart-crack"></i>
                <p>لا يوجد عقارات في المفضلة</p>
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

        const card = document.createElement('div');
        card.className = 'realestate-card';
        card.innerHTML =` 
            <div class="realestate-image">
                <img src="${image}" alt="عقار"
                     onerror="this.src='../images/default.jpg'"
                     style="width:100%; height:200px; object-fit:cover;">
                <span class="realestate-status">
                    ${realestate.contract_type === 'sale' ? 'للبيع' : 'للإيجار'}
                </span>
                <button class="remove-favorite" data-id="${realestate.id}">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="realestate-content">
                <h3 class="realestate-title">
                    <i class="fa-solid fa-hotel"></i>
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
            </div>
        ;`
        // فتح التفاصيل عند الضغط
        card.querySelector('.realestate-content').onclick = function() {
            window.location.href = `../realEstate/details.html?id=${realestate.id}`;
        };

        favoritesContainer.appendChild(card);
    });

    // أزرار الحذف
    initRemoveButtons();
}

// ==========================
// أزرار الحذف
// ==========================
function initRemoveButtons() {
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.onclick = function(e) {
            e.stopPropagation();
            removeFavorite(this.dataset.id);
        };
    });
}
// ==========================
// حذف من المفضلة
// ==========================
async function removeFavorite(id) {
    try {
        const response = await fetch(`${API}/favorites/${id}`, {
            method: 'DELETE',
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
        alert(data.message || 'تم الحذف من المفضلة');
        getFavorites();

    } catch (error) {
        console.error(error);
        alert('حدث خطأ أثناء الحذف');
    }
}

// ==========================
// تشغيل عند فتح الصفحة
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    if (token) {
        getFavorites();
    }
});

// ==========================
// زر القائمة للموبايل
// ==========================
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

// ==========================
// زر تسجيل الخروج
// ==========================
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