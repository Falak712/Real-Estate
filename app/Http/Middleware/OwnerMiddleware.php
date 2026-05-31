<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OwnerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'يجب تسجيل الدخول أولاً',
            ], 401);
        }

        if (Auth::user()->userType !== 'owner') {
            return response()->json([
                'message' => 'غير مصرح لك، هذا القسم للملاك فقط',
            ], 403);
        }

        return $next($request);
    }
}