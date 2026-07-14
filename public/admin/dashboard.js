// ================= عناصر الصفحة =================
const navItems = document.querySelectorAll(".nav-item");
const logoutBtn = document.getElementById("logoutBtn");
// ================= التنقل بين الصفحات =================
navItems.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        const section = this.dataset.section;
        switch (section) {
            case "dashboard":
                window.location.href = "dashboard.html";
                break;
         case "properties":

        // Backend يربط فلترة العقارات المعلقة
                window.location.href = "properties.html?status=pending";
                break;
            case "bookings":
                window.location.href = "bookings.html";
                break;
            case "users":
                window.location.href = "users.html";
                break;
        }
    });
});
// ================= تسجيل الخروج =================
logoutBtn.addEventListener("click", logout);
function logout(e) {
    e.preventDefault();
    const confirmLogout = confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟");
    if (!confirmLogout) {
        return;
    }
    // Backend يربط تسجيل الخروج من هنا
    window.location.href = "../index.html";
}