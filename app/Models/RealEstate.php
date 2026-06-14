<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RealEstate extends Model
{
    protected $fillable = [
        
        'price',
        'description',
        'size',
        'sides',
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
        'picture_id',
        'area_id',
        
        
    ];
         public function owner()
         {
            return $this->belongsTo(User::class,'owner_id');

         }
         public function area()
         {
         return $this->belongsTo(Area::class);
         }

         public function pictures()
{
    return $this->hasMany(Picture::class);
}
}
