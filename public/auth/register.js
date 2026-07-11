async function register(e) {
    e.preventDefault();

    let fullName = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('confirm-password').value;
    let phoneNumber = document.getElementById('phone-number').value;

    try {
        let response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                fullname: fullName,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                phone_number: phoneNumber
            })
        });

        let data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                let firstError = Object.values(data.errors)[0][0];
                alert(firstError);
            } else {
                alert(data.message || 'حدث خطأ أثناء التسجيل');
            }
            return;
        }

        localStorage.setItem('token', data.token);
        alert('تم إنشاء الحساب بنجاح!');
        window.location.href = 'index.html';

    } catch (error) {
        alert('حدث خطأ في الاتصال بالسيرفر');
        console.error(error);
    }
}

// ==========================
// إظهار/إخفاء كلمة المرور
// ==========================
let togglePassword = document.getElementById('togglePassword');
let passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

let toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
let confirmPasswordField = document.getElementById('confirm-password');

toggleConfirmPassword.addEventListener('click', function() {
    if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
    } else {
        confirmPasswordField.type = 'password';
    }
});