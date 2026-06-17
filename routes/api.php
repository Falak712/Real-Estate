<?php

use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PunishmentController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\RentalBookingController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\NoticeController;

// Routes عامة
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes محمية
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/currentuser', [AuthController::class, 'currentUser']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile/update', [ProfileController::class, 'update']);
    Route::post('/ban-user/{id}', [PunishmentController::class, 'banUser']);
    Route::post('/unban-user/{id}', [PunishmentController::class, 'unbanUser']);
    Route::get('/user-punishments/{id}', [PunishmentController::class, 'userPunishments']);
});

// Admin Routes
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index']);
    Route::get('/admin/users/{id}', [AdminUserController::class, 'show']);
    Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy']);
    Route::post('/admin/bookings/{id}/approve',[AdminUserController::class, 'approve']);
    Route::post('/admin/bookings/{id}/reject',[AdminUserController::class, 'reject']);
});

// كل العمليات ب Route واحد
Route::post('rental_bookings', [RentalBookingController::class, 'store']);
Route::get('rental_bookings', [RentalBookingController::class, 'index']);
Route::get('rental_bookings/{id}', [RentalBookingController::class, 'show']);
Route::put('rental_bookings/{id}', [RentalBookingController::class, 'update']);
Route::delete('rental_bookings/{id}', [RentalBookingController::class, 'destroy']);
Route::post('rental_bookings/{id}', [RentalBookingController::class, 'bookedDates']);
//Route::apiResource('rental_bookings', RentalBookingController::class);

Route::apiResource('favorites', FavoriteController::class);

Route::get('/notices', [NoticeController::class, 'index']);
Route::post('/notices', [NoticeController::class, 'store']);
Route::get('/notices/{id}', [NoticeController::class, 'show']);
Route::delete('/notices/{id}', [NoticeController::class, 'destroy']);
Route::post('/notices/{id}', [NoticeController::class, 'ConfirmNotice']);
