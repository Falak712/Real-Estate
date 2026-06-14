<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = ['name'];
<<<<<<< HEAD


    public function realestate()
    {
      return  $this->hasMany(RealEstate::class);
    }
}


=======
    
    public function realEstates()
    {
        return $this->hasMany(RealEstate::class);
    }
}
>>>>>>> origin/database-update
