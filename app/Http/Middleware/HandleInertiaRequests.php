<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Log;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

            // Construir el array que realmente se compartirá como 'auth.user'
            $sharedUser = ($user = $request->user())
                ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'control_number' => $user->control_number,
                    'picture' => $user->picture,
                    // obtener nombre del role si existe
                    'role' => $user->role?->name ?? null,
                ]
                : null;

            // Loguear el array exacto que se comparte con Inertia (debug temporal)
            Log::debug('HandleInertiaRequests::shared auth.user', ['auth_user' => $sharedUser]);

            return [
                ...parent::share($request),
                'name' => config('app.name'),
                'quote' => ['message' => trim($message), 'author' => trim($author)],
                'auth' => [
                    'user' => $sharedUser,
                ],
                'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            ];
    }
}
