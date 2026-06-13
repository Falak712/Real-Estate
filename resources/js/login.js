let email = document.querySelector("#email");
let password = document.querySelector("#password");

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");

        return;
    }

    window.location.href = "index.html";
 // إذا كانت الحقول ممتلئة ينتقل للرئيسية
window.location.href = "index.html";
}