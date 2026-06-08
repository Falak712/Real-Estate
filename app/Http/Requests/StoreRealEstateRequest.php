<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRealEstateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    
     public function rules(): array
{
    return [

        'price' => 'required|numeric',

        'description' => 'nullable|string|max:255',

        'size' => 'required|numeric',

        'sides' => 'required|numeric',

        'address' => 'required|string|max:255',

        'point_of_length' => 'required|numeric',

        'point_of_width' => 'required|numeric',

        'type_real_estate' => 'required|in:apartment,house,land,office',

        'contract_type' => 'required|in:rent,sale',

        'area_id' =>'required|exists:areas,id',

    ];
}
}
