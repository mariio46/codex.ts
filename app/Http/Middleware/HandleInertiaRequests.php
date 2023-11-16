<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserResoure;
use App\Http\Resources\UsersGlobalResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $users = User::query()->where('id', '!=', $request->user()?->id)->select('id', 'uuid', 'name', 'username', 'email')->get();

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
            // 'users' =>  Cache::remember('categories', 3600, fn () => \App\Models\User::query()->where('id', '!=', $request->user()->id)->get()),
        ];
    }
}
