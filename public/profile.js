/*وقت يكبس ع زر تعديل الملف الشخصي  */
const editBtn = document.querySelector(".edit-profile");
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
let editing = false;
editBtn.addEventListener("click", async function () {
    if (!editing) {
        fullName.removeAttribute("readonly");
        phone.removeAttribute("readonly");
        email.removeAttribute("readonly");
        fullName.classList.add("editing");
        phone.classList.add("editing");
        email.classList.add("editing");
        editBtn.textContent = "حفظ التعديلات";
        editing = true;
    } 
    else {
        const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
        const phoneRegex = /^[0-9+]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nameRegex.test(fullName.value.trim())) {
            alert("الاسم يجب أن يحتوي على أحرف فقط.");
            fullName.focus();
            return;
        }
        if (!phoneRegex.test(phone.value.trim())) {
            alert("رقم الهاتف يجب أن يحتوي على أرقام فقط.");
            phone.focus();
            return;
        }
        if (!emailRegex.test(email.value.trim())) {
            alert("البريد الإلكتروني غير صحيح.");
            email.focus();
            return;
        }
        ///////////////////////////////////////////
        try {
    const response = await fetch("/profile/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            fullname: fullName.value,
            phone_number: phone.value,
            email: email.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        fullName.setAttribute("readonly", true);
        phone.setAttribute("readonly", true);
        email.setAttribute("readonly", true);

        fullName.classList.remove("editing");
        phone.classList.remove("editing");
        email.classList.remove("editing");

        editBtn.textContent = "تعديل الملف الشخصي";
        editing = false;

        alert(data.message);
    } else {
        alert("حدث خطأ أثناء الحفظ");
    }

} catch (error) {
    console.error(error);
    alert("فشل الاتصال بالسيرفر");
}
        /*  fullName.setAttribute("readonly", true);
        phone.setAttribute("readonly", true);
        email.setAttribute("readonly", true);
        fullName.classList.remove("editing");
        phone.classList.remove("editing");
        email.classList.remove("editing");
        editBtn.textContent = "تعديل الملف الشخصي";
        editing = false;
        alert("تم حفظ التعديلات بنجاح.");*/
    }
});
/*وقت يكبس ع زر تسجيل الخروج*/
const logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", function () {
    let confirmLogout = confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
});
/*وقت يكبس ع زر تعديل كلمة السر */
const passwordBtn = document.querySelector(".edit-password");
const passwordModal = document.getElementById("passwordModal");
const closePassword = document.getElementById("closePassword");
const savePassword = document.getElementById("savePassword");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
function checkPassword(){
    if(
        oldPassword.value.length > 0 &&
        newPassword.value.length >= 8 &&
        newPassword.value === confirmPassword.value
    ){
        savePassword.disabled = false;
        savePassword.classList.add("active");
    }
    else{
        savePassword.disabled = true;
        savePassword.classList.remove("active");
    }
}
oldPassword.addEventListener("input",checkPassword);
newPassword.addEventListener("input",checkPassword);
confirmPassword.addEventListener("input",checkPassword);
passwordBtn.addEventListener("click",function(){
    passwordModal.style.display="flex";
});
closePassword.addEventListener("click",function(){
    passwordModal.style.display="none";
});
savePassword.addEventListener("click",async function(){
const oldPassword =
document.getElementById("oldPassword").value;
const newPassword =
document.getElementById("newPassword").value;
const confirmPassword =
document.getElementById("confirmPassword").value;
if(newPassword.length < 8){
    alert("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
    return;
}
if(newPassword !== confirmPassword){
    alert("تأكيد كلمة المرور غير مطابق");
    return;
}
// إرسال البيانات للـ Backend
const response = await fetch("/change-password",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        oldPassword:oldPassword,
        newPassword:newPassword
    })
});
const data = await response.json();
if(data.success){
    alert("تم تغيير كلمة المرور بنجاح");
    passwordModal.style.display="none";
}
else{
    alert(data.message);
}
});
/* عرض المزيد */ 
const realestateCards = document.querySelectorAll(".realestate-card");
realestateCards.forEach(function(card){
    card.addEventListener("click", function(){
        window.location.href = "myRealEstates.html";
    });
});
const moreBtn = document.querySelector(".more-btn");
moreBtn.addEventListener("click",function(){
    window.location.href="myRealEstates.html";
});