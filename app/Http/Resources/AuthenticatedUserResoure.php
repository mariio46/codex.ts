<?php

namespace App\Http\Resources;

use App\Http\Resources\RolePermission\HasRoleResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResoure extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'name' => firstName($this->name),
            'username' => $this->username,
            'fallback' => acronym($this->name),
            'email' => $this->email,
            'avatar' => $this->avatar(),
            'has_roles' => new HasRoleResource($this),
        ];
    }
}
