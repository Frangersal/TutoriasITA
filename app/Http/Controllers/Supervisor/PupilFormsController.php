<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pupil;
use App\Models\FormUser;
use App\Models\Answer;

class PupilFormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pupilId = $request->input('pupil_id');
        
        if (!$pupilId) {
            return response()->json(['error' => 'Pupil ID is required'], 400);
        }

        $pupil = Pupil::with('user')->findOrFail($pupilId);
        
        $formUsers = FormUser::with('form')
            ->where('user_id', $pupil->user_id)
            ->get();
            
        return response()->json([
            'pupil' => $pupil,
            'formUsers' => $formUsers
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formUser = FormUser::with(['form.questions', 'user.pupil'])->findOrFail($id);
        
        $answers = Answer::where('user_id', $formUser->user_id)
            ->whereIn('question_id', $formUser->form->questions->pluck('id'))
            ->get();
            
        return response()->json([
            'formUser' => $formUser,
            'answers' => $answers
        ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
