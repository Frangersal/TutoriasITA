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
            ['name' => 'Arquitectura', 'initials' => 'ARQ', 'description' => 'Carrera de Arquitectura'],
            ['name' => 'Contador Público', 'initials' => 'CP', 'description' => 'Carrera de Contador Público'],
            ['name' => 'Ingeniería Bioquímica', 'initials' => 'IBQ', 'description' => 'Carrera de Ingeniería Bioquímica'],
            ['name' => 'Ingeniería Electromecánica', 'initials' => 'IEM', 'description' => 'Carrera de Ingeniería Electromecánica'],
            ['name' => 'Ingeniería en Ciencia de Datos', 'initials' => 'ICD', 'description' => 'Carrera de Ingeniería en Ciencia de Datos'],
            ['name' => 'Ingeniería en Gestión Empresarial', 'initials' => 'IGE', 'description' => 'Carrera de Ingeniería en Gestión Empresarial'],
            ['name' => 'Ingeniería en Sistemas Computacionales', 'initials' => 'ISC', 'description' => 'Carrera de Ingeniería en Sistemas Computacionales'],
            ['name' => 'Licenciatura en Administración', 'initials' => 'LA', 'description' => 'Carrera de Licenciatura en Administración'],
        ]);
    }
}