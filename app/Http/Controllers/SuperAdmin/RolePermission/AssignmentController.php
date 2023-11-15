<?php

namespace App\Http\Controllers\SuperAdmin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Resources\RolePermission\RolePermissionResource;
use App\Http\Resources\RolePermission\UserRoleResource;
use App\Models\User;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AssignmentController extends Controller
{
    public function roles(): Response
    {
        $users = User::query()->select('id', 'name', 'username')->has('roles')->with(['roles' => fn ($role) => $role->select('name')])->orderBy('id')->fastPaginate(10);

        return inertia('superadmin/role-permission/assignments/roles', [
            'users' => UserRoleResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ]),
        ]);
    }

    public function permissions(): Response
    {
        $roles = Role::query()->select('id', 'name')->with(['permissions' => fn ($permission) => $permission->select('id', 'name')])->oldest()->fastPaginate(10);

        return inertia('superadmin/role-permission/assignments/permissions', [
            'roles' => RolePermissionResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ],
            ]),
        ]);
    }
}
