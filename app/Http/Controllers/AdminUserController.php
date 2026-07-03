<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RentalBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\BookingApprovedMail;
use App\Mail\BookingRejectedMail;
use App\Mail\PropertyApprovedMail;
use App\Mail\PropertyRejectedMail;
use App\Models\RealEstate;

class AdminUserController extends Controller
{
  public function index()
  {
    $users = User::all();

    return response()->json(['users' => $users]);
  }

  public function show($id)
  {
    $user = User::findOrFail($id);
    return response()->json(['user' => $user]);
  }

  public function destroy($id)
  {
    $user = User::findOrFail($id);
    $user->delete();
    return response()->json(['message' => 'تم حذف المستخدم']);
  }

  public function approvebooking($id)
  {
    $booking = RentalBooking::findOrFail($id);

    $booking->update([
      'status' => 'confirmed'
    ]);

   // $user = $booking->user;

    Mail::to($booking->user->email)
    ->send(new BookingApprovedMail($booking));
  }
  public function rejectbooking($id)
  {
    $booking = RentalBooking::findOrFail($id);

    $booking->update([
      'status' => 'rejected'
    ]);

    $user = $booking->user;
    Mail::to($booking->user->email)
    ->send(new BookingRejectedMail($booking));
}
public function approveProperty($id)
{
    try {
        $property = RealEstate::findOrFail($id);
        $property->update(['order_status' => 'approved']);

        Mail::to($property->user->email)
          ->send(new PropertyApprovedMail($property));
        return response()->json('تم قبول العقار بنجاح', 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'العقار غير موجود'
        ], 404);

    } catch (\Exception $e) {
        Log::error('Approve property error: ' . $e->getMessage());
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
        Mail::to($property->user->email)
    ->send(new PropertyRejectedMail($property));
        return response()->json( 'تم رفض العقار', 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'العقار غير موجود'
        ], 404);

    } catch (\Exception $e) {
        Log::error('Reject property error: ' . $e->getMessage());
        return response()->json([
            'message' => 'حدث خطأ أثناء رفض العقار'
        ], 500);
    }
}
}