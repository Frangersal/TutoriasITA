<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Pupil;
use Illuminate\Http\Request;

class PupilsController extends Controller
{
    public function index()
    {
        return response()->json(Pupil::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'coment' => 'nullable|string',
            'tutor_id' => 'required|exists:tutors,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $pupil = Pupil::create($data);
        return response()->json(['message' => 'Pupil created', 'pupil' => $pupil], 201);
    }

    public function show(Pupil $pupil)
    {
        return response()->json($pupil);
    }

    public function update(Request $request, Pupil $pupil)
    {
        $data = $request->validate([
            'coment' => 'nullable|string',
            'tutor_id' => 'sometimes|required|exists:tutors,id',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $pupil->update($data);
        return response()->json(['message' => 'Pupil updated', 'pupil' => $pupil]);
    }

    public function destroy(Pupil $pupil)
    {
        $pupil->delete();
        return response()->json(['message' => 'Pupil deleted']);
    }
}
