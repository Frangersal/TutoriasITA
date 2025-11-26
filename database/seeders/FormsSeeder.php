<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("forms")->insert([
            "id" => 1, "name" => "Formato de entrevista",
            "description" => "Formulario sobre Formato de entrevista",
        ]);

        DB::table("forms")->insert([
            "id" => 2, "name" => "Formulario Hermanos",
            "description" => "Formulario sobre tus hermanos, ordénalos de mayor a menor incluyéndote, en caso de no tener tantos hermanos responda ‘Sin respuesta'",
        ]);

        DB::table("forms")->insert([
            "id" => 3, "name" => "Economía familiar ",
            "description" => "Formulario sobre la Economía familiar ",
        ]);

        DB::table("forms")->insert([
            "id" => 4, "name" => "Realización de estudios ",
            "description" => "Formulario sobre Realización de estudios ",
        ]);

        DB::table("forms")->insert([
            "id" => 5, "name" => "Desajustes psicofisiológicos ",
            "description" => "Formulario sobre Desajustes psicofisiológicos ",
        ]);

        DB::table("forms")->insert([
            "id" => 6, "name" => "Áreas de Integración padres ",
            "description" => "Formulario sobre las Áreas de Integración padres ",
        ]);

        DB::table("forms")->insert([
            "id" => 7, "name" => "Áreas de Integración hermanos ",
            "description" => "Formulario sobre las Áreas de Integración con hermanos ",
        ]);

        DB::table("forms")->insert([
            "id" => 8, "name" => "Áreas de Integración familiares ",
            "description" => "Formulario sobre Áreas de Integración familiares ",
        ]);

        DB::table("forms")->insert([
            "id" => 9, "name" => "Área social ",
            "description" => "Formulario sobre Área social ",
        ]);

        DB::table("forms")->insert([
            "id" => 10, "name" => "Características personales (madurez y equilibrio) ",
            "description" => "Formulario sobre Características personales (madurez y equilibrio) ",
        ]);

        DB::table("forms")->insert([
            "id" => 11, "name" => "Área psicopedagógica ",
            "description" => "Formulario sobre Área psicopedagógica ",
        ]);

        DB::table("forms")->insert([
            "id" => 12, "name" => "Plan de vida y carrera ",
            "description" => "Formulario sobre Plan de vida y carrera ",
        ]);

        DB::table("forms")->insert([
            "id" => 13, "name" => "Características personales de... ",
            "description" => "Formulario sobre Características personales de.. ",
        ]);

        DB::table("forms")->insert([
            "id" => 14, "name" => "Encuesta para organización del estudio ",
            "description" => " Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas",
        ]);

        DB::table("forms")->insert([
            "id" => 15, "name" => "Encuesta sobre técnicas de estudio ",
            "description" => "Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas",
        ]);

        DB::table("forms")->insert([
            "id" => 16, "name" => "Encuesta sobre motivación para el estudio ",
            "description" => "Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas",
        ]);

        DB::table("forms")->insert([
            "id" => 17, "name" => "Test de autoestima ",
            "description" => "Instrucciones: Realiza el siguiente test para evaluar y comprobar tu nivel de autoestima. Contesta con la mayo sinceridad posible a cada una de las siguientes preguntas eliguiente la respuesta que mas identifique con tu forma de pensar o de actuar. ",
        ]);

        DB::table("forms")->insert([
            "id" => 18, "name" => "Test de asertividad ",
            "description" => "Formulario sobre Test de asertividad ",
        ]);

        DB::table("forms")->insert([
            "id" => 19, "name" => "Evaluación de la acción tutorial",
            "description" => "Formulario sobre la Evaluación de la acción tutorial",
        ]);

        DB::table("forms")->insert([
            "id" => 20, "name" => "Datos médicos ",
            "description" => "Formulario sobre datos médicos  ",
        ]);
    }
}
