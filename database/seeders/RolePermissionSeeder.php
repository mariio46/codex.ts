<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        collect([
            'super admin',
            'admin',
            'operator',
            'instructor',
            'crew',
        ])->each(fn ($role) => Role::create(['name' => $role]));

        // Permissions
        collect([
            'management admin',
            'management operator',
            'management instructor',
            'management crew',
            'management user',
        ])->each(fn ($permission) => Permission::create(['name' => $permission]));

        // assign permissions to role
        Role::find(2)->givePermissionTo([
            'management operator',
            'management instructor',
            'management crew',
            'management user',
        ]);
        Role::find(3)->givePermissionTo([
            'management instructor',
            'management crew',
            'management user',
        ]);
        Role::find(4)->givePermissionTo([
            'management crew',
            'management user',
        ]);
        Role::find(5)->givePermissionTo([
            'management user',
        ]);

        // assign role to user
        User::find(1)->assignRole('super admin');
        User::find(2)->assignRole('admin');
        User::find(3)->assignRole('operator');
        User::find(4)->assignRole('instructor');
        User::find(5)->assignRole('crew');

        // for ($i = 5; $i <= 50; $i++) {
        //     User::find($i)->assignRole('crew');
        // }
    }
}
