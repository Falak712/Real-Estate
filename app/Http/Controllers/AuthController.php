<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'fullname' => $validated['fullname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'],
            'userType' => 'user',
            'banned' => false,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'تم التسجيل بنجاح',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'البيانات غير صحيحة',
            ], 401);
        }

        if ($user->banned) {
            return response()->json([
                'message' => 'حسابك محظور، تواصل مع الإدارة',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        Mail::raw(
            "مرحباً {$user->fullname},
            تم تسجيل الدخول إلى حسابك بنجاح.
            التاريخ: " . now() . "
            إذا لم تكن أنت من قام بتسجيل الدخول يرجى التواصل مع الإدارة فوراً.",
                function ($message) use ($user) {
                    $message->to($user->email)
                    ->subject('إشعار تسجيل دخول');
            }
        );
        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'تم تسجيل الخروج بنجاح',
        ], 200);
    }

    public function currentUser(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ], 200);
    }
}
