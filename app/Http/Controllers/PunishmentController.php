<?php

namespace App\Http\Controllers;

use App\Models\Punishment;
use App\Models\User;
use Illuminate\Http\Request;

class PunishmentController extends Controller
{
  
public function banUser(Request $request,$id)
{
    $user = User::findOrFail($id);

    $user->update([
        'banned' => true
    ]);

    Punishment::create([
        'user_id' => $user->id,
        'reason' => $request->reason,
        'length_of_punishment' => $request->length_of_punishment,
        'number_of_times' => 1,
        'start_date' => now(),
        'end_date' => now()->addDays($request->length_of_punishment)
    ]);

    return response()->json(['message' => 'تم الحظر']);
}
    public function  unbanUser($id)
    {

    $user = User::findOrFail($id);

    $user->update([
        'banned' => false
    ]);

    return response()->json([
        'message' => 'تم فك الحظر'
    ]);
}
    

    
        public function userPunishments($id)
{
    $user = User::with('punishments')->findOrFail($id);

    return response()->json($user);
}
}
