<?php

use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\StopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.v1.')
->prefix('v1')
->group(function(){
    
    Route::get('/guides', [GuideController::class, 'index'])->name('guides.index');
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/stops', [StopController::class, 'index'])->name('stops.index');
    
    
    
    Route::middleware('auth:sanctum', 'verified')->group(function(){
        Route::get('/guides/{id}', [GuideController::class, 'show'])->name('guides.show');
        Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
        Route::get('/stops/{id}', [StopController::class, 'show'])->name('stops.show');
        Route::post('/stops/{id}/assign-category', [StopController::class, 'assignCategory'])->name('stops.assignCategory'); 
    });
        
    Route::middleware('auth:sanctum', 'verified', 'admin')->group(function(){
        Route::post('/stops', [StopController::class, 'store'])->name('stops.store');
        Route::get('/stops/{id}/edit', [StopController::class, 'edit'])->name('stops.edit');
        Route::put('/stops/{id}', [StopController::class, 'update'])->name('stops.update');
        Route::delete('/stops/{id}', [StopController::class, 'destroy'])->name('stops.destroy');
    });
});