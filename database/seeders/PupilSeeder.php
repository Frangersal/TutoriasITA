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
        DB::table("pupils")->insert([ "id" => "1", "coment" => "Pupil de pruebas", "user_id" => "3", "tutor_id" => "1",]);
        //
    }
}
