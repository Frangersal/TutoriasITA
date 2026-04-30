<?php

namespace App\Http\Controllers\Admin;

use App\Models\Form;
use App\Models\Question;
use App\Models\Answer;
use App\Models\AnswersOptions;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Question::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'create endpoint']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'name' => 'required|string',
            'answer_type_id' => 'required|exists:answers_types,id',
        ]);

        $question = Question::create($data);

        return response()->json(['message' => 'Pregunta creada', 'question' => $question], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return response()->json($question);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        return response()->json($question);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'answer_type_id' => 'sometimes|required|exists:answers_types,id',
        ]);

        $question->update($data);

        return response()->json(['message' => 'Pregunta actualizada', 'question' => $question]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return response()->json(['message' => 'Pregunta eliminada']);
    }
}
