<?php

namespace App\Http\Controllers;

use App\Models\RealEstate;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRealEstateRequest;
use App\Http\Requests\UpdateRealEstateRequest;
use Illuminate\Support\Facades\Auth;

class RealEstateController extends Controller
{
    public function index() 
    {
        $realEstates = RealEstate::all();
        return response()->json(['real_estates' => $realEstates]);
    }

    public function show($id)
    {
        $realEstate = RealEstate::findOrFail($id);
        return response()->json(['real_estate' => $realEstate]);
    }

    public function store(StoreRealEstateRequest $request)
    {
        $validated = $request->validated();
        
        $validated['user_id'] = Auth::id();
        $validated['status_real_estate'] = 'available';
        $validated['order_status'] = 'pending';

        $realEstate = RealEstate::create($validated);

        return response()->json([
            'message' => 'تم إضافة العقار بنجاح',
            'real_estate' => $realEstate
        ], 201);
    }

    public function update(UpdateRealEstateRequest $request, $id)
    {
        $realEstate = RealEstate::findOrFail($id);
        $realEstate->update($request->validated());
        return response()->json([
            'message' => 'تم تعديل العقار بنجاح',
            'real_estate' => $realEstate
        ]);
    }

    public function destroy($id)
    {
        $realEstate = RealEstate::findOrFail($id);
        $realEstate->delete();
        return response()->json([
            'message' => 'تم حذف العقار بنجاح'
        ]);
    }
}