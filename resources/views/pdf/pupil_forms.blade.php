<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Tutorías</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 16px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            color: #1b396a;
        }
        .info-section {
            margin-bottom: 20px;
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 5px;
        }
        .info-row {
            margin-bottom: 5px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .form-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .form-title {
            font-size: 16px;
            font-weight: bold;
            background-color: #1b396a;
            color: #ffffff;
            padding: 8px;
            margin-bottom: 10px;
            border-left: 4px solid #D4D4D4;
            border-radius: 0px 50px 50px 0px;
        }
        .question-item {
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            padding-bottom: 5px;
            padding-left: 5px;
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .answer-text {
            color: #4b5563;
            font-style: italic;
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div style="text-align: right; margin-bottom: 20px; font-size: 14px;">
        @php
            $meses = ['01'=>'enero', '02'=>'febrero', '03'=>'marzo', '04'=>'abril', '05'=>'mayo', '06'=>'junio', '07'=>'julio', '08'=>'agosto', '09'=>'septiembre', '10'=>'octubre', '11'=>'noviembre', '12'=>'diciembre'];
        @endphp
        Acapulco de Juárez, Guerrero, a {{ date('d') }} de {{ $meses[date('m')] }} de {{ date('Y') }}.
    </div>

    <div class="header">
        <h1>Tecnológico Nacional de México</h1>
        <img src="{{ public_path('TecNM_assets/tecnm_logo_azul.svg') }}" alt="Logo TecNM" style="height: 80px; margin: 10px 0;">
        <h2>Campus Acapulco</h2>
        <h3>Reporte de Formularios de Tutoría</h3>
    </div>

    <div class="info-section">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 3.5cm; text-align: left; vertical-align: top;">
                    @if($pupil->user->picture)
                        @php
                            $picturePath = Str::startsWith($pupil->user->picture, ['http://', 'https://']) 
                                ? $pupil->user->picture 
                                : public_path('storage/' . $pupil->user->picture);
                        @endphp
                        <div style="width: 2.5cm; height: 3.0cm; background-image: url('{{ $picturePath }}'); background-size: cover; background-position: center top; background-repeat: no-repeat;"></div>
                    @else
                        <div style="width: 2.5cm; height: 3.0cm; background-color: #e5e7eb; border-radius: 4px; display: inline-block; text-align: center; border: 1px solid #ccc;">
                            <span style="display: block; margin-top: 45px; color: #9ca3af; font-size: 10px;">Sin foto</span>
                        </div>
                    @endif
                </td>
                <td style="vertical-align: top; padding-left: 10px;">
                    <div class="info-row">
                        <span class="info-label">Alumno:</span> {{ $pupil->user->name }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">Carrera:</span> {{ $pupil->user->major ? $pupil->user->major->name : 'Sin asignar' }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">Numero de control:</span> {{ $pupil->user->control_number ?: 'Sin asignar' }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">Correo:</span> {{ $pupil->user->email }}
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tutor Asignado:</span> {{ $pupil->tutor && $pupil->tutor->user ? $pupil->tutor->user->name : 'Sin asignar' }}
                    </div>
                </td>
            </tr>
        </table>
    </div>

    @forelse($formsData as $formData)
        <div class="form-section">
            <div class="form-title">
                <img src="{{ public_path('TecNM_assets/tecnm_logo_blanco.svg') }}" alt="Logo TecNM" style="height: 40px; float: right;">
                <h2 style="margin: 0; line-height: 40px;">
                    {{ $formData['form']->id }} .- {{ $formData['form']->name }}
                </h2>
                <div style="clear: both;"></div>
            </div>
            
            @if($formData['questions']->count() > 0)
                <table style="width: 100%; border-collapse: collapse;">
                    @php $counter = 1; @endphp
                    @foreach($formData['questions']->chunk(2) as $chunk)
                        <tr>
                            @foreach($chunk as $question)
                                <td style="width: 50%; vertical-align: top; padding-left:7px; padding-right: 7px;">
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
            @else
                <p>Este formulario no tiene preguntas.</p>
            @endif
        </div>
    @empty
        <p>El alumno no ha completado ningún formulario.</p>
    @endforelse

    <div class="footer">
        Generado por el Sistema de Tutorías ITA
    </div>
</body>
</html>