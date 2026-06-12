<?php

namespace App\Http\Controllers;

use App\Models\RealEstate;
use App\Models\User;
use Illuminate\Http\Request;

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
public function approveProperty($id)
{
    $property = RealEstate::findOrFail($id);

    $property->update([
        'order_status' => 'approved'
    ]);

    return response()->json(['message' => 'تم قبول العقار']);
}
public function rejectProperty($id)
{
    $property = RealEstate::findOrFail($id);

    $property->update([
        'order_status' => 'rejected'
    ]);

    return response()->json(['message' => 'تم رفض العقار']);
}
public function allProperties()
{
    return response()->json(RealEstate::all());
}
public function deleteProperty($id)
{
    $property = RealEstate::findOrFail($id);

    $property->delete();

    return response()->json(['message' => 'تم حذف العقار']);
}

}