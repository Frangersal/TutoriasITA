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

        // Definir explicitamente la ability (temporal)
        Gate::define('manage-users', function ($user = null) {
            Log::info('[DEBUG] Gate "manage-users" evaluada; user id: ' . ($user?->id ?? 'null'));
            return true;
        });
    }
}