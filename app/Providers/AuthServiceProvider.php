<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // \App\Models\User::class => \App\Policies\UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Log para verificar que boot() se ejecutó
        Log::info('[DEBUG] AuthServiceProvider::boot() ejecutado');

        // Definir la ability para gestionar usuarios (solo Admin)
        Gate::define('manage-users', function ($user) {
            return $user->hasRole('admin');
        });

        //------------------ Acciones Por Rol ------------------//
        //Acciones exclusivas de Administrador
        Gate::define('admin-action', function ($user) {
            return $user->hasRole('admin');
        });
        //Acciones exclusivas de Tutor
        Gate::define('tutor-action', function ($user) {
            return $user->hasRole('tutor');
        });
        //Acciones exclusivas de Estudiante
        Gate::define('student-action', function ($user) {
            return $user->hasRole('student');
        });
        
        //------------------ Acciones Compartidas ------------------//
        //Acciones exclusivas de Administrador-Tutor
        Gate::define('admin-tutor-action', function ($user) {
            return $user->hasAnyRoles(['admin', 'tutor']);
        });
        //Acciones exclusivas de Tutor-Estudiante
        Gate::define('tutor-student-action', function ($user) {
            return $user->hasAnyRoles(['tutor', 'student']);
        });
        //Acciones exclusivas de Admin-Estudiante
        Gate::define('admin-student-action', function ($user) {
            return $user->hasAnyRoles(['admin', 'student']);
        });
    }
}