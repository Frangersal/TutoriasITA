<?php

namespace App\Http\Controllers\Admin;

use App\Models\Form;
use App\Models\Question;
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
        $forms = Form::orderBy('id', 'desc')->paginate(15);

        return Inertia::render('admin/forms/index', [
            'forms' => $forms,
        ]);
    }

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/forms/create');
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

        // Si se envía la intención de crear y editar preguntas, redirigimos al edit
        if ($request->filled('create_editQuestion') || $request->boolean('create_editQuestion')) {
            return redirect()->route('admin.forms.edit', $form);
        }

        return redirect()->route('admin.forms.index')->with('success', 'Formulario creado.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        return Inertia::render('admin/forms/show', [
            'form' => $form,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        if (Gate::denies('admin-action')) {
            return redirect()->route('admin.forms.index');
        }

        $questions = Question::where('form_id', $form->id)->get();

        return Inertia::render('admin/forms/edit', [
            'form' => $form,
            'questions' => $questions,
        ]);
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

        if (Gate::denies('admin-action')) {
            return redirect()->route('admin.forms.index');
        }

        $form->update($data);

        return redirect()->route('admin.forms.index')->with('success', 'Formulario actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        if (Gate::denies('admin-action')) {
            return redirect()->route('admin.forms.index');
        }

        $form->delete();

        return redirect()->route('admin.forms.index')->with('success', 'Formulario eliminado.');
    }
}
