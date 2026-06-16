<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\RealEstate;
use Illuminate\Http\Request;
use App\Http\Resources\PictureResource;

class PictureController extends Controller
{
    // ✅ تخزين الصور
    public function store(Request $request, $id)
    {
        $request->validate(['images.*' => 'required|image']);

        try {
            $realEstate = RealEstate::findOrFail($id);

            foreach ($request->file('images') as $image) {
                $path = $image->store('real_estates', 'public');

                Picture::create([
                    'real_estate_id' => $realEstate->id,
                    'image_path' => $path
                ]);
            }

            return response()->json([
                'message' => 'تم رفع الصور بنجاح'
            ], 201);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'العقار غير موجود'
            ], 404);

        } catch (\Exception $e) {
            \Log::error('Picture upload error: ' . $e->getMessage());
            return response()->json([
                'message' => 'فشل رفع الصور، حاول مرة أخرى'
            ], 500);
        }
    }

    // ✅ عرض صور عقار معين
    public function index($id)
    {
        try {
            $realEstate = RealEstate::findOrFail($id);

            return PictureResource::collection($realEstate->pictures);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'العقار غير موجود'
            ], 404);
        }
    }

    // ✅ حذف صورة
    public function destroy($id)
    {
        try {
            $picture = Picture::findOrFail($id);

            // حذف الصورة من Storage
            \Storage::disk('public')->delete($picture->image_path);

            // حذف من قاعدة البيانات
            $picture->delete();

            return response()->json([
                'message' => 'تم حذف الصورة بنجاح'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'الصورة غير موجودة'
            ], 404);

        } catch (\Exception $e) {
            \Log::error('Delete picture error: ' . $e->getMessage());
            return response()->json([
                'message' => 'فشل حذف الصورة'
            ], 500);
        }
    }
}