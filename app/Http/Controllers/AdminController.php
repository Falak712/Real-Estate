<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RealEstate;
use App\Models\RentalBooking;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

use App\Mail\BookingApprovedMail;
use App\Mail\BookingRejectedMail;
use App\Mail\PropertyApprovedMail;
use App\Mail\PropertyRejectedMail;

class AdminController extends Controller
{

    //==================================
    // إدارة المستخدمين
    //==================================

    public function index()
    {
        return response()->json(['users' => User::all()]);
    }

    public function show($id)
    {
        return response()->json(['user' => User::findOrFail($id)]);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'تم حذف المستخدم']);
    }


    //==================================
    // إدارة العقارات
    //==================================

    public function allProperties()
    {
        return response()->json(['properties' => RealEstate::latest()->get()]);
    }


    public function pendingProperties()
    {
        return response()->json([
            'properties' => RealEstate::where('order_status', 'pending')->with('user')->latest()->get()
        ]);
    }


    public function approveProperty($id)
    {
        try {

            $property = RealEstate::findOrFail($id);
            $property->update(['order_status' => 'approved']);

            Mail::to($property->user->email)->send(new PropertyApprovedMail($property));
           return response()->json(['message' => 'تم قبول العقار']);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {

            return response()->json(['message' => 'العقار غير موجود'],404);

        } catch (\Exception $e){

            Log::error($e->getMessage());
            return response()->json(['message'=>'حدث خطأ أثناء قبول العقار'],500);
        }
    }


    public function rejectProperty($id)
    {
        try{

            $property = RealEstate::findOrFail($id);
            $property->update(['order_status'=>'rejected']);

            Mail::to($property->user->email)->send(new PropertyRejectedMail($property));
            return response()->json(['message'=>'تم رفض العقار']);

        }catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){

            return response()->json(['message'=>'العقار غير موجود'],404);

        }catch(\Exception $e){

            Log::error($e->getMessage());
            return response()->json(['message'=>'حدث خطأ أثناء رفض العقار'],500);
        }
    }


    public function deleteProperty($id)
    {
        try{

            $property = RealEstate::findOrFail($id);
            $property->delete();
            return response()->json(['message'=>'تم حذف العقار']);

        }catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){

            return response()->json(['message'=>'العقار غير موجود'],404);

        }catch(\Exception $e){

            Log::error($e->getMessage());
            return response()->json(['message'=>'حدث خطأ أثناء حذف العقار'],500);
        }
    }


    //==================================
    // إدارة الحجوزات
    //==================================

    public function pendingBookings()
    {
        return response()->json([
            'bookings'=>RentalBooking::where('status','pending')->with(['user'])->latest()->get()
        ]);
    }


    public function approveBooking($id)
    {
        try{
            $booking = RentalBooking::findOrFail($id);
            $booking->update(['status'=>'confirmed']);

            Mail::to($booking->user->email)->send(new BookingApprovedMail($booking));
            return response()->json(['message'=>'تم قبول الحجز']);

        }catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){

            return response()->json(['message'=>'الحجز غير موجود'],404);

        }catch(\Exception $e){

            Log::error($e->getMessage());
            return response()->json(['message'=>'حدث خطأ أثناء قبول الحجز'],500);
        }
    }


    public function rejectBooking($id)
    {
        try{

            $booking = RentalBooking::findOrFail($id);
            $booking->update(['status'=>'cancelled']);

            Mail::to($booking->user->email)->send(new BookingRejectedMail($booking));
            return response()->json(['message'=>'تم رفض الحجز']);

        }catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){

            return response()->json(['message'=>'الحجز غير موجود'],404);

        }catch(\Exception $e){

            Log::error($e->getMessage());
            return response()->json(['message'=>'حدث خطأ أثناء رفض الحجز'],500);
        }
    }


    //==================================
    // Dashboard
    //==================================

    public function dashboard()
    {
        return response()->json([
            'users' => User::count(),
            'properties' => RealEstate::count(),
            'pending_properties' => RealEstate::where('order_status','pending')->count(),
            'bookings' => RentalBooking::count(),
            'pending_bookings' => RentalBooking::where('status','pending')->count(),
            'latest_properties' => RealEstate::latest()->take(5)->get(),
            'latest_users' => User::latest()->take(5)->get(),
            'latest_bookings' => RentalBooking::latest()->take(5)->get(),

        ]);
    }

}