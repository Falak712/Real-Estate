let email = document.querySelector("#email");
let password = document.querySelector("#password");


// عند الضغط على زر إنشاء الحساب
registerButton.onclick = function(e){
    // منع إعادة تحميل الصفحة
    e.preventDefault();

    // التحقق من الحقول الفارغة

    if(
        email.value === "" ||
        password.value === ""
    ){
        alert("الرجاء تعبئة جميع الحقول");
    }
}