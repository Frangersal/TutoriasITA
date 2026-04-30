<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Tutorías</title>
    <style>
        {!! file_get_contents(public_path('css/pdf_pupil_forms.css')) !!}
    </style>
</head>
<body>
    <header>
        <table class="top-header-table">
            <tr>
                <td class="td-header-left">
                    <img src="{{ public_path('TecNM_assets/sep.png') }}" class="header-img-sep" alt="Logo SEP">
                    <!-- 
                    <img src="{{ public_path('TecNM_assets/logo_horizontal_tecnm_azul.png') }}" class="header-img-tecnm" alt="Logo TecNM">
                    -->
                </td>
                <td class="td-header-right">
                    <img src="{{ public_path('TecNM_assets/mujer-bandera.png') }}" class="header-img-bandera" alt="Mujer Bandera"><br>
                    <!-- 
                    <span class="header-text-bandera">Tecnológico Nacional de México campus Acapulco</span>
                    -->
                </td>
            </tr>
        </table>
    </header>

    <div class="text-right mb-20 font-14">
        @php
            $meses = ['01'=>'enero', '02'=>'febrero', '03'=>'marzo', '04'=>'abril', '05'=>'mayo', '06'=>'junio', '07'=>'julio', '08'=>'agosto', '09'=>'septiembre', '10'=>'octubre', '11'=>'noviembre', '12'=>'diciembre'];
        @endphp
        Acapulco de Juárez, Guerrero, {{ date('d') }}/{{ $meses[date('m')] }}/{{ date('Y') }}
    </div>

    <div class="header">
        <!--
        <h1>Tecnológico Nacional de México</h1>
        <h2>Campus Acapulco</h2>
        -->
        <h3>Reporte de Formularios de Tutoría</h3>
    </div>

    <div class="info-section">
        <table class="info-table">
            <tr>
                <td class="td-photo">
                    @if($pupil->user->picture)
                        @php
                            $picturePath = Str::startsWith($pupil->user->picture, ['http://', 'https://']) 
                                ? $pupil->user->picture 
                                : public_path('storage/' . $pupil->user->picture);
                        @endphp
                        <div class="photo-container" style="background-image: url('{{ $picturePath }}');"></div>
                    @else
                        <div class="no-photo-container">
                            <span class="no-photo-text">Sin foto</span>
                        </div>
                    @endif
                </td>
                <td class="td-info">
                    <div class="info-row">
                        <span class="info-label">ALUMNO:</span> {{ $pupil->user->name }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">CARRERA:</span> {{ $pupil->user->major ? $pupil->user->major->name : 'Sin asignar' }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">NUMERO DE CONTROL:</span> {{ $pupil->user->control_number ?: 'Sin asignar' }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">CORREO:</span> {{ $pupil->user->email }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">TUTOR:</span> {{ $pupil->tutor && $pupil->tutor->user ? $pupil->tutor->user->name : 'Sin asignar' }}
                    </div>
                </td>
            </tr>
        </table>
    </div>

    @forelse($formsData as $formData)
        @if($loop->first)
            <div class="page-break-before"></div>
        @endif
        <div class="form-section">
            <div class="page-break-avoid">
                <div class="form-title form-title-padding">
                    <table class="form-title-table">
                        <tr>
                            <td class="align-middle">
                                <h2 class="form-title-h2">
                                    {{ $formData['form']->id }} .- {{ $formData['form']->name }}
                                </h2>
                            </td>
                            <td class="form-title-logo-td">
                                <img src="{{ public_path('TecNM_assets/tecnm_logo_blanco.png') }}" alt="Logo TecNM" class="logo-blanco">
                            </td>
                        </tr>
                    </table>
                </div>
                
                @if($formData['form']->description)
                    <div class="form-description">
                        {{ $formData['form']->description }}
                    </div>
                @endif
                
                @if($formData['questions']->count() > 0)
                    @php 
                        $counter = 1; 
                        $chunks = $formData['questions']->chunk(2);
                        $firstChunks = $chunks->take(3);
                        $remainingChunks = $chunks->skip(3);
                    @endphp
                    <table class="questions-table">
                        @foreach($firstChunks as $chunk)
                            <tr>
                                @foreach($chunk as $question)
                                    <td class="td-question">
                                        <div class="question-item">
                                            <div class="question-text">{{ $counter++ }}.- {{ $question->name }}:</div>
                                            <div class="answer-text">
                                                @php
                                                    $answer = $formData['answers']->firstWhere('question_id', $question->id);
                                                @endphp
                                                {{ $answer ? $answer->name : 'Sin respuesta' }}
                                            </div>
                                        </div>
                                    </td>
                                @endforeach
                                @if($chunk->count() == 1)
                                    <td style="width: 50%;"></td>
                                @endif
                            </tr>
                        @endforeach
                    </table>
            </div>

            @if($remainingChunks->count() > 0)
                <table class="questions-table">
                    @foreach($remainingChunks as $chunk)
                        <tr class="page-break-avoid">
                            @foreach($chunk as $question)
                                <td class="td-question">
                                    <div class="question-item">
                                        <div class="question-text">{{ $counter++ }}.- {{ $question->name }}:</div>
                                        <div class="answer-text">
                                            @php
                                                $answer = $formData['answers']->firstWhere('question_id', $question->id);
                                            @endphp
                                            {{ $answer ? $answer->name : 'Sin respuesta' }}
                                        </div>
                                    </div>
                                </td>
                            @endforeach
                            @if($chunk->count() == 1)
                                <td style="width: 50%;"></td>
                            @endif
                        </tr>
                    @endforeach
                </table>
            @endif
            @else
                <p>Este formulario no tiene preguntas.</p>
            </div>
            @endif
        </div>
    @empty
        <p>El alumno no ha completado ningún formulario.</p>
    @endforelse

    <div class="footer">
        <div class="page-number"></div>
        <!--
        Avenida Instituto Tecnológico km. 6.5, s/n, Col. El Cayaco. C.P. 39905 Acapulco de Juárez,<br>
        Guerrero. Tel. (744) 4429010 ext. 101 e-mail: dir_acapulco@tecnm.mx <br>
        https://acapulco.tecnm.mx/
        -->
    </div>
</body>
</html>