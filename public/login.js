async function login(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

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
        console.log(data);

        if (response.ok) {
            // حفظ التوكن
            localStorage.setItem("token", data.token);

            alert("تم تسجيل الدخول بنجاح");

            // الانتقال للصفحة الرئيسية
            window.location.href = "/index.html";
        } else {
            alert(data.message || "بيانات تسجيل الدخول غير صحيحة");
        }

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء الاتصال بالخادم");
    }
}