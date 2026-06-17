<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalBooking extends Model
{

    protected $fillable = [
        'status',
        'start_date',
        'end_date',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function realEstates()
    {
        return $this->belongsToMany(
            RealEstate::class,
            'realestate_booking',
            'rental_bookings_id',
            'real_estates_id'
        );
    }
}
