<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Tutorías</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
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
            color: #1a56db;
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
            background-color: #e5e7eb;
            padding: 8px;
            margin-bottom: 10px;
            border-left: 4px solid #1a56db;
        }
        .question-item {
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
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
    <div class="header">
        <h1>Tecnológico Nacional de México</h1>
        <h2>Campus Acapulco</h2>
        <h3>Reporte de Formularios de Tutoría</h3>
    </div>

    <div class="info-section">
        <div class="info-row">
            <span class="info-label">Alumno:</span> {{ $pupil->user->name }}
        </div>
        <div class="info-row">
            <span class="info-label">Correo:</span> {{ $pupil->user->email }}
        </div>
        <div class="info-row">
            <span class="info-label">Tutor Asignado:</span> {{ $pupil->tutor && $pupil->tutor->user ? $pupil->tutor->user->name : 'Sin asignar' }}
        </div>
        <div class="info-row">
            <span class="info-label">Fecha de Reporte:</span> {{ date('d/m/Y') }}
        </div>
    </div>

    @forelse($formsData as $formData)
        <div class="form-section">
            <div class="form-title">{{ $formData['form']->name }}</div>
            
            @forelse($formData['questions'] as $question)
                <div class="question-item">
                    <div class="question-text">{{ $loop->iteration }}. {{ $question->title }}</div>
                    <div class="answer-text">
                        @php
                            $answer = $formData['answers']->firstWhere('question_id', $question->id);
                        @endphp
                        {{ $answer ? $answer->name : 'Sin respuesta' }}
                    </div>
                </div>
            @empty
                <p>Este formulario no tiene preguntas.</p>
            @endforelse
        </div>
    @empty
        <p>El alumno no ha completado ningún formulario.</p>
    @endforelse

    <div class="footer">
        Generado por el Sistema de Tutorías ITA
    </div>
</body>
</html>