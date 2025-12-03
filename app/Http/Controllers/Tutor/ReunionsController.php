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
        return response()->json(Reunion::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'date_time' => 'required|date',
            'description' => 'required|string',
            'pupil_id' => 'required|exists:pupils,id',
            'tutor_id' => 'required|exists:tutors,id',
        ]);

        $reunion = Reunion::create($data);

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
        $data = $request->validate([
            'date_time' => 'sometimes|required|date',
            'description' => 'sometimes|required|string',
            'pupil_id' => 'sometimes|required|exists:pupils,id',
            'tutor_id' => 'sometimes|required|exists:tutors,id',
        ]);

        $reunion->update($data);

        return response()->json(['message' => 'Reunión actualizada', 'reunion' => $reunion]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reunion $reunion)
    {
        $reunion->delete();

        return response()->json(['message' => 'Reunión eliminada']);
    }
}
