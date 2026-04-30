<?php

namespace App\Http\Controllers\Admin;

use App\Models\Form;
use App\Models\Question;
use App\Models\Answer;
use App\Models\AnswersOptions;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(AnswersOptions::all());
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
            'name' => 'required|string',
            'question_id' => 'required|exists:questions,id',
        ]);

        $option = AnswersOptions::create($data);

        return response()->json(['message' => 'Opción creada', 'option' => $option], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(AnswersOptions $option)
    {
        return response()->json($option);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnswersOptions $option)
    {
        return response()->json($option);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnswersOptions $option)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        $option->update($data);

        return response()->json(['message' => 'Opción actualizada', 'option' => $option]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnswersOptions $option)
    {
        $option->delete();

        return response()->json(['message' => 'Opción eliminada']);
    }
}
