// ================= عناصر الصفحة =================
const editBtn = document.querySelector(".edit-profile");
const logoutBtn = document.querySelector(".logout");
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const passwordBtn = document.querySelector(".edit-password");
const passwordModal = document.getElementById("passwordModal");
const closePassword = document.getElementById("closePassword");
const savePassword = document.getElementById("savePassword");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const passwordHint = document.getElementById("passwordHint");
const nameHint = document.getElementById("nameHint");
const phoneHint = document.getElementById("phoneHint");
const emailHint = document.getElementById("emailHint");
let editing = false;
// ================= Events =================
editBtn.addEventListener("click", editProfile);
logoutBtn.addEventListener("click", logout);
passwordBtn.addEventListener("click", openPasswordModal);
closePassword.addEventListener("click", closePasswordModal);
savePassword.addEventListener("click", changePassword);
oldPassword.addEventListener("input", checkPassword);
newPassword.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkPassword);
fullName.addEventListener("input", validateInputs);
phone.addEventListener("input", validateInputs);
email.addEventListener("input", validateInputs);
// ================= تعديل الملف الشخصي =================
function editProfile() {
    if (!editing) {
        enableEditing();
        return;
    }
    if (!validateProfile()) return;
    const profileData = {
        fullname: fullName.value.trim(),
        phone_number: phone.value.trim(),
        email: email.value.trim()
    };
    console.log(profileData);
    // Backend يربط البيانات من هنا
    disableEditing();
    alert("تم حفظ التعديلات.");
}
// ================= تفعيل التعديل =================
function enableEditing() {
    fullName.removeAttribute("readonly");
    phone.removeAttribute("readonly");
    email.removeAttribute("readonly");
    fullName.classList.add("editing");
    phone.classList.add("editing");
    email.classList.add("editing");
    editBtn.textContent = "حفظ التعديلات";
    editing = true;
    validateInputs();
}
// ================= إيقاف التعديل =================
function disableEditing() {
    fullName.setAttribute("readonly", true);
    phone.setAttribute("readonly", true);
    email.setAttribute("readonly", true);
    fullName.classList.remove("editing");
    phone.classList.remove("editing");
    email.classList.remove("editing");
    editBtn.textContent = "تعديل الملف الشخصي";
    editing = false;
   nameHint.style.display = "none";
   phoneHint.style.display = "none";
   emailHint.style.display = "none";
}
// ================= التحقق من البيانات =================
function validateProfile() {
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    const phoneRegex = /^[0-9+]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(fullName.value.trim())) {
        alert("الاسم يجب أن يحتوي على أحرف فقط.");
        fullName.focus();
        return false;
    }
    if (!phoneRegex.test(phone.value.trim())) {
        alert("رقم الهاتف غير صحيح.");
        phone.focus();
        return false;
    }
    if (!emailRegex.test(email.value.trim())) {
        alert("البريد الإلكتروني غير صحيح.");
        email.focus();
        return false;
    }
    return true;
}
function validateInputs(){
    //========== الاسم ==========
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    if(nameRegex.test(fullName.value.trim())){
        nameHint.textContent="";
        nameHint.className="input-hint";
    }else{
        nameHint.textContent="✖ يسمح بالأحرف العربية والإنجليزية فقط";
        nameHint.className="input-hint error";

    }
    //========== الهاتف ==========
    const phoneRegex=/^[0-9+]+$/;
    if(phoneRegex.test(phone.value.trim())){
       phoneHint.textContent="";
       phoneHint.className="input-hint";
    }else{
        phoneHint.textContent="✖ أدخل رقمًا صحيحًا مع رمز الدولة";
        phoneHint.className="input-hint error";

    }
    //========== البريد ==========
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
       emailHint.textContent="";
       emailHint.className="input-hint";
    }else{
        emailHint.textContent="✖ مثال: name@gmail.com";
        emailHint.className="input-hint error";
    }
}
// ================= تسجيل الخروج =================
function logout() {
    if (confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟")) {
        // Backend يضيف عملية Logout هنا
        window.location.href = "index.html";
    }
}
// ================= فتح نافذة كلمة المرور =================
function openPasswordModal() {
    passwordModal.style.display = "flex";
}
// ================= إغلاق النافذة =================
function closePasswordModal() {
    passwordModal.style.display = "none";
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    savePassword.disabled = true;
    savePassword.classList.remove("active");
}
// ================= تفعيل زر الحفظ =================
function checkPassword() {
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=\[\]{};:'",.<>\/\\|`~]).{8,}$/;
    if (passwordRegex.test(newPassword.value)) {
        passwordHint.classList.remove("invalid");
        passwordHint.classList.add("valid");
    } else {
        passwordHint.classList.remove("valid");
        passwordHint.classList.add("invalid");
    }
    const valid =
        oldPassword.value.trim() !== "" &&
        passwordRegex.test(newPassword.value) &&
        newPassword.value === confirmPassword.value;
    savePassword.disabled = !valid;
    savePassword.classList.toggle("active", valid);
}
// ================= تغيير كلمة المرور =================
function changePassword() {
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=\[\]{};:'",.<>\/\\|`~]).{8,}$/;
    if (!passwordRegex.test(newPassword.value)) {
        alert("كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف واحد على الأقل، ورقم واحد على الأقل، ورمز خاص واحد على الأقل.");
        return;
    }
    if (newPassword.value !== confirmPassword.value) {
        alert("تأكيد كلمة المرور غير مطابق.");
        return;
    }
    const passwordData = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    };
    console.log(passwordData);
    // Backend يربط من هنا
    closePasswordModal();
    alert("تم تغيير كلمة المرور بنجاح.");
}
// ================= زر عرض المزيد =================
document.querySelector(".more-btn").addEventListener("click", () => {
    window.location.href = "myRealEstates.html";
});