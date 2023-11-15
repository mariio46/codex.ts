<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            [
                'name' => $name = 'Mario',
                'username' => 'mario46_',
                'email' => 'mariomad2296@gmail.com',
            ],
            [
                'name' => $name = 'Fitra',
                'username' => $username = getFirstName($name) . mt_rand(11111, 99999),
                'email' => $username . '@gmail.com',
            ],
            [
                'name' => $name = 'Wira',
                'username' => $username = getFirstName($name) . mt_rand(11111, 99999),
                'email' => $username . '@gmail.com',
            ],
            [
                'name' => $name = 'Nisa',
                'username' => $username = getFirstName($name) . mt_rand(11111, 99999),
                'email' => $username . '@gmail.com',
            ],
            [
                'name' => $name = 'Ferdi',
                'username' => $username = getFirstName($name) . mt_rand(11111, 99999),
                'email' => $username . '@gmail.com',
            ],
            [
                'name' => $name = 'Eric',
                'username' => $username = getFirstName($name) . mt_rand(11111, 99999),
                'email' => $username . '@gmail.com',
            ],
        ])->each(fn ($user) => User::factory()->create($user));
        // User::factory(50)->create();
    }
}
