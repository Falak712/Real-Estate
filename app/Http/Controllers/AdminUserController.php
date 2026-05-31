<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
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

}
