<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    protected $fillable = [
        'image',
        'real_estate_id'
    ];

    public function realEstate()
    {
        return $this->belongsTo(RealEstate::class);
    }
}