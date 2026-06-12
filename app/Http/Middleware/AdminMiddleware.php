<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'يجب تسجيل الدخول أولاً',], 401);
        }

        if (Auth::user()->userType !== 'admin') {
            return response()->json(['message' => 'غير مصرح لك',], 403);
        }

        return $next($request);
    }
}