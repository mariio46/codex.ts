<?php

namespace App\Http\Controllers\SuperAdmin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\RolePermission\RoleRequest;
use App\Http\Resources\RolePermission\TableRoleResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function table(): Response
    {
        $roles = Role::query()->oldest()->fastPaginate(10);

        return inertia('superadmin/role-permission/roles/table', [
            'roles' => TableRoleResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ],
            ]),
        ]);
    }

    public function create(): Response
    {
        return inertia('superadmin/role-permission/roles/form', [
            'role' => new Role,
            'page_settings' => [
                'method' => 'post',
                'url' => route('roles.store'),
                'title' => 'Create Role Form',
                'description' => 'Fill all field to add the role.',
            ],
        ]);
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        $role = Role::create([
            'name' => strtolower($request->name),
            'guard_name' => $request->guard_name ? strtolower($request->guard_name) : 'web',
        ]);

        sessionFlash('Success', "The role {$role->name} has been stored.", 'success');

        return to_route('roles.table');
    }

    public function edit(Role $role): Response
    {
        return inertia('superadmin/role-permission/roles/form', [
            'role' => $role,
            'page_settings' => [
                'method' => 'put',
                'url' => route('roles.update', $role->id),
                'title' => 'Edit Role Form',
                'description' => 'Edit all field to update the role.',
            ],
        ]);
    }

    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        $role->update([
            'name' => strtolower($request->name),
            'guard_name' => $request->guard_name ? strtolower($request->guard_name) : 'web',
        ]);

        sessionFlash('Success', "The role {$role->name} has been updated.", 'success');

        return to_route('roles.table');
    }

    public function delete(Role $role): RedirectResponse
    {
        $role->users()->detach();

        $role->delete();

        sessionFlash('Success', "The role {$role->name} has been deleted.", 'success');

        return back();
    }
}
