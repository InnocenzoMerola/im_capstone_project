<?php

use App\Http\Controllers\Api\GuideController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.v1.')
    ->prefix('v1')
    ->group(function(){
        Route::get('/guides', [GuideController::class, 'index'])->name('guides.index');
    });