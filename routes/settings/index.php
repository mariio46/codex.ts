<?php

use App\Http\Controllers\Setting\DeleteAccountController;
use App\Http\Controllers\Setting\SecutiryController;
use App\Http\Controllers\Setting\UpdateAccountController;
use Illuminate\Support\Facades\Route;

Route::get('settings/account', [UpdateAccountController::class, 'index'])->name('settings.account');
Route::put('settings/account', [UpdateAccountController::class, 'update']);

Route::get('settings/security', [SecutiryController::class, 'index'])->name('settings.security');
Route::put('settings/security', [SecutiryController::class, 'update']);

Route::get('settings/dangerous-area', [DeleteAccountController::class, 'index'])->name('settings.danger');
Route::delete('settings/dangerous-area', [DeleteAccountController::class, 'delete']);
