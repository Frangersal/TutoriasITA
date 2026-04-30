<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Major;
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
            'id' => 1,
            'name' => 'Admin User',
            'control_number' => '1111111',
            'picture' => null,
            'email' => 'admin@user.com',
            'password' => Hash::make('password'),
            'major_id' => 7,
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'id' => 2,
            'name' => 'Tutor User',
            'control_number' => '2222222',
            'picture' => null,
            'email' => 'tutor@user.com',
            'password' => Hash::make('password'),
            'major_id' => 7,
            'role_id' => $tutorRole->id,
        ]);
        
        User::create([
            'id' => 3,
            'name' => 'Student User',
            'control_number' => '3333333',
            'picture' => null,
            'email' => 'Student@user.com',
            'password' => Hash::make('password'),
            'major_id' => 7,
            'role_id' => $tutorRole->id,
        ]);

        $users = [
            // major_id: 1
            ['id' => 4, 'name' => 'Arqui Juve', 'email' => 'juve@user.com', 'major_id' => 1, 'role_id' => $tutorRole->id],
            ['id' => 5, 'name' => 'Ringo Star', 'email' => 'ringo@user.com', 'major_id' => 1, 'role_id' => $studentRole->id],
            ['id' => 6, 'name' => 'Akane Tendo', 'email' => 'akane@user.com', 'major_id' => 1, 'role_id' => $studentRole->id],
            ['id' => 7, 'name' => 'Luis Miguel', 'email' => 'luis@user.com', 'major_id' => 1, 'role_id' => $studentRole->id],
            ['id' => 8, 'name' => 'Mon Laferte', 'email' => 'mon@user.com', 'major_id' => 1, 'role_id' => $studentRole->id],
            
            // major_id: 2
            ['id' => 9, 'name' => 'Peña Nieto', 'email' => 'nieto@user.com', 'major_id' => 2, 'role_id' => $tutorRole->id],
            ['id' => 10, 'name' => 'Juan Gabriel', 'email' => 'juan@user.com', 'major_id' => 2, 'role_id' => $studentRole->id],
            ['id' => 11, 'name' => 'Stacy Campos', 'email' => 'stacy@user.com', 'major_id' => 2, 'role_id' => $studentRole->id],
            ['id' => 12, 'name' => 'Eliza Diaz', 'email' => 'eliza@user.com', 'major_id' => 2, 'role_id' => $studentRole->id],
            ['id' => 13, 'name' => 'Luisito Comunista', 'email' => 'luisito@user.com', 'major_id' => 2, 'role_id' => $studentRole->id],
            
            // major_id: 3
            ['id' => 14, 'name' => 'Paula Castro', 'email' => 'paula@user.com', 'major_id' => 3, 'role_id' => $tutorRole->id],
            ['id' => 15, 'name' => 'Randy Orton', 'email' => 'randy@user.com', 'major_id' => 3, 'role_id' => $studentRole->id],
            ['id' => 16, 'name' => 'Liv Morgan', 'email' => 'liv@user.com', 'major_id' => 3, 'role_id' => $studentRole->id],
            ['id' => 17, 'name' => 'David Bowie', 'email' => 'david@user.com', 'major_id' => 3, 'role_id' => $studentRole->id],
            ['id' => 18, 'name' => 'Sarah Luebbert', 'email' => 'sara@user.com', 'major_id' => 3, 'role_id' => $studentRole->id],
            
            // major_id: 4
            ['id' => 19, 'name' => 'Gerardo Dominguez', 'email' => 'gerardo@user.com', 'major_id' => 4, 'role_id' => $tutorRole->id],
            ['id' => 20, 'name' => 'Mary Jane', 'email' => 'mary@user.com', 'major_id' => 4, 'role_id' => $studentRole->id],
            ['id' => 21, 'name' => 'Gio Reynoso', 'email' => 'gio@user.com', 'major_id' => 4, 'role_id' => $studentRole->id],
            ['id' => 22, 'name' => 'Sol Villanueva', 'email' => 'sol@user.com', 'major_id' => 4, 'role_id' => $studentRole->id],
            ['id' => 23, 'name' => 'Gregoria Granados', 'email' => 'gregoria@user.com', 'major_id' => 4, 'role_id' => $studentRole->id],
            
            // major_id: 5
            ['id' => 24, 'name' => 'Obi Wan Kenobi', 'email' => 'obi@user.com', 'major_id' => 5, 'role_id' => $tutorRole->id],
            ['id' => 25, 'name' => 'Invader Lum', 'email' => 'lum@user.com', 'major_id' => 5, 'role_id' => $studentRole->id],
            ['id' => 26, 'name' => 'Ranma Saotome', 'email' => 'ranma@user.com', 'major_id' => 5, 'role_id' => $studentRole->id],
            ['id' => 27, 'name' => 'Bruno Diaz', 'email' => 'bruno@user.com', 'major_id' => 5, 'role_id' => $studentRole->id],
            ['id' => 28, 'name' => 'Padme Amidala', 'email' => 'paula2@user.com', 'major_id' => 5, 'role_id' => $studentRole->id],
            
            // major_id: 6
            ['id' => 29, 'name' => 'Henry Martin', 'email' => 'henry@user.com', 'major_id' => 6, 'role_id' => $tutorRole->id],
            ['id' => 30, 'name' => 'Andrea Castro', 'email' => 'andrea@user.com', 'major_id' => 6, 'role_id' => $studentRole->id],
            ['id' => 31, 'name' => 'Guillermo Ochoa', 'email' => 'ochoa@user.com', 'major_id' => 6, 'role_id' => $studentRole->id],
            ['id' => 32, 'name' => 'Rodolfo El Xenomorfo', 'email' => 'rodolfo@user.com', 'major_id' => 6, 'role_id' => $studentRole->id],
            ['id' => 33, 'name' => 'Peter Parker', 'email' => 'peter@user.com', 'major_id' => 6, 'role_id' => $studentRole->id],
            
            // major_id: 7
            ['id' => 34, 'name' => 'Alan Turing', 'email' => 'alan@user.com', 'major_id' => 7, 'role_id' => $tutorRole->id],
            ['id' => 35, 'name' => 'Francisco Salinas', 'email' => 'francisco@user.com', 'major_id' => 7, 'role_id' => $studentRole->id],
            ['id' => 36, 'name' => 'Alina Salinas', 'email' => 'alina@user.com', 'major_id' => 7, 'role_id' => $studentRole->id],
            ['id' => 37, 'name' => 'Linus Torvalds', 'email' => 'linus@user.com', 'major_id' => 7, 'role_id' => $studentRole->id],
            ['id' => 38, 'name' => 'Gabe Newell', 'email' => 'steam@user.com', 'major_id' => 7, 'role_id' => $studentRole->id],
            
            // major_id: 8
            ['id' => 39, 'name' => 'Sid Meier', 'email' => 'sid@user.com', 'major_id' => 8, 'role_id' => $tutorRole->id],
            ['id' => 40, 'name' => 'Harry Potter', 'email' => 'harry@user.com', 'major_id' => 8, 'role_id' => $studentRole->id],
            ['id' => 41, 'name' => 'Dr. Who', 'email' => 'who@user.com', 'major_id' => 8, 'role_id' => $studentRole->id],
            ['id' => 42, 'name' => 'Saul Goodman', 'email' => 'saul@user.com', 'major_id' => 8, 'role_id' => $studentRole->id],
            ['id' => 43, 'name' => 'Sydney Sweeney', 'email' => 'sydney@user.com', 'major_id' => 8, 'role_id' => $studentRole->id],
        ];

        // Obtener los últimos 2 dígitos del año actual
        $yearDigits = date('y');

        foreach ($users as $index => $user) {
            // Generar 5 dígitos aleatorios
            $randomDigits = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);
            
            // Unir año + 5 dígitos random para formar los 7 dígitos
            $controlNumber = $yearDigits . $randomDigits;

            User::create([
                'id' => $user['id'],
                'name' => $user['name'],
                'control_number' => $controlNumber,
                'picture' => null,
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'major_id' => $user['major_id'],
                'role_id' => $user['role_id'],
            ]);
        }
    }
}
