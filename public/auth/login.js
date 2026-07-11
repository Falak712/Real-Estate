async function login(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        let response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                let firstError = Object.values(data.errors)[0][0];
                alert(firstError);
            } else {
                alert(data.message || 'البيانات غير صحيحة');
            }
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';

    } catch (error) {
        alert('حدث خطأ في الاتصال بالسيرفر');
        console.error(error);
    }
}