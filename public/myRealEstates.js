// ================= عناصر الصفحة =================
const realestatesContainer = document.getElementById("realestatesContainer");
const realestatesCount = document.getElementById("realestatesCount");
// ================= عرض العقارات =================
function displayRealEstates(realestates) {
    // تنظيف المحتوى القديم
    realestatesContainer.innerHTML = "";
    // عرض عدد العقارات
    realestatesCount.textContent = realestates.length;
    // في حال لم يوجد عقارات
    if (realestates.length === 0) {
        realestatesContainer.innerHTML = `
            <div class="empty-realestates">
                <i class="fa-solid fa-house-circle-xmark"></i>
                <p>لا يوجد لديك أي عقارات</p>
            </div>
        `;
        return;
    }
    // إنشاء بطاقة لكل عقار
    realestates.forEach(realestate => {
        const card = document.createElement("div");
        card.className = "realestate-card";
        card.innerHTML = `
            <div class="realestate-image">
                <img src="${realestate.image}" alt="${realestate.title}">
                <span class="realestate-status">
                    ${realestate.status}
                </span>
            </div>
            <div class="realestate-content">
                <h3 class="realestate-title">
                    <i class="fa-solid fa-house"></i>
                    ${realestate.title}
                </h3>
                <p class="realestate-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${realestate.location}
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
            </div>
        `;
        realestatesContainer.appendChild(card);
    });
    // تفعيل أزرار التفاصيل
    detailsButtons();
}
// ================= أزرار التفاصيل =================
function detailsButtons() {
    const buttons = document.querySelectorAll(".details-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const realestateId = this.dataset.id;
            console.log("Real Estate ID :", realestateId);
            // Backend يربط الانتقال لصفحة التفاصيل من هنا
            // مثال بعد الربط:
            // window.location.href = `details.html?id=${realestateId}`;
        });
    });
}