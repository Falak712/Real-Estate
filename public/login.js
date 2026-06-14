console.log("Welcome to the login page!");
/*let email = document.querySelector("#email");
let password = document.querySelector("#password");
*/
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");

        return;
    }


 // إذا كانت الحقول ممتلئة ينتقل للرئيسية
   window.location.href = "/index.html";
}
   /*
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

loginBtn.onclick = async function(e){

    e.preventDefault();

    if(
        email.value === "" ||
        password.value === ""
    ){
        alert("الرجاء تعبئة جميع الحقول");
        return;
    }

    const response = await fetch(
        "http://127.0.0.1:8000/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }
    );

    const data = await response.json();

    console.log(data);

    if(response.ok){
        alert("تم تسجيل الدخول بنجاح");
        localStorage.setItem("token", data.token);
    }
    else{
        alert(data.message);
    }
}*/