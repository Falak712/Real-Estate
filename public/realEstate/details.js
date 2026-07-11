// 1. قراءة ID من الرابط
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. التحقق من Token قبل أي شي
const token = localStorage.getItem("token");

if (!token) {
  document.querySelector(".container").innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h2 style="color:#d4a84f;">يجب تسجيل الدخول لعرض تفاصيل العقار</h2>
      <button onclick="window.location.href='login.html'"
              style="margin-top:20px; padding:15px 30px; border:none; border-radius:15px;
                     background:#d4a84f; color:#000; font-size:18px; cursor:pointer;">
        تسجيل الدخول
      </button>
    </div>`
  ;
} else {
  // 3. جلب بيانات العقار مع التوكن
  fetch(`http://127.0.0.1:8000/api/real-estate/${id}`, {
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/json"
    }
  })
  .then(res => {
    if (res.status === 401) {
      localStorage.removeItem("token"); // التوكن منتهي أو غلط
      document.querySelector(".container").innerHTML =` 
        <div style="text-align:center; padding:40px;">
          <h2 style="color:#d4a84f;">انتهت صلاحية الجلسة، سجل دخول من جديد</h2>
          <button onclick="window.location.href='login.html'"
                  style="margin-top:20px; padding:15px 30px; border:none; border-radius:15px;
                         background:#d4a84f; color:#000; font-size:18px; cursor:pointer;">
            تسجيل الدخول
          </button>
        </div>`
      ;
      throw new Error("Unauthenticated");
    }
    return res.json();
  })
  .then(data => {
    const property = data.real_estate  ||data;
    // زر شراء العقار
document.querySelector(".buy-btn").addEventListener("click", function () {

    window.location.href =`
    rental-Booking.html?type=buy&id=${property.id}`;

});

// زر استئجار العقار
document.querySelector(".rent-btn").addEventListener("click", function () {

    window.location.href =`
    rental-Booking.html?type=rent&id=${property.id}`;

});

    document.getElementById("title").textContent = property.title  ||"عقار";
    document.getElementById("location").innerHTML =
      `<i class="fa-solid fa-location-dot"></i> ${property.address}`;
    document.getElementById("type").textContent = property.type_real_estate;
    document.getElementById("price").textContent = property.price + " ل.س";
    document.getElementById("status").textContent = property.status_real_estate;
    document.getElementById("description").textContent = property.description;
    document.getElementById("space").textContent = property.size;
    document.getElementById("rooms").textContent = property.bedrooms;
    document.getElementById("baths").textContent = property.bathrooms;
    document.getElementById("direction").textContent = property.direction;

    if (property.pictures && property.pictures.length > 0) {
      document.getElementById("mainImage").src =
        "http://127.0.0.1:8000/storage/" + property.pictures[0].image_path;

      const thumbnails = document.querySelector(".thumbnails");
      thumbnails.innerHTML = "";

      property.pictures.forEach(pic => {
        const img = document.createElement("img");
        img.src = "http://127.0.0.1:8000/storage/" + pic.image_path;
        img.onclick = () => changeImage(img);
        thumbnails.appendChild(img);
      });
    }

    if (property.point_of_width && property.point_of_length) {
      document.getElementById("map").src =
        `https://www.google.com/maps?q=${property.point_of_width},${property.point_of_length}&output=embed`;
    }
  })
  .catch(err => console.error(err));
}

function changeImage(img) {
  document.getElementById("mainImage").src = img.src;
}