<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\FormsController;
use App\Http\Controllers\Admin\QuestionsController;
use App\Http\Controllers\Admin\OptionsController;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Cookie;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Rutas de prueba / diagnóstico
Route::get('ping', function () {
    return response('pong', 200);
});

Route::get('test', function () {
    return response()->json(['status' => 'ok']);
});

// ------ >> ------ Admin CRUD's ------ << ------ //
// Ej: /admin
Route::prefix('admin')->name('admin.')->middleware(['auth', 'can:admin-action'])->group(function () {
    // Admin rutas
    // Ej: /admin/users
    Route::resource('users', UsersController::class);
    Route::resource('forms', FormsController::class);
    Route::resource('questions', QuestionsController::class);
    Route::resource('options', OptionsController::class);

});

require __DIR__.'/settings.php';

