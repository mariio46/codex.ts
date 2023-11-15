<?php

namespace App\Http\Requests\RolePermission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('super admin') ? true : false;
    }

    public function rules(): array
    {
        $unique = Rule::unique(Role::class);

        return [
            'name' => $this->routeIs('roles.update')
                ? ['required', 'string', 'min:3', $unique->ignore($this->role->id)]
                : ['required', 'string', 'min:3', $unique],
            'guard_name' => $this->guard_name ? ['string'] : [],
        ];
    }
}
