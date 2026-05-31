<?php

use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PunishmentController;
use App\Http\Middleware\AdminMiddleware;

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
});