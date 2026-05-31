<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
      return response()->json(['user'=>$request->user]);
    }

    public function update(Request $request)
    {
        $user=$request->user();
        $validated=$request->validate([
    'fullname' => 'sometimes|string|max:255',
    'phone_number' => 'sometimes|string|max:10',
]);
        $user->update($validated);

        return response()->json(['message'=>'تم تحديث البيانات','user'=>$user]);

    }

}
