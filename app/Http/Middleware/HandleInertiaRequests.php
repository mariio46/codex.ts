<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserResoure;
use App\Http\Resources\UsersGlobalResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $users = $request->user()
            ? User::query()->where('id', '!=', $request->user()->id)->select('id', 'uuid', 'name', 'username', 'email')->get()
            : null;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? AuthenticatedUserResoure::make($request->user()) : null,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'session_flash' => fn () => [
                'status' => $request->session()->get('status'),
                'title' => $request->session()->get('title'),
                'message' => $request->session()->get('message'),
                'icon' => $request->session()->get('icon'),
                'className' => $request->session()->get('className'),
            ],
            'users' => $request->user() ? fn () => UsersGlobalResource::collection($users) : null,
        ];
    }
}
