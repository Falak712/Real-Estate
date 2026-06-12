<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class StoreRealEstateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
            'size' => 'required|numeric|min:1',
            'direction' => 'required|in:north,south,east,west,northeast,northwest,southeast,southwest',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'address' => 'required|string|max:255',
            'point_of_length' => 'required|numeric',
            'point_of_width' => 'required|numeric',
            'type_real_estate' => 'required|in:apartment,house,land,office',
            'status_real_estate' => 'nullable|in:available,booked,sold',
            'contract_type' => 'required|in:rent,sale',
            'ownership_contract' => 'nullable|string|max:255',
            'agency_contract' => 'nullable|string|max:255',
            'order_status' => 'nullable|in:pending,approved,rejected',
            'publication_date' => 'nullable|date',
            'area_id' => 'required|exists:areas,id',
        ];
    }

    public function messages(): array
    {
        return [

            'price.required' => 'السعر مطلوب',
            'price.numeric' => 'السعر يجب أن يكون رقماً',
            'size.required' => 'المساحة مطلوبة',
             'direction' => 'اتجاه العقار مطلوب',
            'address.required' => 'العنوان مطلوب',
            'point_of_length.required' => 'خط الطول مطلوب',
            'point_of_width.required' => 'خط العرض مطلوب',
            'type_real_estate.required' => 'نوع العقار مطلوب',
            'type_real_estate.in' => 'نوع العقار غير صحيح',
            'contract_type.required' => 'نوع العقد مطلوب',
            'contract_type.in' => 'نوع العقد غير صحيح',
            'area_id.required' => 'المنطقة مطلوبة',
            'area_id.exists' => 'المنطقة غير موجودة',

        ];
    }

    #[Override]
    public function attributes(): array
    {
        return [

            'price' => 'السعر',

            'description' => 'الوصف',

            'size' => 'المساحة',

            'direction' => 'اتجاه العقار',
            
             'bedrooms' => 'عدد الغرف',

            'bathrooms' => 'عدد الحمامات',

            'address' => 'العنوان',

            'point_of_length' => 'خط الطول',

            'point_of_width' => 'خط العرض',

            'type_real_estate' => 'نوع العقار',

            'status_real_estate' => 'حالة العقار',

            'contract_type' => 'نوع العقد',

            'ownership_contract' => 'عقد الملكية',

            'agency_contract' => 'عقد الوكالة',

            'order_status' => 'حالة الطلب',

            'publication_date' => 'تاريخ النشر',

            'area_id' => 'المنطقة',
        ];
    }
}