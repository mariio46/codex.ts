<?php

namespace App\Http\Controllers\SuperAdmin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\RolePermission\AssignmentPermissionRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssignmentPermissionController extends Controller
{
    public function create(): Response
    {
        return inertia('superadmin/role-permission/assignments/permissions-form', [
            'role' => new Role,
            'permission' => new Permission,
            'roles' => collect(Role::query()->select('id', 'name')->doesntHave('permissions')->oldest()->get())->map(fn ($role) => [
                'id' => $role->id,
                'value' => $role->name,
                'label' => ucwords($role->name),
            ]),
            'permissions' => collect(Permission::query()->select('name')->oldest()->get())->map(fn ($permission) => [
                'value' => $permission->name,
                'label' => ucwords($permission->name),
            ]),
            'page_settings' => [
                'method' => 'post',
                'url' => route('assignments.permissions.store'),
                'title' => 'Assign Role Permissions Form',
                'description' => 'Select a role and some permissions to assign.',
            ],
        ]);
    }

    public function store(AssignmentPermissionRequest $request): RedirectResponse
    {
        $role = Role::findById($request->role);

        $role->givePermissionTo($request->permissions);

        sessionFlash('Success', "The permissions has been given to {$role->name}.", 'success');

        return to_route('assignments.permissions.table');
    }

    public function edit(Role $role): Response
    {
        return inertia('superadmin/role-permission/assignments/permissions-form', [
            'role' => [
                'id' => $role->id,
                'value' => $role->name,
                'label' => ucwords($role->name),
            ],
            'permission' => [
                'value' => $role->permissions()->pluck('name'),
                'label' => ucwords($role->permissions()->pluck('name')),
            ],
            'roles' => collect(Role::query()->select('id', 'name')->oldest()->get())->map(fn ($role) => [
                'id' => $role->id,
                'value' => $role->name,
                'label' => ucwords($role->name),
            ]),
            'permissions' => collect(Permission::query()->select('name')->oldest()->get())->map(fn ($permission) => [
                'value' => $permission->name,
                'label' => ucwords($permission->name),
            ]),
            'page_settings' => [
                'method' => 'put',
                'url' => route('assignments.permissions.update', $role),
                'title' => 'Synchronize Role Permissions Form',
                'description' => 'Select a role and some permissions to synchronize.',
            ],
        ]);
    }

    public function update(AssignmentPermissionRequest $request, Role $role): RedirectResponse
    {
        $role->syncPermissions($request->permissions);

        sessionFlash('Success', ucwords(getFirstName($role->name)) . ' permissions has been synchronize.', 'success');

        return to_route('assignments.permissions.table');
    }

    public function delete(Role $role): RedirectResponse
    {
        $role->permissions()->detach();

        sessionFlash('Success', ucwords(getFirstName($role->name)) . ' permissions has been remove.', 'success');

        return back();
    }
}
