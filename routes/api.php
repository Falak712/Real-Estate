<?php
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