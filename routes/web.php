<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\FormsController;
use App\Http\Controllers\Admin\QuestionsController;
use App\Http\Controllers\Admin\OptionsController;
use App\Http\Controllers\Tutor\ReunionsController;
use App\Http\Controllers\Supervisor\PupilsController;
use App\Http\Controllers\Supervisor\PupilsGraphsController;
use App\Http\Controllers\Supervisor\PupilsGraphsYearsController;
use App\Http\Controllers\Supervisor\PupilController;
use App\Http\Controllers\Supervisor\PupilFormsController;
use App\Http\Controllers\Supervisor\PupilFormsPDFController;
use App\Http\Controllers\Supervisor\TutorsController;
use App\Http\Controllers\Student\StudentFormsController;
use App\Http\Controllers\Student\StudentAnswersController;
use App\Http\Controllers\Student\StudentReunionsController;

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

Route::get('majors', function () {
    return response()->json(\App\Models\Major::all());
});

// ------ >> ------ Admin CRUD's ------ << ------ //
// Ej: /admin
Route::prefix('admin')->name('admin.')->middleware(['auth', 'can:admin-action'])->group(function () {
    // /admin/users
    // /admin/forms
    // /admin/questions
    // /admin/options
    Route::resource('users', UsersController::class)->except(['create', 'edit']);
    Route::resource('forms', FormsController::class)->except(['create', 'edit']);
    Route::resource('questions', QuestionsController::class)->except(['create', 'edit']);
    Route::resource('options', OptionsController::class)->except(['create', 'edit']);
});

// ------ >> ------ Tutor CRUD's ------ << ------ //
// Ej: /tutor
Route::prefix('tutor')->name('tutor.')->middleware(['auth', 'can:tutor-action'])->group(function () {
    // /tutor/reunion
    Route::resource('reunion', ReunionsController::class)->except(['create', 'edit']);
});

// ------ >> ------ Supervisor CRUD's ------ << ------ //
// En las rutas Supervisor sera la palabra que usaremos para denominar las rutas
// a las que tiene acceso tanto en Admin y el Tutor.
// Ej: /supervisor
Route::prefix('supervisor')->name('supervisor.')->middleware(['auth', 'can:admin-tutor-action'])->group(function () {
    // /supervisor/pupils
    // /supervisor/pupils/graphs
    // /supervisor/pupils/graphs/years
    Route::resource('pupils', PupilsController::class)->except(['create', 'edit']);
    Route::resource('pupils/graphs', PupilsGraphsController::class)->except(['create', 'edit']);
    Route::resource('pupils/graphs/years', PupilsGraphsYearsController::class)->except(['create', 'edit']);
    
    // /supervisor/pupil
    // /supervisor/pupil/forms
    // /supervisor/pupil/forms/pdf
    Route::resource('pupil/forms/pdf', PupilFormsPDFController::class)->except(['create', 'edit']);
    Route::resource('pupil/forms', PupilFormsController::class)->except(['create', 'edit']);
    Route::resource('pupil', PupilController::class)->except(['create', 'edit']);

    // /supervisor/tutors
    Route::resource('tutors', TutorsController::class)->except(['create', 'edit']);
});

// ------ >> ------ Student CRUD's ------ << ------ //
// Ej: /student
Route::prefix('student')->name('student.')->middleware(['auth', 'can:student-action'])->group(function () {
    // /student/forms
    // /student/answers
    // /student/reunions
    Route::resource('forms', StudentFormsController::class)->except(['create','store','edit','update','destroy']);
    Route::resource('answers', StudentAnswersController::class)->except(['index','create','show','edit','destroy']);
    Route::resource('reunions', StudentReunionsController::class)->except(['create','edit','destroy']);
});

//->except(['index','create','store','show','edit','update','destroy']

require __DIR__.'/settings.php';

