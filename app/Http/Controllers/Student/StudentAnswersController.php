<?php

namespace App\Http\Controllers\Student;

use App\Models\Answer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentAnswersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $data = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.value' => 'required', // Siempre llega un valor, aunque sea "Sin respuesta"
        ]);

        $userId = auth()->id();

        foreach ($data['answers'] as $ans) {
            // Evitar duplicados si se reenvía: usamos updateOrCreate
            Answer::updateOrCreate(
                [
                    'user_id' => $userId,
                    'question_id' => $ans['question_id']
                ],
                [
                    'name' => $ans['value']
                ]
            );
        }

        // Registrar en la tabla intermedia que el usuario completó este formulario
        auth()->user()->completedForms()->syncWithoutDetaching([$data['form_id']]);

        return response()->json(['message' => 'Respuestas guardadas correctamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        // NOTA: Aquí $id se interpreta como el form_id, ya que actualizamos
        // todas las respuestas de un formulario en lote.
        
        $data = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.value' => 'required',
        ]);

        $userId = auth()->id();

        foreach ($data['answers'] as $ans) {
            Answer::updateOrCreate(
                [
                    'user_id' => $userId,
                    'question_id' => $ans['question_id']
                ],
                [
                    'name' => $ans['value']
                ]
            );
        }

        return response()->json(['message' => 'Respuestas actualizadas correctamente']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
