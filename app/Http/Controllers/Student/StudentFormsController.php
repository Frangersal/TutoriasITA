<?php

namespace App\Http\Controllers\Student;

use App\Models\Form;
use App\Models\Answer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentFormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        // Obtener los IDs de los formularios que el usuario ya ha completado
        $completedFormIds = $user->completedForms()->pluck('forms.id')->toArray();

        $forms = Form::all()->map(function ($form) use ($completedFormIds) {
            // Agregar la propiedad is_answered si el ID del formulario está en la lista de completados
            $form->is_answered = in_array($form->id, $completedFormIds);
            return $form;
        });

        return response()->json($forms);
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        // Cargar las preguntas y sus opciones para que el estudiante pueda responder
        // También cargamos la respuesta del usuario si existe
        $form->load(['questions.options', 'questions.answers' => function ($query) {
            $query->where('user_id', auth()->id());
        }]);

        // Transformar para facilitar el uso en el frontend
        $form->questions->each(function ($question) {
            $answer = $question->answers->first();
            if ($answer) {
                // El frontend espera la propiedad 'answer', pero en BD es 'name'
                $answer->answer = $answer->name;
                $question->user_answer = $answer;
            }
            unset($question->answers);
        });

        return response()->json($form);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Los estudiantes no crean formularios (plantillas), solo los responden.
        // La respuesta se maneja en StudentAnswersController.
        return response()->json(['message' => 'Action not allowed'], 403);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Los estudiantes no editan formularios.
        return response()->json(['message' => 'Action not allowed'], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Los estudiantes no eliminan formularios.
        return response()->json(['message' => 'Action not allowed'], 403);
    }
}
