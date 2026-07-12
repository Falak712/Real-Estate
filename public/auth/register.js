// جلب العناصر

let registerButton = document.querySelector(".register-btn");

let fullName = document.querySelector("#fullname");

let email = document.querySelector("#email");

let password = document.querySelector("#password");

let confirmPassword = document.querySelector("#confirm-password");

let phoneNumber = document.querySelector("#phone-number");

// عند الضغط على زر إنشاء الحساب
registerButton.onclick = function(e){


        // منع إعادة تحميل الصفحة
    e.preventDefault();

    // التحقق من الحقول الفارغة

    if(

        fullName.value === "" ||
        email.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        phoneNumber.value === ""
    ){
        alert("الرجاء تعبئة جميع الحقول");
        return;
    }

    // التحقق من تطابق كلمات المرور

    if(password.value !== confirmPassword.value){

        alert("كلمتا المرور غير متطابقتين");

    }

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;  //(?=.*[A-Za-z]) لازم يكون عندي حرف واحد اقل شي
    //(?=.*\d) لازم رقم  واحد عالاقل
    //.{8,} الطول 8 محارف و واكتر
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let phoneRegex = /^\d{10}$/;

    if (!passwordRegex.test(password.value)) {
        alert(" يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن حروفًا وأرقامًا بالانكليزي");  //التحقق من أن البريد ينتهي @gmail.com
        return;
    }

    if (!emailRegex.test(email.value)) {
       alert("يجب إدخال بريد إلكتروني من نوع Gmail");
       return;

    }
    if (!phoneRegex.test(phoneNumber.value)) {
        alert("يجب أن يكون رقم الهاتف مكوناً من 10 أرقام");
        return;
    }

    let formData = new FormData();

    formData.append("fullName", fullName.value);
    formData.append("email", email.value);
    formData.append("phoneNumber", phoneNumber.value);
    formData.append("password", password.value);

    alert("تم إنشاء الحساب بنجاح ✨");
        // إذا كانت الحقول ممتلئة ينتقل للرئيسية
        window.location.href = "../views/index.html";

};


// إظهار وإخفاء كلمة المرور

let passwordInput =
document.querySelector("#password");

let togglePassword =
document.querySelector("#togglePassword");

togglePassword.onclick = function(){

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.innerHTML = "🙈";

    }else{

        passwordInput.type = "password";

        togglePassword.innerHTML = "👁";

    }

};


// تأكيد كلمة المرور

let confirmPasswordInput =
document.querySelector("#confirm-password");

let toggleConfirmPassword =
document.querySelector("#toggleConfirmPassword");

toggleConfirmPassword.onclick = function(){

    if(confirmPasswordInput.type === "password"){

        confirmPasswordInput.type = "text";

        toggleConfirmPassword.innerHTML = "🙈";

    }else{

        confirmPasswordInput.type = "password";

        toggleConfirmPassword.innerHTML = "👁";

    }

};
