import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

// --- Interfaces ---
interface Option {
    id: number;
    name: string;
    question_id: number;
}

interface Answer {
    id: number;
    question_id: number;
    answer: string; // Texto o ID de opción como string
}

interface Question {
    id: number;
    name: string;
    form_id: number;
    answer_type_id: number; // 100: Texto, 200: Texto Opcional, 300: Opción, 350: Opción Opcional
    options?: Option[];
    user_answer?: Answer | null; // Respuesta previa del usuario si existe
}

interface Form {
    id: number;
    name: string;
    description: string;
    is_answered?: boolean; // Indica si el formulario ya fue completado
    questions?: Question[];
}

export default function StudentForms() {
    // --- Estados ---
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para el formulario seleccionado (Vista de Responder)
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);
    
    // Estado para las respuestas: Mapa de question_id -> valor (string o File)
    const [answers, setAnswers] = useState<{ [key: number]: any }>({});

    // Estado para mostrar validaciones de la pregunta con diseño de Tailwind
    const [formSubmitError, setFormSubmitError] = useState<{ questionId: number, message: string } | null>(null);

    // Estado de notificación global parecido al de profile
    const [notification, setNotification] = useState<{ show: boolean, type: 'success' | 'info' | 'error', message: string } | null>(null);

    const showNotification = (type: 'success' | 'info' | 'error', message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification(prev => prev ? { ...prev, show: false } : null);
        }, 6000);
    };

    // --- Efectos ---
    useEffect(() => {
        fetchForms();
    }, []);

    // --- Funciones de API ---

    const fetchForms = async () => {
        try {
            const response = await axios.get('/student/forms');
            setForms(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los formularios.');
            setLoading(false);
        }
    };

    const handleSelectForm = async (formId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/student/forms/${formId}`);
            const form: Form = response.data;
            
            setSelectedForm(form);
            
            // Pre-cargar respuestas si existen
            const initialAnswers: { [key: number]: string } = {};
            form.questions?.forEach(q => {
                if (q.user_answer) {
                    initialAnswers[q.id] = q.user_answer.answer;
                }
            });
            setAnswers(initialAnswers);
            
            // Scroll arriba para la animación
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            showNotification('error', 'Error al cargar el formulario.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedForm(null);
        setAnswers({});
        setFormSubmitError(null);
        fetchForms(); // Recargar lista para actualizar estados
    };

    const handleAnswerChange = (questionId: number, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedForm) return;

        // Reiniciar cualquier error previo
        setFormSubmitError(null);

        // Validación para evitar números que comiencen con 0 (ignorando decimales como 0.5 o el número 0 solo)
        let invalidZeroQuestion: { id: number, name: string } | null = null;
        selectedForm.questions?.forEach(q => {
            if ([501, 502].includes(q.answer_type_id) && !invalidZeroQuestion) {
                const val = (answers[q.id] === undefined || answers[q.id] === null) ? '' : String(answers[q.id]);
                if (val !== '' && val !== 'Sin respuesta') {
                    if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
                        invalidZeroQuestion = { id: q.id, name: q.name };
                    }
                }
            }
        });

        const errorQuestion = invalidZeroQuestion as { id: number, name: string } | null;

        if (errorQuestion) {
            setFormSubmitError({
                questionId: errorQuestion.id,
                message: `El número de esta pregunta no puede comenzar con 0.`
            });
            // Scroll a la pregunta específica
            setTimeout(() => {
                document.getElementById(`question-${errorQuestion.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);
            return;
        }

        try {
            // Verificar si hay algún archivo para enviar como multipart/form-data
            const hasFiles = selectedForm.questions?.some(q => answers[q.id] instanceof File);

            if (hasFiles) {
                const formData = new FormData();
                formData.append('form_id', String(selectedForm.id));
                // Para Laravel, simular PUT si el formulario ya ha sido respondido
                if (selectedForm.is_answered) {
                    formData.append('_method', 'PUT');
                }

                selectedForm.questions?.forEach((q, i) => {
                    const val = answers[q.id];
                    formData.append(`answers[${i}][question_id]`, String(q.id));
                    
                    if (val instanceof File) {
                        formData.append(`answers[${i}][value]`, 'file_attached'); // Un indicador para el backend
                        formData.append(`answers[${i}][file]`, val);
                    } else {
                        const finalVal = val && String(val).trim() !== '' && String(val).trim() !== 'Sin respuesta' ? String(val) : 'Sin respuesta';
                        formData.append(`answers[${i}][value]`, finalVal);
                    }
                });

                // Si es actualización, enviamos al endpoint de 'answers' o 'answers/form_id'? 
                // En el original se usa always POST para ambas pero luego en update...
                // Espera, el original SIEMPRE usaba POST a '/student/answers'. Y el controller hacía updateOrCreate.
                await axios.post('/student/answers', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Estructuramos los datos para enviar normalmente en JSON
                const payload = {
                    form_id: selectedForm.id,
                    answers: selectedForm.questions?.map(q => {
                        const val = answers[q.id];
                        return {
                            question_id: q.id,
                            value: val && String(val).trim() !== '' && String(val).trim() !== 'Sin respuesta' ? String(val) : 'Sin respuesta'
                        };
                    }) || []
                };

                await axios.post('/student/answers', payload);
            }
            
            showNotification(
                selectedForm.is_answered ? 'info' : 'success',
                selectedForm.is_answered ? 'Respuestas editadas correctamente.' : 'Respuestas enviadas correctamente.'
            );
            handleBack();
        } catch (err) {
            console.error(err);
            showNotification('error', 'Error al enviar las respuestas.');
        }
    };

    // --- Renderizado ---

    if (loading && !selectedForm) return <p className="text-gray-600 dark:text-gray-300">Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-6">
            {/* Notificaciones (Flotante absoluto arriba) */}
            {notification && (
                <div className="fixed right-6 top-20 z-[100] w-full max-w-sm px-4 shadow-2xl">
                    <Transition
                        show={notification.show}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-y-[-10px]"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-300"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-[-10px]"
                    >
                        <div className={`rounded-md border-l-4 p-4 shadow-sm ${
                            notification.type === 'success' ? 'border-green-500 bg-green-100 dark:bg-green-900/50' :
                            notification.type === 'info' ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/50' :
                            'border-red-500 bg-red-100 dark:bg-red-900/50'
                        }`}>
                            <div className="flex">
                                <div className="shrink-0">
                                    {notification.type === 'success' && (
                                        <svg className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {notification.type === 'info' && (
                                        <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {notification.type === 'error' && (
                                        <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${
                                        notification.type === 'success' ? 'text-green-800 dark:text-green-200' :
                                        notification.type === 'info' ? 'text-blue-800 dark:text-blue-200' :
                                        'text-red-800 dark:text-red-200'
                                    }`}>
                                        {notification.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            )}

            <div className="rounded-lg border-2 border-yellow-400 bg-white p-6 shadow-[inset_0_0_15px_rgba(250,204,21,0.2)] dark:border-yellow-600 dark:bg-sidebar-accent/10">
                <style>{`
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-slide-in {
                        opacity: 0;
                        animation: slideIn 0.3s ease-out forwards;
                    }
                `}</style>

                {/* Pestañas de Navegación */}
            <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleBack}
                    className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        !selectedForm
                            ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400'
                            : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    Formularios
                </button>
                <button
                    disabled={!selectedForm}
                    className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        selectedForm
                            ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400'
                            : 'cursor-default border-transparent text-gray-300 dark:text-gray-600'
                    }`}
                >
                    Preguntas
                </button>
            </div>

            {/* Vista: Preguntas Formulario */}
            {selectedForm ? (
                <div className="animate-slide-in">
                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                        <div>
                            <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
                                Preguntas
                            </h1>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {selectedForm.id} .- {selectedForm.name}
                            </h2>
                            <p className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                {selectedForm.description}
                            </p>
                        </div>
                        {/* <button
                            onClick={handleBack}
                            className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                        >
                            Volver
                        </button> */}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {selectedForm.questions?.map((question, index) => (
                            <div 
                                key={question.id}
                                id={`question-${question.id}`}
                                className={`transition-all duration-300 rounded-lg border p-4 ${
                                    formSubmitError?.questionId === question.id
                                        ? 'border-red-400 bg-red-50/50 ring-2 ring-red-400/50 dark:border-red-500/50 dark:bg-red-900/10'
                                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                                }`}
                            >
                                {formSubmitError?.questionId === question.id && (
                                    <div className="mb-4 rounded-md border-l-4 border-red-500 bg-red-100 p-3 text-red-800 shadow-sm dark:bg-red-900/50 dark:text-red-200 animate-slide-in">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <svg className="mr-3 h-5 w-5 shrink-0 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium text-sm">{formSubmitError.message}</span>
                                            </div>
                                            <button onClick={() => setFormSubmitError(null)} type="button" className="ml-4 shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                    <label className="mb-3 block text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {index + 1}. {question.name} {![100, 300, 501, 502, 503].includes(question.answer_type_id) && <span className="text-sm font-normal text-gray-500">(Opcional)</span>}
                                </label>

                                {[100, 200].includes(question.answer_type_id) ? (
                                    // Texto Libre
                                    <textarea
                                        required={question.answer_type_id === 100}
                                        rows={3}
                                        value={(answers[question.id] === 'Sin respuesta' ? '' : answers[question.id]) || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Escribe tu respuesta aquí..."
                                    />
                                ) : [501, 502].includes(question.answer_type_id) ? (
                                    // Números
                                    <input
                                        type="text"
                                        inputMode={question.answer_type_id === 502 ? "decimal" : "numeric"}
                                        maxLength={16}
                                        required
                                        value={(answers[question.id] === 'Sin respuesta' ? '' : answers[question.id]) || ''}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '') {
                                                handleAnswerChange(question.id, '');
                                                return;
                                            }
                                            
                                            // Validar longitud y formato según el tipo
                                            if (question.answer_type_id === 501) {
                                                // Enteros: Solo números, máx 16 caracteres
                                                if (/^\d*$/.test(val) && val.length <= 16) {
                                                    handleAnswerChange(question.id, val);
                                                }
                                            } else if (question.answer_type_id === 502) {
                                                // Decimales: Números con un punto, máx 2 decimales, máx 16 caracteres en total
                                                if (/^\d*\.?\d{0,2}$/.test(val) && val.length <= 16) {
                                                    handleAnswerChange(question.id, val);
                                                }
                                            }
                                        }}
                                        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder={`Ingresa un número ${question.answer_type_id === 502 ? 'decimal' : 'entero'}...`}
                                    />
                                ) : [503, 553].includes(question.answer_type_id) ? (
                                    // Fecha
                                    <input
                                        type="date"
                                        required={question.answer_type_id === 503}
                                        value={(answers[question.id] === 'Sin respuesta' ? '' : answers[question.id]) || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                ) : (
                                    // Opciones
                                    <div className="space-y-2">
                                        {question.options?.map((option) => (
                                            <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={option.name} // O option.id si el backend espera ID
                                                    checked={answers[question.id] === option.name && answers[question.id] !== 'Sin respuesta'}
                                                    onClick={(e) => {
                                                        // Permite desmarcar si es opcional (no requerido)
                                                        if (question.answer_type_id !== 300 && answers[question.id] === option.name) {
                                                            handleAnswerChange(question.id, 'Sin respuesta');
                                                        }
                                                    }}
                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                    className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700"
                                                    required={question.answer_type_id === 300}
                                                />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {option.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="cursor-pointer rounded bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-green-700 transition-colors"
                            >
                                {selectedForm.is_answered ? 'Actualizar Respuestas' : 'Enviar Respuestas'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* Vista: Lista de Formularios */
                <div>
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Formularios
                        </h1>
                        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                            <p>
                                En esta sección usted, estudiante, podrá ir llenando cada uno de los formularios establecidos por el Tecnológico Nacional de México Campus Acapulco.
                            </p>
                            <p>
                                Como puede ver cada formulario tiene el botón de ‘Responder’, esto lo llevará a la pestaña de ‘Preguntas’ sección donde usted podrá llenar el formulario leyendo con atención y respondiendo con franqueza cada una de las preguntas, al final dará click al botón ‘Enviar Respuestas’ y listo. Hará esto con todos los formularios hasta que cada uno tenga una palomita verde que indicara que ha sido llenado.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form, index) => (
                            <div
                                key={form.id}
                                className={`flex flex-col justify-between rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md ${
                                    form.is_answered
                                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10'
                                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10'
                                }`}
                            >
                                <div>
                                    <div className="mb-4 flex items-start justify-between gap-2">
                                        <div className="flex items-start gap-3">
                                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                                                form.is_answered
                                                    ? 'bg-white/80 text-green-700 ring-1 ring-green-600/20 dark:bg-green-800 dark:text-green-100'
                                                    : 'bg-white/80 text-red-700 ring-1 ring-red-600/20 dark:bg-red-800 dark:text-red-100'
                                            }`}>
                                                {index + 1}
                                            </span>
                                            <h3 className="mt-0.5 text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100">
                                                {form.name}
                                            </h3>
                                        </div>
                                        {form.is_answered && (
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" title="Completado">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                        {form.description}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={() => handleSelectForm(form.id)}
                                    className={`mt-auto w-full cursor-pointer rounded px-4 py-2 text-center font-medium text-white transition-colors ${
                                        form.is_answered
                                            ? 'bg-gray-500 hover:bg-gray-600'
                                            : 'bg-red-900 hover:bg-red-950'
                                    }`}
                                >
                                    {form.is_answered ? 'Editar Respuestas' : 'Responder'}
                                </button>
                            </div>
                        ))}
                        
                        {forms.length === 0 && (
                            <p className="col-span-full py-8 text-center text-gray-500">
                                No hay formularios disponibles en este momento.
                            </p>
                        )}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}