<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Pupil;
use Illuminate\Http\Request;

class PupilsController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Pupil::with(['user', 'tutor.user']);

        // Si es tutor, filtrar solo sus pupilos
        if ($user->hasRole('tutor')) {
            // Asegurarse de que el usuario tenga un registro de tutor asociado
            if ($user->tutor) {
                $query->where('tutor_id', $user->tutor->id);
            } else {
                // Si es rol tutor pero no tiene registro en la tabla tutors, no ve nada
                return response()->json([]);
            }
        }
        // Si es admin (o supervisor), ve todo (no aplicamos filtro extra)

        return response()->json($query->get());
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
