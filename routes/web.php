<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
    Route::middleware(['auth','admin'])->group(function(){
        Route::post('/admin/create-user',[AuthController::class,'register']);
    });

