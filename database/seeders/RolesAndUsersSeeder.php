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
        $adminRole = Role::create(['name' => 'admin']);
        $tutorRole = Role::create(['name' => 'tutor']);
        $studentRole = Role::create(['name' => 'student']);

        // Crear usuarios por defecto
        User::create([
            'name' => 'Admin User',
            'control_number' => '11111111',
            'picture' => null,
            'email' => 'admin@user.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'Tutor User',
            'control_number' => '22222222',
            'picture' => null,
            'email' => 'tutor@user.com',
            'password' => Hash::make('password'),
            'role_id' => $tutorRole->id,
        ]);

        User::create([
            'name' => 'Student User',
            'control_number' => '33333333',
            'picture' => null,
            'email' => 'student@user.com',
            'password' => Hash::make('password'),
            'role_id' => $studentRole->id,
        ]);
    }
}
