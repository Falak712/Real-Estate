<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id'
    ];

    public function realEstates()
    {
        return $this->belongsToMany(
            RealEstate::class,
            'favorities_real_estates',
            'favorites_id',
            'real_estates_id'
        );
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
