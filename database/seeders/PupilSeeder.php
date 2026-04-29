<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PupilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("pupils")->insert([
            // Tutor 1 (major_id: 7)
            ["id" => 1, "coment" => "Student User", "user_id" => 3, "tutor_id" => 1],
            
            // Tutor 2 (major_id: 1)
            ["id" => 2, "coment" => "Ringo Star", "user_id" => 5, "tutor_id" => 2],
            ["id" => 3, "coment" => "Akane Tendo", "user_id" => 6, "tutor_id" => 2],
            ["id" => 4, "coment" => "Luis Miguel", "user_id" => 7, "tutor_id" => 2],
            ["id" => 5, "coment" => "Mon Laferte", "user_id" => 8, "tutor_id" => 2],

            // Tutor 3 (major_id: 2)
            ["id" => 6, "coment" => "Juan Gabriel", "user_id" => 10, "tutor_id" => 3],
            ["id" => 7, "coment" => "Stacy Campos", "user_id" => 11, "tutor_id" => 3],
            ["id" => 8, "coment" => "Eliza Diaz", "user_id" => 12, "tutor_id" => 3],
            ["id" => 9, "coment" => "Luisito Comunista", "user_id" => 13, "tutor_id" => 3],

            // Tutor 4 (major_id: 3)
            ["id" => 10, "coment" => "Randy Orton", "user_id" => 15, "tutor_id" => 4],
            ["id" => 11, "coment" => "Liv Morgan", "user_id" => 16, "tutor_id" => 4],
            ["id" => 12, "coment" => "David Bowie", "user_id" => 17, "tutor_id" => 4],
            ["id" => 13, "coment" => "Sarah Luebbert", "user_id" => 18, "tutor_id" => 4],

            // Tutor 5 (major_id: 4)
            ["id" => 14, "coment" => "Mary Jane", "user_id" => 20, "tutor_id" => 5],
            ["id" => 15, "coment" => "Gio Reynoso", "user_id" => 21, "tutor_id" => 5],
            ["id" => 16, "coment" => "Sol Villanueva", "user_id" => 22, "tutor_id" => 5],
            ["id" => 17, "coment" => "Gregoria Granados", "user_id" => 23, "tutor_id" => 5],

            // Tutor 6 (major_id: 5)
            ["id" => 18, "coment" => "Invader Lum", "user_id" => 25, "tutor_id" => 6],
            ["id" => 19, "coment" => "Ranma Saotome", "user_id" => 26, "tutor_id" => 6],
            ["id" => 20, "coment" => "Bruno Diaz", "user_id" => 27, "tutor_id" => 6],
            ["id" => 21, "coment" => "Padme Amidala", "user_id" => 28, "tutor_id" => 6],

            // Tutor 7 (major_id: 6)
            ["id" => 22, "coment" => "Andrea Castro", "user_id" => 30, "tutor_id" => 7],
            ["id" => 23, "coment" => "Guillermo Ochoa", "user_id" => 31, "tutor_id" => 7],
            ["id" => 24, "coment" => "Rodolfo El Xenomorfo", "user_id" => 32, "tutor_id" => 7],
            ["id" => 25, "coment" => "Peter Parker", "user_id" => 33, "tutor_id" => 7],
            
            // Tutor 8 (major_id: 7)
            ["id" => 26, "coment" => "Francisco Salinas", "user_id" => 35, "tutor_id" => 8],
            ["id" => 27, "coment" => "Alina Salinas", "user_id" => 36, "tutor_id" => 8],
            ["id" => 28, "coment" => "Linus Torvalds", "user_id" => 37, "tutor_id" => 8],
            ["id" => 29, "coment" => "Gabe Newell", "user_id" => 38, "tutor_id" => 8],

            // Tutor 9 (major_id: 8)
            ["id" => 30, "coment" => "Harry Potter", "user_id" => 40, "tutor_id" => 9],
            ["id" => 31, "coment" => "Dr. Who", "user_id" => 41, "tutor_id" => 9],
            ["id" => 32, "coment" => "Saul Goodman", "user_id" => 42, "tutor_id" => 9],
            ["id" => 33, "coment" => "Sydney Sweeney", "user_id" => 43, "tutor_id" => 9],
        ]);
    }
}
