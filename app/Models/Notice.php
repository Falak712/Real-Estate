<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $fillable = [
        'notification_message',
        'date_message',
        'check',
        'user_id'
    ];
    //filled with data from request

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
