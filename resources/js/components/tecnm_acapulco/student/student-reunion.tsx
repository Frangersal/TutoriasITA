import axios from 'axios';
import React, { useEffect, useState } from 'react';

// --- Interfaces ---
interface User {
    id: number;
    name: string;
    email: string;
}

interface Tutor {
    id: number;
    user?: User;
}

interface Reunion {
    id: number;
    tutor_id: number;
    pupil_id: number;
    date_time: string;
    description: string;
    created_at: string;
    updated_at: string;
    tutor?: Tutor;
}

export default function StudentReunions() {
    // --- Estados ---
    const [reunions, setReunions] = useState<Reunion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Efectos ---
    useEffect(() => {
        fetchReunions();
    }, []);

    // --- Funciones de API ---
    const fetchReunions = async () => {
        try {
            const response = await axios.get('/student/reunions');
            setReunions(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            // Si es 404 puede ser que no tenga perfil de alumno, lo manejamos suavemente
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                setError(err.response.data.message || 'No se encontró información del alumno.');
            } else {
                setError('Error al cargar las reuniones.');
            }
            setLoading(false);
        }
    };

    // --- Renderizado ---

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando reuniones...</p>;
    if (error) return (
        <div className="rounded-lg border-2 border-red-400 bg-white p-6 text-red-600 dark:bg-sidebar-accent/10">
            {error}
        </div>
    );

    return (
        <div className="rounded-lg border-2 border-yellow-400 bg-white p-6 shadow-[inset_0_0_15px_rgba(250,204,21,0.2)] dark:border-yellow-600 dark:bg-sidebar-accent/10">
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Mis Reuniones 📅
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Aquí puedes ver las reuniones programadas con tu tutor. Asegúrate de asistir puntualmente.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reunions.map((reunion) => (
                    <div
                        key={reunion.id}
                        className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div>
                            <div className="mb-2 flex items-start justify-between">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                    Tutor: {reunion.tutor?.user?.name || 'Desconocido'}
                                </h4>
                                <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    {new Date(reunion.date_time).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                🕒 {new Date(reunion.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <div className="mt-3 rounded bg-gray-50 p-2 text-sm text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                                <span className="font-semibold">Motivo:</span> {reunion.description}
                            </div>
                        </div>
                    </div>
                ))}

                {reunions.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                        <p className="text-lg">No tienes reuniones programadas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}