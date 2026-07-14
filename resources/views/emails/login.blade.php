<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
</head>
<body>

<h2>مرحباً {{ $user->fullname }}</h2>

<p>
تم تسجيل الدخول إلى حسابك بنجاح.
</p>

<p>
إذا لم تكن أنت من قام بتسجيل الدخول،
يرجى تغيير كلمة المرور فوراً.
</p>

<p>
الوقت:
{{ now()->format('Y-m-d H:i') }}
</p>

</body>
</html>