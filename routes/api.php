<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\PunishmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PictureController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'check.banned'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/currentuser', [AuthController::class, 'currentUser']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile/update', [ProfileController::class, 'update']);
   // Route::post('/real-estate', [RealEstateController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {

    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::get('/admin/users/{id}', [AdminController::class, 'show']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);

    Route::post('/ban-user/{id}', [PunishmentController::class, 'banUser']);
    Route::post('/unban-user/{id}', [PunishmentController::class, 'unbanUser']);
    Route::get('/user-punishments/{id}', [PunishmentController::class, 'userPunishments']);

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/properties', [AdminController::class, 'allProperties']);
    Route::get('/admin/properties/pending', [AdminController::class, 'pendingProperties']);
    Route::post('/admin/properties/{id}/approve', [AdminController::class, 'approveProperty']);
    Route::post('/admin/properties/{id}/reject', [AdminController::class, 'rejectProperty']);
    Route::delete('/admin/properties/{id}', [AdminController::class, 'deleteProperty']);
});

/*
|--------------------------------------------------------------------------
| Resources
|--------------------------------------------------------------------------
*/

Route::apiResource('areas', AreaController::class);



Route::middleware('auth:sanctum')->group(function () {

Route::apiResource('real-estate', RealEstateController::class);


    Route::post('/real-estates/{id}/pictures',[PictureController::class, 'store']);

    Route::get('/real-estates/{id}/pictures', [PictureController::class, 'index']);
    
    // حذف صورة
    Route::delete('/pictures/{id}', [PictureController::class, 'destroy']);


});