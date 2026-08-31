<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\PartnershipController;
use App\Http\Controllers\Api\ReservationController;

// Public endpoints
Route::post('/login', [AuthController::class, 'login']);
Route::get('/content', [ContentController::class, 'index']);
Route::get('/gallery', [GalleryController::class, 'index']);

// Public form submissions (no auth required)
Route::post('/partnerships', [PartnershipController::class, 'store']);
Route::post('/reservations', [ReservationController::class, 'store']);

// Protected admin endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/content', [ContentController::class, 'update']);
    Route::post('/content/upload', [ContentController::class, 'uploadImage']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);

    // Admin: Partnerships management
    Route::get('/partnerships', [PartnershipController::class, 'index']);
    Route::patch('/partnerships/{id}', [PartnershipController::class, 'update']);
    Route::delete('/partnerships/{id}', [PartnershipController::class, 'destroy']);

    // Admin: Reservations management
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::patch('/reservations/{id}', [ReservationController::class, 'update']);
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
});
