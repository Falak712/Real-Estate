<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fullname' => 'required|string|max:255',

            'email' => [
                'required',
                'string',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/',
                'unique:users,email'
            ],

            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[a-z]/',      // حرف صغير
                'regex:/[A-Z]/',      // حرف كبير
                'regex:/[0-9]/',      // رقم
                'regex:/[@_\-\$\#\!\%\*\?\&]/', // محرف خاص
            ],
            'phone_number'=>'nullable'

            /*'phone_number' => [
                'nullable',
                'regex:/^\+963[0-9]{9}$/'
            ],*/
        ];
    }

    public function messages(): array
    {
        return [
            'fullname.required' => 'الاسم الكامل مطلوب',

            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.regex' => 'صيغة البريد الإلكتروني غير صحيحة (يجب أن تنتهي بـ .com)',
            'email.unique' => 'البريد الإلكتروني مستخدم مسبقاً',

            'password.required' => 'كلمة المرور مطلوبة',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'password.min' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
            'password.regex' => 'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ومحرف خاص (@ _ - $ # ! % * ? &)',

            'phone_number.regex' => 'رقم الهاتف يجب أن يبدأ بـ +963 ويتكون من 9 
            أرقام بعدها (المجموع 13 رمز)',
        ];
    }
}