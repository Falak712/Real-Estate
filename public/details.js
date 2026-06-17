// ==========================
// صفحة تفاصيل العقار
// ==========================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadRealEstate() {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/real-estate/${id}`);

    if (!res.ok) {
      document.body.innerHTML = "<h2 style='text-align:center;color:red'>العقار غير موجود</h2>";
      return;
    }

    const data = await res.json();
    const property = data.real_estate;

    // تعبئة البيانات
    document.getElementById("title").innerText = property.type_real_estate + " - " + property.contract_type;
    document.getElementById("price").innerText = property.price + " ل.س";
    document.getElementById("location").innerText = property.address;
    document.getElementById("status").innerText = property.status_real_estate ?? "متاح";
    document.getElementById("description").innerText = property.description;
    document.getElementById("space").innerText = property.size + " م²";
    document.getElementById("direction").innerText = property.direction;

    // الصورة
    if (property.pictures && property.pictures.length > 0) {
      document.getElementById("mainImage").src = property.pictures[0].url;
    }

    // الخريطة
    if (property.point_of_width && property.point_of_length) {
      const lat = property.point_of_width;
      const lng = property.point_of_length;
      document.getElementById("map").src = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
    } else {
      document.querySelector(".map-section").style.display = "none";
    }

  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2 style='text-align:center;color:red'>حدث خطأ أثناء تحميل البيانات</h2>";
  }
}

//زر الشراء والاستئجار
let buyBtn = document.querySelector(".buy-btn");
let rentBtn = document.querySelector(".rent-btn");

buyBtn.onclick = function () {
    window.location.href = `/rental-Booking.html?type=buy&id=${property.id}`;
}

rentBtn.onclick = function () {
    window.location.href = `/rental-Booking.html?type=rent&id=${property.id}`;
}

loadRealEstate();