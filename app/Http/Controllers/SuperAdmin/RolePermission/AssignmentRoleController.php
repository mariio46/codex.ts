<?php

namespace App\Http\Controllers\SuperAdmin\RolePermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\RolePermission\AssignmentRoleRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AssignmentRoleController extends Controller
{
    public function create(): Response
    {
        return inertia('superadmin/role-permission/assignments/roles-form', [
            'user' => new User,
            'role' => new Role,
            'users' => collect(User::query()->select('name', 'username')->doesntHave('roles')->get())->map(fn ($user) => [
                'value' => $user->username,
                'label' => $user->name,
            ]),
            'roles' => collect(Role::query()->select('id', 'name')->oldest()->get())->map(fn ($role) => [
                'value' => $role->name,
                'label' => ucwords($role->name),
            ]),
            'page_settings' => [
                'method' => 'post',
                'url' => route('assignments.roles.store'),
                'title' => 'Assign User Role Form',
                'description' => 'Fill all field to assign user to a roles.',
            ],
        ]);
    }

    public function store(AssignmentRoleRequest $request): RedirectResponse
    {
        $user = User::whereUsername($request->user)->first();

        $user->assignRole($request->roles);

        sessionFlash('Success', "The role has been assign to {$user->name}.", 'success');

        return to_route('assignments.roles.table');
    }

    public function edit(User $user): Response
    {
        return inertia('superadmin/role-permission/assignments/roles-form', [
            'user' => [
                'value' => $user->username,
                'label' => $user->name,
            ],
            'role' => [
                'value' => $user->roles()->pluck('name'),
                'label' => ucwords($user->roles()->pluck('name')),
            ],
            'users' => collect(User::query()->select('name', 'username')->get())->map(fn ($user) => [
                'value' => $user->username,
                'label' => $user->name,
            ]),
            'roles' => collect(Role::query()->select('id', 'name')->oldest()->get())->map(fn ($role) => [
                'value' => $role->name,
                'label' => ucwords($role->name),
            ]),
            'page_settings' => [
                'method' => 'put',
                'url' => route('assignments.roles.update', $user),
                'title' => 'Synchronize User Role Form',
                'description' => 'Fill all field to synchronize user roles.',
            ],
        ]);
    }

    public function update(AssignmentRoleRequest $request, User $user): RedirectResponse
    {
        $user->syncRoles($request->roles);

        sessionFlash('Success', ucwords(getFirstName($user->name)) . ' roles has been synchronize.', 'success');

        return to_route('assignments.roles.table');
    }

    public function delete(User $user): RedirectResponse
    {
        $user->roles()->detach();

        sessionFlash('Success', ucwords(getFirstName($user->name)) . ' roles has been remove.', 'success');

        return back();
    }
}
