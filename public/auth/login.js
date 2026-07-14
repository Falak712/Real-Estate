async function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    // التحقق من الحقول الفارغة
    if (email === "" || password === "") {
        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
        return;
    }

    // التحقق من كلمة المرور
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن حروفًا باللغة الإنجليزية وأرقامًا");
        return;
    }

    // التحقق من البريد الإلكتروني
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
        alert("يجب إدخال بريد إلكتروني من نوع Gmail");
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

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("تعذر الاتصال بالخادم");

    }

}