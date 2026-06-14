<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\RealEstate;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    public function store(Request $request, $realEstateId)
    {
        $realEstate = RealEstate::findOrFail($realEstateId);

        $picture = Picture::create(['image' => $request->image, 'real_estate_id' => $realEstate->id, ]);

        return response()->json([  'message' => 'تم إضافة الصورة بنجاح', 'picture' => $picture], 201);
    }
}
