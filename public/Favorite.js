// رابط الـ API
const API_URL = "http://localhost:5000/api";
// جلب التوكين من تسجيل الدخول
const token = localStorage.getItem("token");
// مكان عرض العقارات
const favoritesContainer = document.getElementById("favoritesContainer");

// إذا لم يوجد توكين
if(!token){
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.html";
}  

// تشغيل عرض المفضلة
if(favoritesContainer){
    getFavorites();
}

// جلب العقارات المفضلة من السيرفر
async function getFavorites(){
    try{
        const response = await fetch("favorites", {
            method: "index",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed");
        }
        const data = await response.json();
        displayFavorites(data.realestates || []);
    }
    catch(error){
        console.log(error);
        favoritesContainer.innerHTML = `<div class="empty-favorites">حدث خطأ في تحميل المفضلة</div>;`
    }
}

// عرض العقارات
function displayFavorites(realestates){
    favoritesContainer.innerHTML = "";
    if(realestates.length === 0){
        favoritesContainer.innerHTML = `<div class="empty-favorites"> <i class="fa-solid fa-heart-crack"></i>
            <p>لا يوجد عقارات في المفضلة</p>
        </div>;`
        return;
    }
    realestates.forEach(realestate => {
        const card = document.createElement("div");
        card.className = "realestate-card";
        card.innerHTML = `
        <div class="realestate-image">
            <img src="${realestate.image}">
            <span class="realestate-status">${realestate.status}</span>
            <button class="remove-favorite" data-id="${realestate.id}">
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>
        <div class="realestate-content">
            <h3 class="realestate-title">
                <i class="fa-solid fa-hotel"></i> ${realestate.title}
            </h3>
            <p class="realestate-location">
                <i class="fa-solid fa-location-dot"></i> ${realestate.location}
            </p>
            <h2 class="realestate-price">
                <i class="fa-solid fa-sack-dollar"></i> ${realestate.price}
            </h2>
        </div>`;
        favoritesContainer.appendChild(card);
    });
    removeButtons();
    }
    
// زر حذف من المفضلة
function removeButtons(){
    const buttons = document.querySelectorAll(".remove-favorite");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const realestateId = button.dataset.id;
            removeFavorite(realestateId);
        });
    });
}
    
// حذف العقار من السيرفر
async function removeFavorite(id) {
    try {
        const response = await fetch(`favorites/${id}`, {
            method: "destroy",
            headers: {
                "Authorization":`Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){

            throw new Error("Delete failed");

        }
        // إعادة تحميل القائمة بعد الحذف
        getFavorites();
    } catch (error) {
        console.log(error);
    }
}
