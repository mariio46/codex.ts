<?php

namespace App\Http\Resources\RolePermission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolePermissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => ucwords($this->name),
            'permissions' => ucwords(implode(', ', $this->getPermissionNames()->toArray())),
        ];
    }
}
