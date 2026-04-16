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
            'answers.*.file' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Validaciones dinámicas adicionales por tipo de pregunta
        foreach ($data['answers'] as $ans) {
            $question = \App\Models\Question::find($ans['question_id']);
            if ($question && $ans['value'] !== 'Sin respuesta') {
                if ($question->answer_type_id == 501 && !filter_var($ans['value'], FILTER_VALIDATE_INT)) {
                    return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser un número entero.'], 422);
                }
                if ($question->answer_type_id == 502 && !is_numeric($ans['value'])) {
                    return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser un número decimal.'], 422);
                }
                if (in_array($question->answer_type_id, [503, 553])) {
                    $d = \DateTime::createFromFormat('Y-m-d', $ans['value']);
                    if (!$d || $d->format('Y-m-d') !== $ans['value']) {
                        return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser una fecha válida (AAAA-MM-DD).'], 422);
                    }
                }
            }
        }

        $userId = auth()->id();

        foreach ($data['answers'] as $index => $ans) {
            $valueToSave = $ans['value'];
            
            // Si viene un archivo para esta respuesta, lo guardamos y actualizamos el valor con la ruta
            if (isset($ans['file']) && $request->hasFile("answers.{$index}.file")) {
                // Guardar perfil en storage/app/public/answers_images/
                $path = $request->file("answers.{$index}.file")->store('answers_images', 'public');
                $valueToSave = $path;
            } elseif ($valueToSave === 'file_attached') {
                $valueToSave = 'Sin respuesta'; // En caso de que falle la carga del archivo
            }

            // Evitar duplicados si se reenvía: usamos updateOrCreate
            Answer::updateOrCreate(
                [
                    'user_id' => $userId,
                    'question_id' => $ans['question_id']
                ],
                [
                    'name' => $valueToSave
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
            'answers.*.file' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Validaciones dinámicas adicionales por tipo de pregunta en actualización
        foreach ($data['answers'] as $ans) {
            $question = \App\Models\Question::find($ans['question_id']);
            if ($question && $ans['value'] !== 'Sin respuesta') {
                if ($question->answer_type_id == 501 && !filter_var($ans['value'], FILTER_VALIDATE_INT)) {
                    return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser un número entero.'], 422);
                }
                if ($question->answer_type_id == 502 && !is_numeric($ans['value'])) {
                    return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser un número decimal.'], 422);
                }
                if (in_array($question->answer_type_id, [503, 553])) {
                    $d = \DateTime::createFromFormat('Y-m-d', $ans['value']);
                    if (!$d || $d->format('Y-m-d') !== $ans['value']) {
                        return response()->json(['message' => 'La pregunta "' . $question->name . '" debe ser una fecha válida (AAAA-MM-DD).'], 422);
                    }
                }
            }
        }

        $userId = auth()->id();

        foreach ($data['answers'] as $index => $ans) {
            $valueToSave = $ans['value'];
            
            // Si se envió un nuevo archivo, lo subimos
            if (isset($ans['file']) && $request->hasFile("answers.{$index}.file")) {
                $path = $request->file("answers.{$index}.file")->store('answers_images', 'public');
                $valueToSave = $path;
            } elseif ($valueToSave === 'file_attached') {
                // Prevenir que se guarde el string temporal si hubo un error en la subida, 
                // mejor buscar el valor existente o ignorar. Pero en general, esto no debería ocurrir.
                $existing = Answer::where('user_id', $userId)->where('question_id', $ans['question_id'])->first();
                $valueToSave = $existing ? $existing->name : 'Sin respuesta';
            }

            Answer::updateOrCreate(
                [
                    'user_id' => $userId,
                    'question_id' => $ans['question_id']
                ],
                [
                    'name' => $valueToSave
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
