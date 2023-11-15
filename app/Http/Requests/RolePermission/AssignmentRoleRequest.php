<?php

namespace App\Http\Requests\RolePermission;

use Illuminate\Foundation\Http\FormRequest;

class AssignmentRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('super admin') ? true : false;
    }

    public function rules(): array
    {
        return [
            'user' => ['required', 'string', 'exists:users,username'],
            'roles' => ['required', 'array'],
        ];
    }
}
