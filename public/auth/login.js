async function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    // التحقق من الحقول الفارغة فقط
    if (email === "" || password === "") {
        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            // تخزين التوكن
            localStorage.setItem("token", data.token);

            // تخزين بيانات المستخدم
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);

            window.location.href = "../main/index.html";

        } else {

            alert(data.message || "بيانات الدخول غير صحيحة");

        }

    } catch (error) {

        console.error(error);

        alert("تعذر الاتصال بالخادم");

    }
;
}
window.addEventListener("pageshow", function(event) {
    setTimeout(function() {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }, 50);
});