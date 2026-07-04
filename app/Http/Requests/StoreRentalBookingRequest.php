<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRentalBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ];
    }
    public function messages(): array
    {
        return [
            'start_date.required' => 'تاريخ البدء مطلوب.',
            'start_date.date' => '[yyyy-mm-dd] تاريخ البدء يجب أن يكون تاريخًا صالحًا .',
            'start_date.after_or_equal' => 'تاريخ البدء يجب أن يكون اليوم أو بعده.',
            'end_date.required' => 'تاريخ الانتهاء مطلوب.',
            'end_date.date' => '[yyyy-mm-dd] تاريخ الانتهاء يجب أن يكون تاريخًا صالحًا .',
            'end_date.after' => 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.',
        ];
    }
    public function attributes(): array
    {
        return [
            'start_date' => 'تاريخ البدء',
            'end_date' => 'تاريخ الانتهاء'
        ];
    }
}
