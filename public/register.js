// جلب العناصر
let registerButton = document.querySelector(".register-btn");
let fullName = document.querySelector("#fullname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");

// عند الضغط على زر إنشاء الحساب
registerButton.onclick = async function (e) {
    e.preventDefault();

    // التحقق من الحقول الفارغة
    if (
        fullName.value === "" ||
        email.value === "" ||
        password.value === "" ||
        confirmPassword.value === ""
    ) {
        alert("الرجاء تعبئة جميع الحقول");
        return;
    }

    // التحقق من تطابق كلمات المرور
    if (password.value !== confirmPassword.value) {
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    // التحقق من طول كلمة المرور
    if (password.value.length < 6) {
        alert("يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل");
        return;
    }

    // إرسال البيانات إلى الباك Laravel
    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
    fullname: fullName.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value, // الاسم الصحيح
    userType:"user"
    //phone_number: phoneNumber.value // إذا عندك حقل رقم الهاتف
})
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert("تم إنشاء الحساب بنجاح ✨");
            // حفظ التوكن إذا رجع من الباك
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            // الانتقال لصفحة تسجيل الدخول
            window.location.href = "/login.html";
        } else {
            alert(data.message || "حدث خطأ أثناء التسجيل");
        }
    } catch (error) {
        console.error(error);
        alert("تعذر الاتصال بالخادم");
    }
};

// إظهار وإخفاء كلمة المرور
let passwordInput = document.querySelector("#password");
let togglePassword = document.querySelector("#togglePassword");

togglePassword.onclick = function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.innerHTML = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.innerHTML = "👁";
    }
};

// تأكيد كلمة المرور
let confirmPasswordInput = document.querySelector("#confirm-password");
let toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");

toggleConfirmPassword.onclick = function () {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.innerHTML = "🙈";
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.innerHTML = "👁";
    }
};

// رسالة ترحيب بسيطة
function welcomeUser(name) {
    return `مرحبا ${name} في موقع Magic Estate`;
}
console.log(welcomeUser("Wiigud"));