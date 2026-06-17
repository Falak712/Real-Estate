<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RentalBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

  public function approve($id)
  {
    $booking = RentalBooking::findOrFail($id);

    $booking->update([
      'status' => 'confirmed'
    ]);

    $user = $booking->user;

    Mail::raw(
      "مرحباً {$user->fullname}
          تمت الموافقة على طلب الاستئجار الخاص بك.
          سيتم التواصل معك قريباً لإكمال الإجراءات.",
      function ($message) use ($user) {
        $message->to($user->email)
          ->subject('تمت الموافقة على طلبك');
      }
    );
    return response()->json('تمت الموافقة على الحجز', 200);
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
