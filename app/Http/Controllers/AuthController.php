<?php


namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function showRegisterForm()
  {
    return view('auth.register');
  }    

  public function register(RegisterRequest $request)
{
     $validated=$request->validated();

     $user=User::create([
        'fullname' =>$validated['fullname'],
        'email' =>$validated['email'],
        'password' =>Hash::make($validated['password']),
        'phone_number' =>$validated['phone_number']??null,
        'userType'=> 'user',
     ]);

    // Auth::login($user);

    // return redirect()->route('home')->with('success','تم التسجيل بنجاح!');
    return response()->json(['message'=>'successfully','user'=>$user],201);
}

public function showLoginForm()
{
    return view('auth.login');
}

public function login(LoginRequest $request)
{
$credentials=$request->validated();
//$remember=$request->has('remember');

if(Auth::attempt($credentials))
  {
   // $request->session()->regenerate();
   $user=Auth::user();
   return response()->json(['message'=>'تم تسجيل الدخول بنجاح','user'=>$user],200);
  }
//return back()->withErrors([
  //'emai'=>'البيانات غير صحيحة',
//])->withInput($request->only('email'));
return response()->json(['message'=>'البيانات غير صحيحة'],401);

}

public function logout(Request $request)
{
    Auth::logout();
   // $request->session()->invalidate();
    //$request->session()->regenerateToken();

    //return redirect()->route('home')->with('success','تم تسجيل الخروج بنجاح');
    return response()->json(['message'=>'تم تسجيل الخروج']);
}
}
