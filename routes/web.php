<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
});
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/roles', [RoleController::class, 'index'])->name('admin.roles.index');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');
});
Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
});
Route::middleware(['auth', 'can:view item'])->group(function () {
    Route::get('/items', [ProductController::class, 'index'])->name('items.index');
    Route::get('/items/create', [ProductController::class, 'create'])->name('items.create');
    Route::post('/items/create', [ProductController::class, 'store'])->name('items.store');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::post('/product-locations/adjust', [ProductController::class, 'adjustQuantity'])->name('items.adjust');
    Route::get('/search', [ProductController::class, 'search'])->name('search');
    Route::get('/logs', [ProductController::class, 'log'])->name('logs.index');

});

require __DIR__.'/auth.php';
