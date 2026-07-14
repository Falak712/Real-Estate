<?php
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\PunishmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PictureController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\RentalBookingController;
use App\Http\Controllers\FavoriteController;

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
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
//ادارة المستخدمين
    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::get('/admin/users/{id}', [AdminController::class, 'show']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);
//ادارة العقوبات
    Route::post('/ban-user/{id}', [PunishmentController::class, 'banUser']);
    Route::post('/unban-user/{id}', [PunishmentController::class, 'unbanUser']);
    Route::get('/user-punishments/{id}', [PunishmentController::class, 'userPunishments']);
//ادارة العقارات من قبل الادمن
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/properties', [AdminController::class, 'allProperties']);
    Route::get('/admin/properties/pending', [AdminController::class, 'pendingProperties']);
    Route::get('/admin/bookings/pending', [AdminController::class, 'pendingBookings']);
    Route::post('/admin/properties/{id}/approve', [AdminController::class, 'approveProperty']);
    Route::post('/admin/properties/{id}/reject', [AdminController::class, 'rejectProperty']);
    Route::delete('/admin/properties/{id}', [AdminController::class, 'deleteProperty']);
    Route::post('/admin/bookings/{id}/approve',[AdminController::class,'approveBooking']);
    Route::post('/admin/bookings/{id}/reject',[AdminController::class, 'rejectBooking']);
//

});

/*
|--------------------------------------------------------------------------
| Resources
|--------------------------------------------------------------------------
*/

Route::apiResource('areas', AreaController::class);



Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('favorites', FavoriteController::class);
//ادارة العقارات من قبل المستخدم الذي ضافها
Route::apiResource('real-estate', RealEstateController::class);
Route::get('/real-estates', [RealEstateController::class, 'myrealestate']);


    Route::post('/real-estates/{id}/pictures',[PictureController::class, 'store']);
    Route::get('/real-estates/{id}/pictures', [PictureController::class, 'index']);
    Route::get('real-estates', [RealEstateController::class, 'myrealestate']);
    
    // حذف صورة
    Route::delete('/pictures/{id}', [PictureController::class, 'destroy']);


    Route::post('rental_bookings', [RentalBookingController::class, 'store']);
    Route::get('rental_bookings', [RentalBookingController::class, 'index']);
    Route::get('rental_bookings/{id}', [RentalBookingController::class, 'show']);
    Route::put('rental_bookings/{id}', [RentalBookingController::class, 'update']);
    Route::delete('rental_bookings/{id}', [RentalBookingController::class, 'destroy']);
    Route::post('rental_bookings/{id}', [RentalBookingController::class, 'bookedDates']);
    Route::put('profile/update', [ProfileController::class, 'update']);






});





