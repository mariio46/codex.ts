<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chats.{uuid}', function ($user, $uuid) {
    // return (int) $user->id === (int) $id;
    return auth()->check();
});
