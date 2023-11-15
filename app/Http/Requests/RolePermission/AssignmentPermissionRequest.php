<?php

namespace App\Http\Requests\RolePermission;

use Illuminate\Foundation\Http\FormRequest;

class AssignmentPermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('super admin') ? true : false;
    }

    public function rules(): array
    {
        return [
            'role' => ['required', 'numeric', 'exists:roles,id'],
            'permissions' => ['required', 'array'],
        ];
    }
}
