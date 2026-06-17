<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'fullname',
        'email',
        'password',
        'phone_number',
        'userType',
        'banned',
        'personal_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function punishments()
    {
        return $this->hasMany(Punishment::class);
    }

    public function realEstate()
    {
        return $this->hasMany(RealEstate::class);
        }
    public function notices()
    {
        return $this->hasMany(Notice::class);
    }
    public function rentalBookings()
    {
        return $this->hasMany(RentalBooking::class);
    }
    public function favorites()
    {
        return $this->hasOne(Favorite::class);

    }
}

