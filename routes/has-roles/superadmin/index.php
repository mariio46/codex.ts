<?php

use App\Http\Controllers\SuperAdmin\RolePermission\AssignmentController;
use App\Http\Controllers\SuperAdmin\RolePermission\AssignmentPermissionController;
use App\Http\Controllers\SuperAdmin\RolePermission\AssignmentRoleController;
use App\Http\Controllers\SuperAdmin\RolePermission\PermissionController;
use App\Http\Controllers\SuperAdmin\RolePermission\RoleController;
use Illuminate\Support\Facades\Route;

// auth()->loginUsingId(33);
Route::controller(RoleController::class)->group(function () {
    Route::get('roles', 'table')->name('roles.table');
    Route::get('roles/create', 'create')->name('roles.create');
    Route::post('roles', 'store')->name('roles.store');
    Route::get('roles/{role}/edit', 'edit')->name('roles.edit');
    Route::put('roles/{role}/update', 'update')->name('roles.update');
    Route::delete('roles/{role}/delete', 'delete')->name('roles.delete');
});

Route::controller(PermissionController::class)->group(function () {
    Route::get('permissions', 'table')->name('permissions.table');
    Route::get('permissions/create', 'create')->name('permissions.create');
    Route::post('permissions/store', 'store')->name('permissions.store');
    Route::get('permissions/{permission}/edit', 'edit')->name('permissions.edit');
    Route::put('permissions/{permission}/update', 'update')->name('permissions.update');
    Route::delete('permissions/{permission}/delete', 'delete')->name('permissions.delete');
});

Route::get('assignments/roles', [AssignmentController::class, 'roles'])->name('assignments.roles.table');
Route::controller(AssignmentRoleController::class)->group(function () {
    Route::get('assignments/roles/create', 'create')->name('assignments.roles.create');
    Route::post('assignments/roles/store', 'store')->name('assignments.roles.store');
    Route::get('assignments/roles/{user}/edit', 'edit')->name('assignments.roles.edit');
    Route::put('assignments/roles/{user}/update', 'update')->name('assignments.roles.update');
    Route::delete('assignments/roles/{user}/delete', 'delete')->name('assignments.roles.delete');
});

Route::get('assignments/permissions', [AssignmentController::class, 'permissions'])->name('assignments.permissions.table');
Route::controller(AssignmentPermissionController::class)->group(function () {
    Route::get('assignments/permissions/create', 'create')->name('assignments.permissions.create');
    Route::post('assignments/permissions/store', 'store')->name('assignments.permissions.store');
    Route::get('assignments/permissions/{role}/edit', 'edit')->name('assignments.permissions.edit');
    Route::put('assignments/permissions/{role}/update', 'update')->name('assignments.permissions.update');
    Route::delete('assignments/permissions/{role}/delete', 'delete')->name('assignments.permissions.delete');
});
