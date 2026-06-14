<?php
<<<<<<< HEAD

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PunishmentController;

use App\Http\Middleware\AdminMiddleware;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// User Routes
Route::middleware(['auth:sanctum', 'check.banned'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/currentuser', [AuthController::class, 'currentUser']);

    Route::get('/profile', [ProfileController::class, 'show']);

    Route::put('/profile/update', [ProfileController::class, 'update']);

    Route::post('/real-estate', [RealEstateController::class, 'store']);
});


// Admin Routes
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {

    // Users
    Route::get('/admin/users', [AdminController::class, 'index']);

    Route::get('/admin/users/{id}', [AdminController::class, 'show']);

    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);

    // Punishments
    Route::post('/ban-user/{id}', [PunishmentController::class, 'banUser']);

    Route::post('/unban-user/{id}', [PunishmentController::class, 'unbanUser']);

    Route::get('/user-punishments/{id}', [PunishmentController::class, 'userPunishments']);

    // Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

    // Properties
    Route::get('/admin/properties', [AdminController::class, 'allProperties']);

    Route::get('/admin/properties/pending', [AdminController::class, 'pendingProperties']);

    Route::post('/admin/properties/{id}/approve', [AdminController::class, 'approveProperty']);

    Route::post('/admin/properties/{id}/reject', [AdminController::class, 'rejectProperty']);

    Route::delete('/admin/properties/{id}', [AdminController::class, 'deleteProperty']);
});


// Resources
Route::apiResource('areas', AreaController::class);

Route::apiResource('real-estates', RealEstateController::class);
=======
use App\Http\Controllers\AreaController;
use App\Http\Controllers\RealEstateController;
use App\Models\RealEstate;
use App\Http\Controllers\PictureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('areas',AreaController::class);
Route::apiResource('real_estate',RealEstateController::class);
Route::post( '/real-estates/{realEstateId}/pictures',  [PictureController::class, 'store']);
>>>>>>> origin/database-update
