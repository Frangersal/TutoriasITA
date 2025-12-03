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
        return response()->json(Form::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        // Cargar las preguntas y sus opciones para que el estudiante pueda responder
        return response()->json($form->load('questions.options'));
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
