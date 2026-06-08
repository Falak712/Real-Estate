<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRealEstateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

        'price' => 'nullable|numeric',

        'description' => 'nullable|string|max:255',

        'size' => 'nullable|numeric',

        'sides' => 'nullable|numeric',

        'address' => 'nullable|string|max:255',

        'point_of_length' => 'nullable|numeric',

        'point_of_width' => 'nullable|numeric',

        'type_real_estate' => 'nullable|in:apartment,house,land,office',

        'contract_type' => 'nullable|in:rent,sale',

        'area_id' => 'nullable|exists:areas,id',
    ];
}
}