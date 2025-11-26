<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Crear roles
        $adminRole = Role::create(['name' => 'Admin']);
        $tutorRole = Role::create(['name' => 'Tutor']);
        $studentRole = Role::create(['name' => 'Student']);

        // Crear usuarios por defecto
        User::create([
            'name' => 'Admin User',
            'email' => 'Admin@user.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'Tutor User',
            'email' => 'Tutor@user.com',
            'password' => Hash::make('password'),
            'role_id' => $tutorRole->id,
        ]);

        User::create([
            'name' => 'Student User',
            'email' => 'Student@user.com',
            'password' => Hash::make('password'),
            'role_id' => $studentRole->id,
        ]);
    }
}
