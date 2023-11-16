<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Interaction\ChatController;
use App\Http\Controllers\Setting\DeleteAccountController;
use App\Http\Controllers\Setting\SecutiryController;
use App\Http\Controllers\Setting\UpdateAccountController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('settings/account', [UpdateAccountController::class, 'index'])->name('settings.account');
    Route::put('settings/account', [UpdateAccountController::class, 'update']);

    Route::get('settings/security', [SecutiryController::class, 'index'])->name('settings.security');
    Route::put('settings/security', [SecutiryController::class, 'update']);

    Route::get('settings/dangerous-area', [DeleteAccountController::class, 'index'])->name('settings.danger');
    Route::delete('settings/dangerous-area', [DeleteAccountController::class, 'delete']);

    Route::controller(ChatController::class)->group(function () {
        Route::get('chats', 'index')->name('chats.index');
        Route::get('chats/{user}', 'show')->name('chats.show');
        Route::post('chats/{user}', 'store')->name('chats.store');
    });
});

require __DIR__ . '/auth.php';
