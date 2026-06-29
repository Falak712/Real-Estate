<?php

namespace App\Http\Controllers;

use App\Models\RealEstate;
use App\Models\RentalBooking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    public function index()
    {
        $users=User::all();

        return response()->json(['users'=>$users]);
    }

     public function show($id)
     {
        $user=User::findOrFail($id);
        return response()->json(['user'=>$user]);
     }

     public function destroy($id)
     {
       $user=User::findOrFail($id);
       $user->delete();
       return response()->json(['message'=>'تم حذف المستخدم']);
   }
   
   public function pendingProperties()
{
    $properties = RealEstate::where('order_status','pending')->get();

    return response()->json($properties);
}

public function allProperties()
{
    return response()->json(RealEstate::all());
}
public function approveProperty($id)
{
    try {
        $property = RealEstate::findOrFail($id);
        $property->update(['order_status' => 'approved']);

        return response()->json([
            'message' => 'تم قبول العقار بنجاح'
        ], 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'العقار غير موجود'
        ], 404);

    } catch (\Exception $e) {
        \Log::error('Approve property error: ' . $e->getMessage());
        return response()->json([
            'message' => 'حدث خطأ أثناء قبول العقار'
        ], 500);
    }
}

public function rejectProperty($id)
{
    try {
        $property = RealEstate::findOrFail($id);
        $property->update(['order_status' => 'rejected']);

        return response()->json([
            'message' => 'تم رفض العقار'
        ], 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'العقار غير موجود'
        ], 404);

    } catch (\Exception $e) {
        \Log::error('Reject property error: ' . $e->getMessage());
        return response()->json([
            'message' => 'حدث خطأ أثناء رفض العقار'
        ], 500);
    }
}

public function deleteProperty($id)
{
    try {
        $property = RealEstate::findOrFail($id);
        $property->delete();

        return response()->json([
            'message' => 'تم حذف العقار بنجاح'
        ], 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'العقار غير موجود'
        ], 404);

    } catch (\Exception $e) {
        \Log::error('Delete property error: ' . $e->getMessage());
        return response()->json([
            'message' => 'حدث خطأ أثناء حذف العقار'
        ], 500);
    }
}
 public function reject($id)
  {
    $booking = RentalBooking::findOrFail($id);

    $booking->update([
      'status' => 'rejected'
    ]);

    $user = $booking->user;

    Mail::raw(
      "مرحباً {$user->fullname}
        نعتذر، تم رفض طلب الاستئجار الخاص بك.
        للاستفسار يرجى التواصل مع الإدارة.",
      function ($message) use ($user) {
        $message->to($user->email)
          ->subject('تم رفض طلبك');
      }
    );
    return response()->json('تم رفض الحجز', 200);
  }
}