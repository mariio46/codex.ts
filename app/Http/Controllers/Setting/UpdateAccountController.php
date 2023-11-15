<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpdateAccountRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class UpdateAccountController extends Controller
{
    public function index(Request $request): Response
    {
        return inertia('settings/account/index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        ]);
    }

    public function update(UpdateAccountRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        sessionFlash('Success', 'Your profile has been updated successfully.', 'success');

        return back();
    }
}
