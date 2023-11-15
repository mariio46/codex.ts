<?php

namespace App\Http\Requests\RolePermission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class PermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('super admin') ? true : false;
    }

    public function rules(): array
    {
        $unique = Rule::unique(Permission::class);

        return [
            'name' => $this->routeIs('permissions.update')
                ? ['required', 'string', 'min:3', $unique->ignore($this->role->id)]
                : ['required', 'string', 'min:3', $unique],
            'guard_name' => $this->guard_name ? ['string'] : [],
        ];
    }
}
