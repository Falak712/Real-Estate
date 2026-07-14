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
                    ${realestate.status}
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
                    ${realestate.location}
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
// ================= تغيير حالة المفضلة =================
function toggleFavorite(button, realestateId) {
    const isFavorite = button.classList.contains("active");
    if (isFavorite) {
        // Backend يحذف العقار من المفضلة من هنا
        button.classList.remove("active");
        button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        console.log("Remove Favorite :", realestateId);
    } else {
        // Backend يضيف العقار إلى المفضلة من هنا
        button.classList.add("active");
        button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        console.log("Add Favorite :", realestateId);
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