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
        /*
        DB::table('answers_types')->insert([ "id" => "1", "name" => "texto","description" => "Texto libre" ]);
        DB::table('answers_types')->insert([ "id" => "2", "name" => "opcion","description" => "Elegir entre varias opciones predeterminadas" ]);
        */
        // 100
        
        DB::table('answers_types')->insert([ 
            "id" => "100", 
            "name" => "text default 100",
            "description" => "Respuesta libre de 128 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "101", 
            "name" => "text 101",
            "description" => "Respuesta libre de 10 caracteres" 
        ]);

        DB::table('answers_types')->insert([ 
            "id" => "102", 
            "name" => "text 102",
            "description" => "Respuesta libre de 25 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "105", 
            "name" => "text 105",
            "description" => "Respuesta libre de 50 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "110", 
            "name" => "text 110",
            "description" => "Respuesta libre de 100 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "120", 
            "name" => "text 120",
            "description" => "Respuesta libre de 250 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "150", 
            "name" => "text 150",
            "description" => "Respuesta libre de 500 caracteres" 
        ]);

        // 200
        
        DB::table('answers_types')->insert([ 
            "id" => "200", 
            "name" => "text default optional 200",
            "description" => "Respuesta libre opcional de 128 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "201", 
            "name" => "text optional 201",
            "description" => "Respuesta libre opcional de 10 caracteres" 
        ]);

        DB::table('answers_types')->insert([ 
            "id" => "202", 
            "name" => "text optional 202",
            "description" => "Respuesta libre opcional de 25 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "205", 
            "name" => "text optional 205",
            "description" => "Respuesta libre opcional de 50 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "210", 
            "name" => "text optional 210",
            "description" => "Respuesta libre opcional de 100 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "220", 
            "name" => "text optional 220",
            "description" => "Respuesta libre opcional de 250 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "250", 
            "name" => "text optional 250",
            "description" => "Respuesta libre opcional de 500 caracteres" 
        ]);

        // 300
        
        DB::table('answers_types')->insert([ 
            "id" => "300", 
            "name" => "multiple choice 300",
            "description" => "Opcion multiple" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "350", 
            "name" => "multiple choice optional 350",
            "description" => "Opcion multiple opcional" 
        ]);

        //500
        
        DB::table('answers_types')->insert([ 
            "id" => "501", 
            "name" => "Int 501",
            "description" => "Numero entero de 16 caracteres" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "502", 
            "name" => "Decimal 502",
            "description" => "Numero decimal de 16 caracteres con 2 decimales" 
        ]);

        DB::table('answers_types')->insert([ 
            "id" => "503", 
            "name" => "Date 503",
            "description" => "Fecha" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "504", 
            "name" => "Hour 504",
            "description" => "Hora" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "505", 
            "name" => "Date Time 505",
            "description" => "Fecha y hora" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "506", 
            "name" => "Image 506",
            "description" => "Imagen" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "507", 
            "name" => "audio 507",
            "description" => "Audio" 
        ]);
        
        DB::table('answers_types')->insert([ 
            "id" => "508", 
            "name" => "video 508",
            "description" => "Video" 
        ]);
        
        
        DB::table('answers_types')->insert([ 
            "id" => "553", 
            "name" => "Date 553",
            "description" => "Fecha opcional" 
        ]);

    }
}
