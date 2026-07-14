
// ================= عرض العقارات المفضلة =================
function displayFavorites(realestates) {
    favoritesContainer.innerHTML = "";
    if (realestates.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fa-solid fa-heart-crack"></i>
                <p>لا يوجد عقارات في المفضلة</p>
            </div>
        `;
        return;
    }
    realestates.forEach(realestate => {
        const card = document.createElement("div");
        card.className = "realestate-card";
        card.innerHTML = `
            <div class="realestate-image">
                <img src="${realestate.image}" alt="${realestate.title}">
                <span class="realestate-status">
                    ${realestate.status_real_estate}
                </span>
                <button
                    class="remove-favorite"
                    data-id="${realestate.id}">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="realestate-content">
                <h3 class="realestate-title">
                    <i class="fa-solid fa-hotel"></i>
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
            </div>
        `;
        favoritesContainer.appendChild(card);
    });
    removeButtons();
}
// ================= حذف من المفضلة =================
async function toggleFavorite(button, realestateId){
    try{
        const response = await fetch(
            `/api/favorites/${realestateId}`,
            {
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            }
        );
        const data = await response.json();
        if(!response.ok){
            throw data;
        }
        button.closest(".realestate-card").remove();
        alert(data.message);
    }catch(error){
        console.error(error);
        alert("حدث خطأ أثناء حذف العقار من المفضلة");
    }
}
// ================= أزرار المفضلة =================
function removeButtons() {
    const buttons = document.querySelectorAll(".remove-favorite");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const realestateId = this.dataset.id;
            toggleFavorite(this, realestateId);
        });
    });
}
// ================= جلب العقارات المفضلة =================
async function getFavorites(){

    try{
        const response = await fetch(
            "/api/favorites",
            {
                headers:{
                    "Accept":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            }
        );
        const data = await response.json();
        if(!response.ok){
            throw data;
        }
        if(data && data.real_estates){
            displayFavorites(data.real_estates);
        }else{
            displayFavorites([]);
        }
    }catch(error){
        console.error(error);
        displayFavorites([]);
    }
}
getFavorites();
// ================= إضافة عقار إلى المفضلة =================
async function addFavorite(realEstateId){
    try{
        const response = await fetch("/api/favorites",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                real_estates_id: realEstateId
            })
        });
        const data = await response.json();
        if(!response.ok){
            throw data;
        }
        alert(data.message);
    }catch(error){
        console.error(error);
        alert(error.message || "حدث خطأ");
    }
}