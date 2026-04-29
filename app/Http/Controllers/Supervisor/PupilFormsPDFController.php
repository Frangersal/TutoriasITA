<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pupil;
use App\Models\FormUser;
use App\Models\Answer;
use Barryvdh\DomPDF\Facade\Pdf;

class PupilFormsPDFController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pupil = Pupil::with(['user.major', 'tutor.user'])->findOrFail($id);
        
        // Obtener formularios completados por el usuario asociado al alumno
        $completedForms = FormUser::with(['form.questions'])
            ->where('user_id', $pupil->user_id)
            ->get();

        $formsData = [];
        
        foreach ($completedForms as $formUser) {
            // Obtener respuestas para este formulario específico
            $answers = Answer::where('user_id', $pupil->user_id)
                ->whereIn('question_id', $formUser->form->questions->pluck('id'))
                ->get();
                
            $formsData[] = [
                'form' => $formUser->form,
                'questions' => $formUser->form->questions,
                'answers' => $answers
            ];
        }


        //---------------

        $pdf = Pdf::loadView('pdf.pupil_forms', compact('pupil', 'formsData'))->setPaper('letter');
        
        // Limpiar el nombre del archivo para evitar caracteres inválidos
        $filename = 'tutorias_' . preg_replace('/[^A-Za-z0-9\-]/', '_', $pupil->user->name) . '.pdf';
        
        //Despues de terminar de editar el PDF debo descomentar download y comentar stream
        return $pdf->download($filename);
        //return $pdf->stream($filename);

        //----------------

        //return view('pdf.pupil_forms', compact('pupil', 'formsData'));
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
