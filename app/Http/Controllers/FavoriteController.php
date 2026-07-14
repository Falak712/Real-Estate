<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // عرض مفضلة المستخدم

    public function index()
    {
        $favorite = Favorite::with('realEstates')
            ->where('user_id', Auth::id())
            ->first();

        return response()->json($favorite, 200);
    }

    // إضافة عقار للمفضلة

    public function store(Request $request)
    {
        $request->validate(['real_estates_id' => 'required|exists:real_estates,id']);

        $favorite = Favorite::firstOrCreate(['user_id' => Auth::id()]);

        if ($favorite->realEstates()->where('real_estates_id', $request->real_estates_id)
                                    ->exists()
        ) {
            return response()->json(['message' => 'العقار موجود بالمفضلة مسبقاً'], 409);
        }

        $favorite->realEstates()->attach($request->real_estates_id);

        return response()->json(['message' => 'تمت إضافة العقار إلى المفضلة'], 201);
    }

    // عرض سجل مفضلة واحد

    public function show($id)
{
    $favorite = Favorite::with('realEstates')
        ->where('user_id', Auth::id())
        ->findOrFail($id);
    return response()->json($favorite);
}
    // حذف عقار من المفضلة

    public function destroy($realEstateId)
    {
        $favorite = Favorite::where('user_id',Auth::id())->first();

        if (!$favorite) {
            return response()->json(['message' => 'لا توجد مفضلة'], 404);
        }

        $favorite->realEstates()->detach($realEstateId);

        return response()->json(['message' => 'تم حذف العقار من المفضلة'], 200);
    }
}