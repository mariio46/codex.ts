<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DeleteAccountController extends Controller
{
    public function index(Request $request): Response
    {
        return inertia('settings/danger/index', [
            'status' => session('status'),
        ]);
    }

    public function delete(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        auth()->logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        sessionFlash('Success', 'Your account has been deleted successfully, Bye.', 'success', 'IconMoodCry', 'text-yellow-600');

        return to_route('home');
    }
}
