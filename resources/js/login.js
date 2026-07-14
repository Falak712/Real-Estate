
let email = document.querySelector("#email");
let password = document.querySelector("#password");

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");

        return;
    }

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;  //(?=.*[A-Za-z]) لازم يكون عندي حرف واحد اقل شي
                                                          //(?=.*\d) لازم رقم  واحد عالاقل
                                                          //.{8,} الطول 8 محارف و واكتر
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!passwordRegex.test(password)) {
        alert("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن حروفًا باللغة الانكليزية وأرقامًا");  // التحقق من أن البريد ينتهي @gmail.com
        return;
    }

    if (!emailRegex.test(email)) {
       alert("يجب إدخال بريد إلكتروني من نوع Gmail");
       return;
    }

      alert("تم التسجيل بنجاح");

let formData = new FormData();

formData.append("email", email);
formData.append("password", password);

//حفظ حالة تسجيل الدخول
localStorage.setItem("isLoggedIn", "true");

 // إذا كانت الحقول ممتلئة ينتقل للرئيسية
   window.location.href = "../views/index.html";
}
