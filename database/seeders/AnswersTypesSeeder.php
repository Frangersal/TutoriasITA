<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnswersTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('answers_types')->insert([ "id" => "1", "name" => "texto","description" => "Texto libre" ]);
        DB::table('answers_types')->insert([ "id" => "2", "name" => "opcion","description" => "Elegir entre varias opciones predeterminadas" ]);
    }
}
