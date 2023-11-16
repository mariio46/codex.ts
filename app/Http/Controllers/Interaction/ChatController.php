<?php

namespace App\Http\Controllers\Interaction;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Interaction\Chat;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(): Response
    {
        return inertia('chats/index');
    }

    public function show(User $user): Response
    {
        $chats = Chat::query()->where(
            fn ($q) => $q->where('sender_id', auth()->user()->id)->where('receiver_id', $user->id)
        )->orWhere(
            fn ($q) => $q->where('sender_id', $user->id)->where('receiver_id', auth()->user()->id)
        )->oldest()->get();

        return inertia('chats/show', [
            'user' => $user,
            'chats' => $chats,
        ]);
    }

    public function store(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'message' => ['required', 'string', 'min:3'],
        ]);

        $chat = $request->user()->chats()->create([
            'receiver_id' => $user->id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($chat))->toOthers();

        return back();
    }
}
