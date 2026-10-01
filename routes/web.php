<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

// Fallback untuk melayani file upload dari storage jika symlink belum aktif di hosting
Route::get('/storage/{path}', function ($path) {
    if (Storage::disk('public')->exists($path)) {
        return Storage::disk('public')->response($path);
    }
    abort(404);
})->where('path', '.*');

// Helper route untuk membuat symlink storage via browser di hosting (Hostinger/cPanel tanpa SSH)
Route::get('/run-storage-link', function () {
    try {
        Artisan::call('storage:link');
        return response()->json([
            'status' => 'success',
            'message' => 'Symlink storage berhasil dibuat!',
            'output' => Artisan::output(),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
