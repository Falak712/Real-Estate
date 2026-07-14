<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentalBookingRequest;
use App\Http\Requests\UpdateRentalBookingRequest;
use App\Models\RealEstate;
use App\Models\RentalBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class RentalBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rentalBookings = RentalBooking::all();
        return response()->json($rentalBookings, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRentalBookingRequest $request)
    {
        $property =RealEstate::findOrFail($request->real_estates_id);
if ($property->order_status != 'approved') {

    return response()->json([
        'message' => 'لا يمكن حجز عقار قبل موافقة الإدارة عليه.'
    ], 403);

}
if ($property->status_real_estate != 'available') {

    return response()->json([
        'message' => 'العقار غير متاح للحجز.'
    ], 400);

}
        //فحص تعارض الحجز مع اخر 
        $conflict = RentalBooking::whereHas(
            'realEstates',
            function ($q) use ($request) {
                $q->where('real_estates_id',$request->real_estates_id);
            }
        )
            ->whereIn('status', ['pending','confirmed'])
            ->where(function ($q) use ($request) {$q->where('start_date','<=',$request->end_date)
            ->where('end_date','>=',$request->start_date);
            })->exists();

        if ($conflict) {
            return response()->json('هذه الفترة محجوزة مسبقاً', 422);
        }
        $booking = RentalBooking::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'pending',
            'user_id' => Auth::id()
        ]);
        //الربط بين الحجز والعقار
        $booking->realEstates()->attach($request->real_estates_id);
        $user = Auth::user();

        Mail::raw(
            "مرحباً {$user->fullname},

            تم استلام طلب الاستئجار الخاص بك بنجاح.

            [ حالة الطلب الحالية:[ قيد المراجعة.

            سيتم إشعارك عند الموافقة أو الرفض من قبل الإدارة.",
                function ($message) use ($user) {
                $message->to($user->email)->subject('تأكيد استلام طلب الاستئجار');
    }
);
        return response()->json(['تم إرسال طلب الحجز بنجاح', $booking], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $rentalBooking = RentalBooking::findOrFail($id);
        return response()->json($rentalBooking, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRentalBookingRequest $request, RentalBooking $rentalbooking)
    {
        //تعديل الحجز فقط اذا كان  pending
        if ($rentalbooking->status !== 'pending') {

            return response()->json('لا يمكن تعديل هذا الحجز', 403);
        }

        $realEstate = $rentalbooking->realEstates()->first();

        $conflict = RentalBooking::whereHas(
            'realEstates',
            function ($q) use ($realEstate) {
                $q->where('real_estates_id',$realEstate->id);
            }
        )
            ->whereIn('status', ['pending','confirmed'])
            //اذا في حجز اتجاهله 
            ->where('id', '!=', $rentalbooking->id)
            ->where(function ($q) use ($request) {
                $q->where('start_date','<=',$request->end_date)
                    ->where('end_date','>=',$request->start_date);
            })
            ->exists();

        if ($conflict) {
            return response()->json('هذه الفترة محجوزة مسبقاً', 422);
        }
        $rentalbooking->update([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date
        ]);

        return response()->json(['تم تعديل الحجز بنجاح', $rentalbooking], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentalBooking $rentalbooking)
    {
        if ($rentalbooking->status !== 'pending') {

            return response()->json('لا يمكن حذف هذا الحجز', 403);
        }

        $rentalbooking->realEstates()->detach();

        $rentalbooking->delete();

        return response()->json('تم حذف الحجز بنجاح', 204);
    }


    public function bookedDates($id)
    {
        $rentalBooking = RentalBooking::findOrFail($id);

      /*  return $rentalBooking->realEstates()
            ->where('status', 'confirmed')
            ->get(['start_date','end_date']);*/

    return RentalBooking::where('id', $id)
        ->where('status', 'confirmed')
        ->get(['start_date', 'end_date']);
}
    }

