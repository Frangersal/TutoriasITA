<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Tutor;
use App\Models\Pupil;
use App\Models\Reunion;
use Illuminate\Http\Request;

class ReunionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $tutor = $user->tutor;

        if (!$tutor) {
            return response()->json(['reunions' => [], 'pupils' => []]);
        }

        $reunions = Reunion::where('tutor_id', $tutor->id)->with('pupil.user')->orderBy('date_time', 'desc')->get();
        $pupils = Pupil::where('tutor_id', $tutor->id)->with('user')->get();

        return response()->json([
            'reunions' => $reunions,
            'pupils' => $pupils
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tutor = auth()->user()->tutor;
        
        if (!$tutor) {
            return response()->json(['message' => 'No eres un tutor válido'], 403);
        }

        $data = $request->validate([
            'date_time' => 'required|date',
            'description' => 'required|string',
            'pupil_id' => 'required|exists:pupils,id',
        ]);

        $data['tutor_id'] = $tutor->id;

        $reunion = Reunion::create($data);
        
        // Cargar relaciones para devolver al frontend
        $reunion->load('pupil.user');

        return response()->json(['message' => 'Reunión creada', 'reunion' => $reunion], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reunion $reunion)
    {
        return response()->json($reunion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reunion $reunion)
    {
        $tutor = auth()->user()->tutor;

        if ($reunion->tutor_id !== $tutor->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'date_time' => 'sometimes|required|date',
            'description' => 'sometimes|required|string',
            'pupil_id' => 'sometimes|required|exists:pupils,id',
        ]);

        $reunion->update($data);

        return response()->json(['message' => 'Reunión actualizada', 'reunion' => $reunion->load('pupil.user')]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reunion $reunion)
    {
        $tutor = auth()->user()->tutor;

        if ($reunion->tutor_id !== $tutor->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $reunion->delete();

        return response()->json(['message' => 'Reunión eliminada']);
    }
}
