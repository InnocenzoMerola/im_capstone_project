<?php

use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\StopController;
use App\Http\Controllers\Api\ItinerariesController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ContactController;
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
    Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
    
    
    
    Route::middleware('auth:sanctum', 'verified')->group(function(){
        Route::get('/guides/{id}', [GuideController::class, 'show'])->name('guides.show');
        
        // Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
        
        Route::get('/stops/{id}', [StopController::class, 'show'])->name('stops.show');
        Route::post('/stops/{id}/assign-category', [StopController::class, 'assignCategory'])->name('stops.assignCategory'); 
        
        Route::get('/itineraries', [ItinerariesController::class, 'index'])->name('itineraries.index');
        Route::get('/itineraries/{id}', [ItinerariesController::class, 'show'])->name('itineraries.show');
    
        Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
        Route::post('/profile/update', [ProfileController::class, 'update'])->name('pofile.update');
        Route::post('/profile/update-password', [ProfileController::class, 'updatePassword'])->name('pofile.updatePassword');
        Route::post('/profile/upload-image', [ProfileController::class, 'uploadImage'])->name('pofile.uploadImage');
    

        Route::post('/contact', [ContactController::class, 'sendEmail'])->name('contact.sendEmail');
    
    });
    
    Route::middleware('auth:sanctum', 'verified', 'admin')->group(function(){
        Route::post('/stops', [StopController::class, 'store'])->name('stops.store');
        Route::get('/stops/{id}/edit', [StopController::class, 'edit'])->name('stops.edit');
        Route::put('/stops/{id}', [StopController::class, 'update'])->name('stops.update');
        Route::delete('/stops/{id}', [StopController::class, 'destroy'])->name('stops.destroy');
        
        Route::post('/guides', [GuideController::class, 'store'])->name('guides.store');
        
        Route::get('/itineraries/{id}/edit', [ItinerariesController::class, 'edit'])->name('itineraries.edit');
        Route::post('/itineraries', [ItinerariesController::class, 'store'])->name('itineraries.store');
        Route::put('/itineraries/{id}', [ItinerariesController::class, 'update'])->name('itineraries.update');
        Route::delete('/itineraries/{id}', [ItinerariesController::class, 'destroy'])->name('itineraries.destroy');
    });
});