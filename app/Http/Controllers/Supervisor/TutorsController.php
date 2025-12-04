<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Tutor::with('user')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $tutor = Tutor::create($data);

        return response()->json(['message' => 'Tutor creado', 'tutor' => $tutor], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tutor $tutor)
    {
        return response()->json($tutor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tutor $tutor)
    {
        $data = $request->validate([
            'description' => 'sometimes|required|string',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $tutor->update($data);

        return response()->json(['message' => 'Tutor actualizado', 'tutor' => $tutor]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tutor $tutor)
    {
        $tutor->delete();

        return response()->json(['message' => 'Tutor eliminado']);
    }
}
