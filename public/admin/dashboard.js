const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');

// ==========================
// تحقق من تسجيل الدخول
// ==========================
if (!token) {
    window.location.href = '../auth/login.html';
}

// ==========================
// Helper Functions
// ==========================
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

async function apiRequest(url, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    };
    if (body) options.body = JSON.stringify(body);
    if (body) options.headers['Content-Type'] = 'application/json';

    const response = await fetch(API + url, options);
    return response.json();
}

function statusBadge(status) {
    const map = {
        pending: ['badge-pending', 'قيد المراجعة'],
        approved: ['badge-approved', 'مقبول'],
        rejected: ['badge-rejected', 'مرفوض'],
        confirmed: ['badge-confirmed', 'مؤكد'],
        cancelled: ['badge-cancelled', 'ملغي'],
    };
    const [cls, label] = map[status] || ['badge-pending', status];
    return <span class="badge ${cls}">${label}</span>;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ar-SY');
}

// ==========================
// Navigation
// ==========================
document.querySelectorAll('.nav-item').forEach(item => {
    item.onclick = function(e) {
        e.preventDefault();

        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const section = this.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-' + section).classList.add('active');

        const titles = {
            dashboard: 'لوحة التحكم',
            properties: 'إدارة العقارات',
            bookings: 'إدارة الحجوزات',
            users: 'إدارة المستخدمين'
        };
        document.getElementById('pageTitle').textContent = titles[section];

        if (section === 'properties') loadProperties();
        if (section === 'bookings') loadBookings();
        if (section === 'users') loadUsers();
    };
});

// Toggle Sidebar
document.getElementById('toggleSidebar').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');

    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    } else {
        sidebar.classList.toggle('collapsed');
        main.style.marginRight = sidebar.classList.contains('collapsed') ? '70px' : '260px';
    }
};

// Logout
document.getElementById('logoutBtn').onclick = async function(e) {
    e.preventDefault();
    await apiRequest('/logout', 'POST');
    localStorage.removeItem('token');
    window.location.href = '../auth/login.html';
};

// ==========================
// Dashboard Stats
// ==========================
async function loadDashboard() {
    showLoading();
    try {
        const data = await apiRequest('/admin/dashboard');

        document.getElementById('totalProperties').textContent = data.properties || 0;
        document.getElementById('pendingProperties').textContent = data.pending_properties || 0;
        document.getElementById('totalUsers').textContent = data.users || 0;
        document.getElementById('totalBookings').textContent = data.bookings || 0;

        // Admin name
        const user = await apiRequest('/currentuser');
        if (user.user) {
            document.getElementById('adminName').textContent = user.user.full_name || 'Admin';
        }
        // Latest Properties
        const propBody = document.getElementById('latestPropertiesBody');
        propBody.innerHTML = '';
        (data.latest_properties || []).forEach((p, i) => {
            propBody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${p.address || '-'}</td>
                    <td>${Number(p.price).toLocaleString()} ل.س</td>
                    <td>${statusBadge(p.order_status)}</td>
                </tr>
            ;`
        });

        // Latest Bookings
        const bookBody = document.getElementById('latestBookingsBody');
        bookBody.innerHTML = '';
        (data.latest_bookings || []).forEach((b, i) => {
            bookBody.innerHTML += 
                <tr>
                    <td>${i + 1}</td>
                    <td>${b.user?.full_name || '-'}</td>
                    <td>${statusBadge(b.status)}</td>
                    <td>${formatDate(b.created_at)}</td>
                </tr>
            ;
        });

    } catch (error) {
        console.error(error);
    }
    hideLoading();
}

// ==========================
// Properties
// ==========================
let allProperties = [];

async function loadProperties() {
    showLoading();
    try {
        const data = await apiRequest('/admin/properties');
        allProperties = data.properties || [];
        renderProperties(allProperties);
    } catch (error) {
        console.error(error);
    }
    hideLoading();
}

function renderProperties(properties) {
    const body = document.getElementById('propertiesBody');
    body.innerHTML = '';

    if (properties.length === 0) {
        body.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#666; padding:30px;">لا توجد عقارات</td></tr>';
        return;
    }

    properties.forEach((p, i) => {
        body.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${p.address || '-'}</td>
                <td>${Number(p.price).toLocaleString()}</td>
                <td>${p.type_real_estate || '-'}</td>
                <td>${p.contract_type === 'sale' ? 'بيع' : 'إيجار'}</td>
                <td>${statusBadge(p.order_status)}</td>
                <td>
                    <div class="action-btns">
                        ${p.order_status === 'pending' ? 
                           `<button class="btn-approve" onclick="approveProperty(${p.id})">
                                <i class="fa-solid fa-check"></i> قبول
                            </button>
                            <button class="btn-reject" onclick="rejectProperty(${p.id})">
                                <i class="fa-solid fa-x"></i> رفض
                            </button>`
                         : ''}
                        <button class="btn-delete" onclick="deleteProperty(${p.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        ;`
    });
}

function filterProperties(status) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (status === 'all') {
        renderProperties(allProperties);
    } else {
        renderProperties(allProperties.filter(p => p.order_status === status));
    }
}

async function approveProperty(id) {
    if (!confirm('هل تريد قبول هذا العقار؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/properties/${id}/approve`, 'POST');
        alert(data.message || 'تم قبول العقار');
        loadProperties();
        loadDashboard();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

async function rejectProperty(id) {
    if (!confirm('هل تريد رفض هذا العقار؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/properties/${id}/reject`, 'POST');
        alert(data.message || 'تم رفض العقار');
        loadProperties();
        loadDashboard();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

async function deleteProperty(id) {
    if (!confirm('هل تريد حذف هذا العقار نهائياً؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/properties/${id}`, 'DELETE');
        alert(data.message || 'تم الحذف');
        loadProperties();
        loadDashboard();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

// ==========================
// Bookings
// ==========================
async function loadBookings() {
    showLoading();
    try {
        const data = await apiRequest('/admin/bookings/pending');
        const bookings = data.bookings || [];
        const body = document.getElementById('bookingsBody');
        body.innerHTML = '';

        if (bookings.length === 0) {
            body.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#666; padding:30px;">لا توجد حجوزات</td></tr>';
            hideLoading();
            return;
        }

        bookings.forEach((b, i) => {
            body.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${b.user?.full_name || '-'}</td>
                    <td>${formatDate(b.start_date)}</td>
                    <td>${formatDate(b.end_date)}</td>
                    <td>${statusBadge(b.status)}</td>
                    <td>
                        <div class="action-btns">
                            ${b.status === 'pending' ? 
                               ` <button class="btn-approve" onclick="approveBooking(${b.id})">
                                    <i class="fa-solid fa-check"></i> قبول
                                </button>
                                <button class="btn-reject" onclick="rejectBooking(${b.id})">
                                    <i class="fa-solid fa-x"></i> رفض
                                </button>`
                             : ''}
                        </div>
                    </td>
                </tr>
            ;`
        });

    } catch (error) {
        console.error(error);
    }
    hideLoading();
}

async function approveBooking(id) {
    if (!confirm('هل تريد قبول هذا الحجز؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/bookings/${id}/approve`, 'POST');
        alert(data.message || 'تم قبول الحجز');
        loadBookings();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

async function rejectBooking(id) {
    if (!confirm('هل تريد رفض هذا الحجز؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/bookings/${id}/reject`, 'POST');
        alert(data.message || 'تم رفض الحجز');
        loadBookings();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

// ==========================
// Users
// ==========================
async function loadUsers() {
    showLoading();
    try {
        const data = await apiRequest('/admin/users');
        const users = data.users || [];
        const body = document.getElementById('usersBody');
        body.innerHTML = '';

        if (users.length === 0) {
            body.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#666; padding:30px;">لا يوجد مستخدمون</td></tr>';
            hideLoading();
            return;
        }

        users.forEach((u, i) => {
            body.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${u.full_name || '-'}</td>
                    <td>${u.email || '-'}</td>
                    <td>${u.phone_number || '-'}</td>
                    <td>${u.userType === 'admin' ? 'مدير' : 'مستخدم'}</td>
                    <td>
                        <span class="badge ${u.banned ? 'badge-banned' : 'badge-active'}">
                            ${u.banned ? 'محظور' : 'نشط'}
                        </span>
                    </td>
                    <td>
                        <div class="action-btns">
                            ${u.banned
                                ? `<button class="btn-unban" onclick="unbanUser(${u.id})">رفع الحظر</button>`
                                : `<button class="btn-ban" onclick="banUser(${u.id})">حظر</button>`
                            }
                            <button class="btn-delete" onclick="deleteUser(${u.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            ;`
        });

    } catch (error) {
        console.error(error);
    }
    hideLoading();
}

async function banUser(id) {
    let reason = prompt('سبب الحظر:');
    if (!reason) return;
    showLoading();
    try {
        const data = await apiRequest(`/ban-user/${id}`, 'POST', {
            reason: reason,
            length_of_punishment: 7
        });
        alert(data.message || 'تم الحظر');
        loadUsers();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

async function unbanUser(id) {
    if (!confirm('هل تريد رفع الحظر؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/unban-user/${id}`, 'POST');
        alert(data.message || 'تم رفع الحظر');
        loadUsers();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

async function deleteUser(id) {
    if (!confirm('هل تريد حذف هذا المستخدم نهائياً؟')) return;
    showLoading();
    try {
        const data = await apiRequest(`/admin/users/${id}`, 'DELETE');
        alert(data.message || 'تم الحذف');
        loadUsers();
    } catch (error) {
        alert('حدث خطأ');
    }
    hideLoading();
}

// ==========================
// تشغيل أول مرة
// ==========================
loadDashboard();
