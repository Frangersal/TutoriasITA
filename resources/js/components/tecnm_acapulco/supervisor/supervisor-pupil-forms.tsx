import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
    id: number;
    name: string;
    question_id: number;
}

interface Answer {
    id: number;
    question_id: number;
    name?: string;
    answer?: string;
}

interface Question {
    id: number;
    name: string;
    form_id: number;
    answer_type_id: number;
    options?: Option[];
    user_answer?: Answer | null;
}

interface Form {
    id: number;
    name: string;
    description: string;
    questions?: Question[];
}

interface FormUser {
    id: number;
    form_id: number;
    user_id: number;
    is_answered: boolean;
    form: Form;
}

interface Pupil {
    id: number;
    user: {
        name: string;
        email: string;
    };
    tutor?: {
        user?: {
            name: string;
        };
    };
}

interface SupervisorPupilFormsProps {
    pupilId: number;
}

export function SupervisorPupilForms({ pupilId }: SupervisorPupilFormsProps) {
    const [pupil, setPupil] = useState<Pupil | null>(null);
    const [formUsers, setFormUsers] = useState<FormUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFormUser, setSelectedFormUser] = useState<FormUser | null>(null);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (pupilId) {
            fetchData();
        }
    }, [pupilId]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/supervisor/pupil/forms', {
                params: { pupil_id: pupilId }
            });
            setPupil(response.data.pupil);
            setFormUsers(response.data.formUsers);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar la información del alumno.');
            setLoading(false);
        }
    };

    const handleSelectForm = async (formUserId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/supervisor/pupil/forms/${formUserId}`);
            const data = response.data;
            
            const formUser: FormUser = data.formUser;
            const fetchedAnswers: Answer[] = data.answers;

            setSelectedFormUser(formUser);
            
            const answersMap: { [key: number]: string } = {};
            fetchedAnswers.forEach(a => {
                answersMap[a.question_id] = a.name || a.answer || '';
            });
            setAnswers(answersMap);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            alert('Error al cargar el formulario.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedFormUser(null);
        setAnswers({});
    };

    if (loading && !selectedFormUser) return <p className="text-gray-600 dark:text-gray-300">Cargando...</p>;
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

            {/* Botón Volver */}
            <div className="mb-4">
                <button
                    onClick={() => window.location.href = '/dashboard?view=pupils'}
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver a la lista de alumnos
                </button>
            </div>

            {/* Header with Pupil Info */}
            <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Expediente del Alumno
                </h1>
                {pupil && (
                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Alumno</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{pupil.user?.name || 'Sin nombre'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{pupil.user?.email || 'Sin correo'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tutor Asignado</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {pupil.tutor?.user?.name ?? 'Sin asignar'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleBack}
                    className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        !selectedFormUser
                            ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400'
                            : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    Formularios
                </button>
                <button
                    disabled={!selectedFormUser}
                    className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        selectedFormUser
                            ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400'
                            : 'cursor-default border-transparent text-gray-300 dark:text-gray-600'
                    }`}
                >
                    Respuestas
                </button>
            </div>

            {selectedFormUser ? (
                <div className="animate-slide-in">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {selectedFormUser.form.name}
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                            {selectedFormUser.form.description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {selectedFormUser.form.questions?.map((question, index) => (
                            <div 
                                key={question.id} 
                                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <label className="mb-3 block text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {index + 1}. {question.name}
                                </label>

                                {question.answer_type_id === 1 ? (
                                    <div className="w-full rounded-md border border-gray-300 p-3 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        {answers[question.id] || <span className="text-gray-400 italic">Sin respuesta</span>}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {question.options?.map((option) => (
                                            <div key={option.id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    disabled
                                                    checked={answers[question.id] === option.name || answers[question.id] === String(option.id)}
                                                    className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700"
                                                />
                                                <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {option.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {formUsers.map((formUser) => (
                        <div
                            key={formUser.id}
                            className={`flex flex-col justify-between rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md ${
                                formUser.is_answered
                                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10'
                                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10'
                            }`}
                        >
                            <div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {formUser.form.name}
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                    {formUser.form.description}
                                </p>
                                <div className="mb-4 flex items-center">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        formUser.is_answered
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                        {formUser.is_answered ? 'Completado' : 'Pendiente'}
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => handleSelectForm(formUser.id)}
                                disabled={!formUser.is_answered}
                                className={`mt-auto w-full cursor-pointer rounded px-4 py-2 text-center font-medium text-white transition-colors ${
                                    formUser.is_answered
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {formUser.is_answered ? 'Ver Respuestas' : 'No disponible'}
                            </button>
                        </div>
                    ))}
                    
                    {formUsers.length === 0 && (
                        <p className="col-span-full py-8 text-center text-gray-500">
                            Este alumno no tiene formularios asignados.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
