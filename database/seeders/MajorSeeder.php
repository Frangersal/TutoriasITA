<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('majors')->insert([
            ['id' => 1, 'name' => 'Arquitectura', 'initials' => 'ARQ', 'description' => 'Carrera de Arquitectura'],
            ['id' => 2, 'name' => 'Contador Público', 'initials' => 'CP', 'description' => 'Carrera de Contador Público'],
            ['id' => 3, 'name' => 'Ingeniería Bioquímica', 'initials' => 'IBQ', 'description' => 'Carrera de Ingeniería Bioquímica'],
            ['id' => 4, 'name' => 'Ingeniería Electromecánica', 'initials' => 'IEM', 'description' => 'Carrera de Ingeniería Electromecánica'],
            ['id' => 5, 'name' => 'Ingeniería en Ciencia de Datos', 'initials' => 'ICD', 'description' => 'Carrera de Ingeniería en Ciencia de Datos'],
            ['id' => 6, 'name' => 'Ingeniería en Gestión Empresarial', 'initials' => 'IGE', 'description' => 'Carrera de Ingeniería en Gestión Empresarial'],
            ['id' => 7, 'name' => 'Ingeniería en Sistemas Computacionales', 'initials' => 'ISC', 'description' => 'Carrera de Ingeniería en Sistemas Computacionales'],
            ['id' => 8, 'name' => 'Licenciatura en Administración', 'initials' => 'LA', 'description' => 'Carrera de Licenciatura en Administración'],
        ]);
    }
}