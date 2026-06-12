<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckBanMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // إذا المستخدم محظور
        if ($user && $user->banned) {
            return response()->json([
                'message' => 'تم حظر حسابك ولا يمكنك الوصول إلى هذه الصفحة'
            ], 403);
        }

        return $next($request);
    }
}