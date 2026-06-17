<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Override;

class RealEstate extends Model
{
    protected $fillable = [
        'price',
        'description',
        'size',
        'sides',
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
        'national_image_id',
        'order_status',
        'publication_date',
        'user_id',
        'area_id',
        'picture_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function rentalBookings()
    {
        return $this->belongsToMany(
            RentalBooking::class,
            'realestate_booking',
            'rental_bookings_id',
            'real_estates_id'
        );
    }
}
