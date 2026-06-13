// جلب العناصر

let registerButton = document.querySelector(".register-btn");

let fullName = document.querySelector("#fullname");

let email = document.querySelector("#email");

let password = document.querySelector("#password");

let confirmPassword = document.querySelector("#confirm-password");


// عند الضغط على زر إنشاء الحساب
registerButton.onclick = function(e){
    // منع إعادة تحميل الصفحة
    e.preventDefault();

    // التحقق من الحقول الفارغة

    if(

        fullName.value === "" ||
        email.value === "" ||
        password.value === "" ||
        confirmPassword.value === ""
    ){
        alert("الرجاء تعبئة جميع الحقول");

    }

    // التحقق من تطابق كلمات المرور

    else if(password.value !== confirmPassword.value){

        alert("كلمتا المرور غير متطابقتين");

    }

    // التحقق من طول كلمة المرور

    else if(password.value.length < 6){

        alert("يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل");

    }

    // نجاح التسجيل

    else{

        alert("تم إنشاء الحساب بنجاح ✨");
        // إذا كانت الحقول ممتلئة ينتقل للرئيسية
   window.location.href = "../views/index.html";

    }

};


// رسالة ترحيب
function welcomeUser(name){

    return `مرحباً ${name} في موقع Magic Estate`;

}
console.log(welcomeUser("Shahed")
);
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
