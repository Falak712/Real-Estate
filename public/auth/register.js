//====================
// جلب العناصر
//====================

let registerButton = document.querySelector(".register-btn");

let fullName = document.querySelector("#fullname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");
let phoneNumber = document.querySelector("#phone-number");

//====================
// إنشاء حساب
//====================

registerButton.onclick = async function (e) {

    e.preventDefault();

    // التحقق من الحقول الفارغة
    if (
        fullName.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        phoneNumber.value.trim() === ""
    ) {
        alert("الرجاء تعبئة جميع الحقول");
        return;
    }

    // تطابق كلمة المرور
    if (password.value !== confirmPassword.value) {
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    // التحقق من كلمة المرور
    let passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_\-$#!%*?&]).{8,}$/;

    if (!passwordRegex.test(password.value)) {
        alert("يجب أن تحتوي كلمة المرور على حرف كبير، حرف صغير، رقم، ورمز خاص (@ _ - $ # ! % * ? &) وألا تقل عن 8 محارف.");
        return;
    }

    // التحقق من البريد
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email.value)) {
        alert("يجب إدخال بريد إلكتروني من نوع Gmail");
        return;
    }

    // التحقق من رقم الهاتف
    let phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumber.value)) {
        alert("يجب أن يكون رقم الهاتف مكوناً من 10 أرقام");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({

                fullname: fullName.value.trim(),

                email: email.value.trim(),

                phone_number: phoneNumber.value.trim(),

                password: password.value,

                password_confirmation: confirmPassword.value

            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);

            window.location.href = "../main/index.html";

        } else {

            if (data.errors) {

                let errors = "";

                for (let key in data.errors) {
                    errors += data.errors[key][0] + "\n";
                }

                alert(errors);

            } else {

                alert(data.message);

            }

        }

    } catch (error) {

        console.error(error);

        alert("تعذر الاتصال بالخادم");

    }

};

//====================
// إظهار كلمة المرور
//====================

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

//====================
// إظهار تأكيد كلمة المرور
//====================

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