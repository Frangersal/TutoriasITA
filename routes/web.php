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

Route::resource('admin/users', UsersController::class);


// Route::middleware('auth')->group(function () {
//     Route::resource('users', UsersController::class);
// });

require __DIR__.'/settings.php';


// ------ >> ------ Admin cruds ------ << ------ //
// Route::prefix('admin')->name('admin.')->middleware(['auth','can:manage-users'])->group(function () {
    // Admin crud Usuarios
    // Route::resource('users', UsersController::class)->except(['show', 'create', 'store']);

    // Admin crud Forms
    // Route::resource('forms', FormsController::class)->except(['show']);

    // Admin crud Questions
    // Route::resource('questions', QuestionsController::class);

    // Admin crud AnswerOption (Options)
    // Route::resource('options', OptionsController::class);
// });
