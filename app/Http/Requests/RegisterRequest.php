<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return True;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'fullname'=> 'required|string|max:255',
         'email'=> 'required|email|unique:users,email',
         'password'=>'required|min:6|confirmed',
         'phone_number'=>'nullable|string|max:10',
         'userType'=>'required|in:user,admin',    


        ];
    }
    #[Override]
    public function messages():array
    {
       return[
         'fullname.required'=> 'الاسم مطلوب بالكامل',
         'fullname.string'=> 'الاسم يجب ان يكون نصا',
         'fullname.max'=> 'الاسم طويل جدا (الحد الاقصى 255 حرف)',

         'email.required'=> 'البريد الإلكتروني مطلوب',
         'email.email'=> 'البريد الإلكتروني غير صحيح',
         'email.unique'=> 'البريد الإلكتروني مستحدم مسبقا',

         'password.required'=> 'كلمة المرور مطلوبة',
         'password.min'=> 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
         'password.confirmed'=> 'كلمة المرور غير متطابقة',

         'phone_number.string'=> 'رقم الهاتف يجب أن يكون نصا',
         'phone_number.max'=> 'رقم الهاتف يجب ان يكون من 10 ارقام حصرا',

       ];
    }

    #[Override]
    public function attributes():array
    {
        return[
           'fullname'=> 'الاسم الكامل',
           'email'=> 'البريد الإلكنروني',
           'password'=>'كلمة المرور',
           'phone_number'=>'رقم الهاتف',


        ];
    }
}
