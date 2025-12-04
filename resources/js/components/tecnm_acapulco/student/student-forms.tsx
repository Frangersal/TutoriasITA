import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    answer_type_id: number; // 1: Texto, 2: Opción
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
    
    // Estado para las respuestas: Mapa de question_id -> valor
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

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
            alert('Error al cargar el formulario.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedForm(null);
        setAnswers({});
        fetchForms(); // Recargar lista para actualizar estados
    };

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedForm) return;

        try {
            // Estructuramos los datos para enviar
            const payload = {
                form_id: selectedForm.id,
                answers: Object.entries(answers).map(([questionId, value]) => ({
                    question_id: Number(questionId),
                    value: value
                }))
            };

            await axios.post('/student/answers', payload);
            
            alert('Respuestas enviadas correctamente.');
            handleBack();
        } catch (err) {
            console.error(err);
            alert('Error al enviar las respuestas.');
        }
    };

    // --- Renderizado ---

    if (loading && !selectedForm) return <p className="text-gray-600 dark:text-gray-300">Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
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
                                {selectedForm.name}
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
                                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <label className="mb-3 block text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {index + 1}. {question.name}
                                </label>

                                {question.answer_type_id === 1 ? (
                                    // Texto Libre
                                    <textarea
                                        required
                                        rows={3}
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Escribe tu respuesta aquí..."
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
                                                    checked={answers[question.id] === option.name}
                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                    className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700"
                                                    required
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
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className={`flex flex-col justify-between rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md ${
                                    form.is_answered
                                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10'
                                        : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                                }`}
                            >
                                <div>
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {form.name}
                                        </h3>
                                        {form.is_answered && (
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" title="Completado">
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
                                            ? 'bg-yellow-500 hover:bg-yellow-600'
                                            : 'bg-blue-600 hover:bg-blue-700'
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
    );
}