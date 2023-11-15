<?php

namespace App\Http\Controllers\SuperAdmin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\RolePermission\PermissionRequest;
use App\Http\Resources\RolePermission\TablePermissionResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function table(): Response
    {
        $permissions = Permission::query()->oldest()->fastPaginate(10);

        return inertia('superadmin/role-permission/permissions/table', [
            'permissions' => TablePermissionResource::collection($permissions)->additional([
                'meta' => [
                    'has_pages' => $permissions->hasPages(),
                ],
            ]),
        ]);
    }

    public function create(): Response
    {
        return inertia('superadmin/role-permission/permissions/form', [
            'permission' => new Permission,
            'page_settings' => [
                'method' => 'post',
                'url' => route('permissions.store'),
                'title' => 'Create Permission Form',
                'description' => 'Fill all field to add the permission.',
            ],
        ]);
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        $permission = Permission::create([
            'name' => strtolower($request->name),
            'guard_name' => $request->guard_name ? strtolower($request->guard_name) : 'web',
        ]);

        sessionFlash('Success', "The permission {$permission->name} has been stored.", 'success');

        return to_route('permissions.table');
    }

    public function edit(Permission $permission): Response
    {
        return inertia('superadmin/role-permission/permissions/form', [
            'permission' => $permission,
            'page_settings' => [
                'method' => 'put',
                'url' => route('permissions.update', $permission->id),
                'title' => 'Edit Permission Form',
                'description' => 'Edit all field to update the permission.',
            ],
        ]);
    }

    public function update(PermissionRequest $request, Permission $permission): RedirectResponse
    {
        $permission->update([
            'name' => strtolower($request->name),
            'guard_name' => $request->guard_name ? strtolower($request->guard_name) : 'web',
        ]);

        sessionFlash('Success', "The permission {$permission->name} has been updated.", 'success');

        return to_route('permissions.table');
    }

    public function delete(Permission $permission): RedirectResponse
    {
        $permission->roles()->detach();

        $permission->delete();

        sessionFlash('Success', "The permission {$permission->name} has been deleted.", 'success');

        return back();
    }
}
