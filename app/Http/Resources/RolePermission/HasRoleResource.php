<?php

namespace App\Http\Resources\RolePermission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HasRoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'superadmin' => $this->when($this->hasRole('super admin'), true),
            'admin' => $this->when($this->hasRole('admin'), true),
            'operator' => $this->when($this->hasRole('operator'), true),
            'instructor' => $this->when($this->hasRole('instructor'), true),
            'crew' => $this->when($this->hasRole('crew'), true),
        ];
    }
}
