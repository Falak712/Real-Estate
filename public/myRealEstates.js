// رابط الـ API
const API_URL = "http://localhost:5000/api";
// جلب التوكين
const token = localStorage.getItem("token");
// عناصر الصفحة
const realestatesContainer = document.getElementById("realestatesContainer");
const realestatesCount = document.getElementById("realestatesCount");
// التأكد من تسجيل الدخول
if (!token) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.html";
}
// تشغيل الصفحة
if (realestatesContainer) {
    getMyRealEstates();
}
// جلب عقارات المستخدم
async function getMyRealEstates() {
    try {
        const response = await fetch("myRealEstates", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed");
        }
        const data = await response.json();

        displayRealEstates(data.real_estates);
    }
    catch (error) {
        console.log(error);
        realestatesContainer.innerHTML =` 
            <div class="empty-realestates">
                حدث خطأ أثناء تحميل العقارات
            </div>`
        ;
    }
}
// عرض العقارات

function displayRealEstates(realestates) {
    realestatesContainer.innerHTML = "";
    if (realestatesCount) {
        realestatesCount.textContent = realestates.length;
    }
    if (realestates.length === 0) {
        realestatesContainer.innerHTML = `
            <div class="empty-realestates">
                <i class="fa-solid fa-house-circle-xmark"></i>
                <p>لا يوجد لديك أي عقارات</p>
            </div>
        `;
        return;
    }

    realestates.forEach(realestate => {
        const card = document.createElement("div");
        card.className = "realestate-card";
        card.innerHTML = `
            <div class="realestate-image">
                <img src="/images/${realestate.image}" alt="${realestate.title}">
                <span class="realestate-status">
                    ${realestate.status_real_estate}
                </span>
            </div>
            <div class="realestate-content">
                <h3 class="realestate-title">
                    <i class="fa-solid fa-house"></i>
                    ${realestate.title}
                </h3>
                <p class="realestate-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${realestate.address}
                </p>
                <h2 class="realestate-price">
                    <i class="fa-solid fa-sack-dollar"></i>
                    ${realestate.price}
                </h2>
                <button
                    class="details-btn"
                    data-id="${realestate.id}">
                    عرض التفاصيل
                </button>
            </div>`
        ;
        realestatesContainer.appendChild(card);
    });
    detailsButtons();
}
 /*أزرار التفاصيل*/
function detailsButtons() {
    const buttons = document.querySelectorAll(".details-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            window.location.href = `details.html?id=${id}`;
        });
    });
}