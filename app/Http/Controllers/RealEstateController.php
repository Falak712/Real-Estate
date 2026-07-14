<?php

namespace App\Http\Controllers;

use App\Models\RealEstate;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRealEstateRequest;
use App\Http\Requests\UpdateRealEstateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class RealEstateController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | عرض جميع العقارات
    |--------------------------------------------------------------------------
    |
    | يدعم:
    | - فلترة حسب المنطقة
    | - فلترة حسب نوع العقد
    | - فلترة حسب نوع العقار
    | - البحث
    | - فلترة بالسعر
    | - Pagination
    |
    */

    public function index(Request $request)
    {
        $query = RealEstate::with(['pictures', 'area'])
            ->where('order_status', 'approved');

        // فلترة حسب المنطقة
        if ($request->area_id) {
            $query->where('area_id', $request->area_id);
        }

        //فلترة حسب المدينة
        if ($request->address) {
            $query->where('address', 'like', '%' . $request->address . '%');
        }

        // فلترة حسب نوع العقد
        if ($request->contract_type) {
            $query->where('contract_type', $request->contract_type);
        }
        // فلترة حسب نوع العقار
        if ($request->type_real_estate) {
            $query->where('type_real_estate', $request->type_real_estate);
        }
        // البحث بالوصف أو العنوان
        if ($request->search) {

            $query->where(function ($q) use ($request) {
                $q->where('description', 'like', '%' . $request->search . '%')
                    ->orWhere('address', 'like', '%' . $request->search . '%');
            });
        }
        // أقل سعر
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        // أعلى سعر
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }
        // ترتيب الأحدث أولاً
        $realEstates = $query->latest()->paginate(10);
        return response()->json(['real_estates' => $realEstates]);
    }



    public function show(int$id)
    {
        $realEstate = RealEstate::with(['pictures', 'area'])->where('order_status', 'approved')->findOrFail($id);
        return response()->json(['real_estate' => $realEstate]);
    }

    public function store(StoreRealEstateRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
        $validated['status_real_estate'] = 'available';
        $validated['order_status'] = 'pending';

        if ($request->hasFile('identity_image')) {
            $validated['identity_image'] = $request->file('identity_image')->store('identities', 'public');
        }

        if ($request->hasFile('ownership_document')) {
            $validated['ownership_document'] = $request->file('ownership_document')->store('ownerships', 'public');
        }

        $realEstate = RealEstate::create($validated);

        Mail::raw(
            "مرحبا {$realEstate->user->fullname},\nتم استلام طلب إضافة العقار الخاص بك بنجاح.\nحالة الطلب الحالية: قيد المراجعة.\nسيتم إشعارك عند الموافقة أو الرفض من قبل الإدارة.",
            function ($message) use ($realEstate) {
                $message->to($realEstate->user->email)
                    ->subject('تأكيد استلام طلب إضافة العقار');
            }
        );

        return response()->json(['message' => 'تم إضافة العقار بنجاح', 'real_estate' => $realEstate], 201);
    }

    public function update(UpdateRealEstateRequest $request, int$id)
    {
        $realEstate = RealEstate::findOrFail($id);

        if ($realEstate->user_id != Auth::id()) {

            return response()->json(['message' => 'غير مسموح لك تعديل هذا العقار'], 403);
        }

        $validated = $request->validated();
        $validated['status_real_estate'] = 'available';
        $validated['order_status'] = 'pending';

        if ($request->hasFile('identity_image')) {

            if ($realEstate->identity_image) {
                Storage::disk('public')->delete($realEstate->identity_image);
            }

            $validated['identity_image'] = $request->file('identity_image')->store('identities', 'public');
        }

        if ($request->hasFile('ownership_document')) {

            if ($realEstate->ownership_document) {
                Storage::disk('public')->delete($realEstate->ownership_document);
            }

            $validated['ownership_document'] = $request->file('ownership_document')->store('ownerships', 'public');
        }

        $realEstate->update($validated);

        return response()->json(['message' => 'تم تعديل العقار بنجاح', 'real_estate' => $realEstate]);
    }

    public function destroy(int $id)
    {
        $realEstate = RealEstate::with('pictures')->findOrFail($id);

        if ($realEstate->user_id != Auth::id()) {
            return response()->json(['message' => 'غير مسموح لك حذف هذا العقار'], 403);
        }

        if ($realEstate->identity_image) {
            Storage::disk('public')->delete($realEstate->identity_image);
        }

        if ($realEstate->ownership_document) {
            Storage::disk('public')->delete($realEstate->ownership_document);
        }

        foreach ($realEstate->pictures as $picture) {

            Storage::disk('public')->delete($picture->image_path);

            $picture->delete();
        }

        $realEstate->delete();

        return response()->json(['message' => 'تم حذف العقار بنجاح']);
    }
    public function myrealestate()
    {
        $realEstate = RealEstate::where('user_id',Auth::id())   // 
            ->with(['pictures', 'area'])
            ->latest()
            ->get();

        return response()->json(['real_estates' => $realEstate]);
    }
}
