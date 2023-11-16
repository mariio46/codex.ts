<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Interaction\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::controller(ChatController::class)->group(function () {
        Route::get('chats', 'index')->name('chats.index');
        Route::get('chats/{user}', 'show')->name('chats.show');
        Route::post('chats/{user}', 'store')->name('chats.store');
    });
});

require __DIR__ . '/auth.php';
