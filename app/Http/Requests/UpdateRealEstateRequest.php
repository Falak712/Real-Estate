<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRealEstateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'price' => 'sometimes|numeric|min:0',

            'description' => 'sometimes|nullable|string|max:255',

            'size' => 'sometimes|numeric|min:1',

            'direction' => 'sometimes|in:north,south,east,west,northeast,northwest,southeast,southwest',

            'address' => 'sometimes|string|max:255',

            'point_of_length' => 'sometimes|numeric',

            'point_of_width' => 'sometimes|numeric',

            'type_real_estate' => 'sometimes|in:apartment,house,land,office',

            'status_real_estate' => 'sometimes|in:available,booked,sold',

            'contract_type' => 'sometimes|in:rent,sale',

            'ownership_contract' => 'sometimes|nullable|string|max:255',

            'agency_contract' => 'sometimes|nullable|string|max:255',

            'order_status' => 'sometimes|in:pending,approved,rejected',

            'publication_date' => 'sometimes|date',

            'area_id' => 'sometimes|exists:areas,id',

            'bedrooms' => 'sometimes|integer|min:0',

            'bathrooms' => 'sometimes|integer|min:0',
        ];
    }
}