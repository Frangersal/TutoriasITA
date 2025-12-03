<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Reunion;
use Illuminate\Http\Request;

class StudentReunionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if (!$user->pupil) {
            return response()->json(['message' => 'No tienes un perfil de alumno asociado.'], 404);
        }

        // Obtenemos las reuniones del alumno y cargamos la información del tutor y su usuario (nombre)
        $reunions = $user->pupil->reunions()->with('tutor.user')->get();

        return response()->json($reunions);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = auth()->user();

        if (!$user->pupil) {
            return response()->json(['message' => 'No tienes un perfil de alumno asociado.'], 404);
        }

        // Buscamos la reunión asegurando que pertenezca al alumno
        $reunion = $user->pupil->reunions()->with('tutor.user')->where('id', $id)->first();

        if (!$reunion) {
            return response()->json(['message' => 'Reunión no encontrada o no tienes permiso para verla.'], 404);
        }

        return response()->json($reunion);
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
        return response()->json(['message' => 'Action not allowed'], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->json(['message' => 'Action not allowed'], 403);
    }
}
