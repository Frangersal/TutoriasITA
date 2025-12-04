<?php

namespace App\Http\Controllers\Admin;

use App\Models\Form;
use App\Models\Question;
use App\Models\Answer;
use App\Models\AnswersOptions;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class FormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Form::orderBy('id', 'asc')->get());
    }

    public function __construct()
    {
        // $this->middleware('auth');
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
            'name' => 'required|string|max:255|unique:forms,name',
            'description' => 'nullable|string',
        ]);

        $form = Form::create($data);

        return response()->json(['message' => 'Formulario creado', 'form' => $form], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        return response()->json($form->load('questions.options'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        return response()->json($form);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Form $form)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:forms,name,' . $form->id,
            'description' => 'nullable|string',
        ]);

        $form->update($data);

        return response()->json(['message' => 'Formulario actualizado', 'form' => $form]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        $form->delete();

        return response()->json(['message' => 'Formulario eliminado']);
    }
}
