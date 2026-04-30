<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("tutors")->insert([
            ["id" => 1, "description" => "Tutor User", "user_id" => 2], // major_id: 7
            ["id" => 2, "description" => "Arqui Juve", "user_id" => 4], // major_id: 1
            ["id" => 3, "description" => "Peña Nieto", "user_id" => 9], // major_id: 2
            ["id" => 4, "description" => "Paula Castro", "user_id" => 14], // major_id: 3
            ["id" => 5, "description" => "Gerardo Dominguez", "user_id" => 19], // major_id: 4
            ["id" => 6, "description" => "Obi Wan Kenobi", "user_id" => 24], // major_id: 5
            ["id" => 7, "description" => "Henry Martin", "user_id" => 29], // major_id: 6
            ["id" => 8, "description" => "Alan Turing", "user_id" => 34], // major_id: 7
            ["id" => 9, "description" => "Sid Meier", "user_id" => 39], // major_id: 8
        ]);
    }
}
