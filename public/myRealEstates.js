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
                <img src="/images/${realestate.image}]" alt="${realestate.title}">
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
async function getRealEstates(){

    try {

        const response = await fetch("/api/real-estates", {
            method:"GET",
            headers:{
                "Accept":"application/json"
            }
        });
        const data = await response.json();
        if(!response.ok){
            throw data;
        }
        // لأن Laravel paginate يرجع data داخل real_estates
        displayRealEstates(data.real_estates.data);
    } catch(error){
        console.error(error);
        realestatesContainer.innerHTML = `
            <p>حدث خطأ أثناء تحميل العقارات</p>
        `;
    }
}
getRealEstates();

async function getMyRealEstates(){

    const response = await fetch("/api/my-real-estates",
        {
            headers:{
                "Accept":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }
    );
    const data = await response.json();
    displayRealEstates(data.real_estates);
}
getMyRealEstates();