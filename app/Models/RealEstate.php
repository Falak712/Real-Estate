<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RealEstate extends Model
{
    protected $fillable = [
        
        'price',
        'description',
        'size',
        'direction',
        'bedrooms',
        'bathrooms',
        'address',
        'point_of_length',
        'point_of_width',
        'type_real_estate',
        'status_real_estate',
        'contract_type',
        'ownership_contract',
        'agency_contract',
        'order_status',
        'publication_date',
        'user_id',
        'area_id',
        
        
    ];
         public function user()
         {
            return $this->belongsTo(User::class);

         }
         public function area()
         {
         return $this->belongsTo(Area::class);
         }
}
