<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chats.{id}', function ($user, $id) {
    // return (int) $user->id === (int) $id;
    return auth()->check();
});
