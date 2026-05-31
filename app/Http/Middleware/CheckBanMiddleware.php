<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBanMiddleware
{
   public function handle(Request $request, Closure $next)
{
    if ($request->user()->banned) {

        return response()->json([
            'message' => 'الحساب محظور'
        ],403);
    }

    return $next($request);
}
}
