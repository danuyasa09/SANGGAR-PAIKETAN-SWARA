<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\GalleryController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/content', [ContentController::class, 'index']);
Route::get('/gallery', [GalleryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/content', [ContentController::class, 'update']);
    Route::post('/content/upload', [ContentController::class, 'uploadImage']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
});
