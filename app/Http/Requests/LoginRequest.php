<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class LoginRequest extends FormRequest
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
          'email'=>'required|email',
          'password'=>'required|min:6',

        ];
    }

    public function message():array
    {
        return[
        'email.required'=>'البريد الإلكتروني مطلوب',
        'email.email'=>'البريد الإلكتروني غير صحيح',
        'password.required' =>'كلمة المرور مطلوبة',


        ];
    }

    #[Override]
    public function attributes():array
    {
        return[

        'email' => 'البريد الإلكتروني',
        'password' =>'كلمة المرور',
        ];
    }

}
