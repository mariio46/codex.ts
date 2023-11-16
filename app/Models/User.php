<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Interaction\Chat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'uuid',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function booted()
    {
        static::creating(fn (User $user) => $user->uuid = Str::uuid());
    }

    public function getRouteKeyName()
    {
        return 'username';
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class, 'sender_id');
    }

    public function avatar($size = 150): string
    {
        return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($this->email))) . '?s=' . $size . '&d=mp';
    }
}
