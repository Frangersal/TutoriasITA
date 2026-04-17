<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Pupil;
use App\Models\Tutor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::with(['pupil', 'tutor'])->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'control_number' => 'nullable|string|size:8',
            'major_id' => 'nullable|integer|exists:majors,id',
            'picture' => 'nullable|image|max:5120',
            'password' => 'nullable|string|min:6|confirmed',
            'role_id' => 'nullable|integer|exists:roles,id',
            'tutor_id' => 'nullable|exists:tutors,id',
        ]);

        $update = [
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'control_number' => $data['control_number'] ?? null,
            'major_id' => $data['major_id'] ?? null,
        ];

        if ($request->hasFile('picture')) {
            if ($user->picture && \Illuminate\Support\Facades\Storage::disk('public')->exists($user->picture)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($user->picture);
            }
            $update['picture'] = $request->file('picture')->store('profiles', 'public');
        }

        if (!empty($data['password'])) {
            $update['password'] = Hash::make($data['password']);
        }

        if (isset($data['role_id'])) {
            $update['role_id'] = $data['role_id'];
        }

        $user->update($update);

        // Lógica para crear/actualizar Tutor o Pupil según el rol
        if ($user->role_id == 2) { // Tutor
            if (!$user->tutor) {
                Tutor::create([
                    'user_id' => $user->id,
                    'description' => 'Tutor generado automáticamente',
                ]);
            }
            // Si era alumno, eliminar registro de alumno
            if ($user->pupil) {
                $user->pupil->delete();
            }
        } elseif ($user->role_id == 3) { // Pupil
            Pupil::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'tutor_id' => $data['tutor_id'] ?? ($user->pupil->tutor_id ?? null),
                    'coment' => $user->pupil->coment ?? 'Alumno generado automáticamente',
                ]
            );
            // Si era tutor, eliminar registro de tutor
            if ($user->tutor) {
                $user->tutor->delete();
            }
        } else {
            // Si es Admin u otro rol, eliminar registros de tutor/alumno si existen
            if ($user->pupil) $user->pupil->delete();
            if ($user->tutor) $user->tutor->delete();
        }

        return response()->json(['message' => 'Usuario actualizado', 'user' => $user->load(['tutor', 'pupil'])]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->pupil) {
            $user->pupil->reunions()->delete();
            $user->pupil->delete();
        }
        if ($user->tutor) {
            $user->tutor->reunions()->delete();
            $user->tutor->delete();
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'control_number' => 'nullable|string|size:8',
            'major_id' => 'nullable|integer|exists:majors,id',
            'picture' => 'nullable|image|max:5120',
            'password' => 'required|string|min:6|confirmed',
            'role_id' => 'nullable|integer|exists:roles,id',
            'tutor_id' => 'nullable|exists:tutors,id',
        ]);

        $roleId = $data['role_id'] ?? 3; // <-- default a 3

        $createData = [
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'control_number' => $data['control_number'] ?? null,
            'major_id' => $data['major_id'] ?? null,
            'password' => Hash::make($data['password']),
            'role_id' => $roleId,
        ];

        if ($request->hasFile('picture')) {
            $createData['picture'] = $request->file('picture')->store('profiles', 'public');
        }

        $user = User::create($createData);

        // Lógica para crear Tutor o Pupil según el rol
        if ($roleId == 2) { // Tutor
            Tutor::create([
                'user_id' => $user->id,
                'description' => 'Tutor generado automáticamente',
            ]);
        } elseif ($roleId == 3) { // Pupil
            Pupil::create([
                'user_id' => $user->id,
                'tutor_id' => $data['tutor_id'] ?? null,
                'coment' => 'Alumno generado automáticamente',
            ]);
        }

        return response()->json(['message' => 'Usuario creado', 'user' => $user->load(['tutor', 'pupil'])], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user);
    }
}
