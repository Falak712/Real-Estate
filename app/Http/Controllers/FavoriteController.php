<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\RealEstate;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorites = Favorite::all();
        return response()->json($favorites, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RealEstate $realEstate)
    {
        $favorite = Favorite::create($realEstate->validated());
        $favorite->real_estates()->attach(
            $realEstate->real_estates_id
        );
        return response()->json($favorite, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RealEstate $realEstate)
    {
        $favorite = Favorite::findOrFail($realEstate->id);
        return response()->json($favorite, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RealEstate $id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();
        $id->realEstates()->detach();
        return response()->json('تم الحذف بنجاح', 204);
    }
}
