import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- Interfaces ---
interface User {
    id: number;
    name: string;
    email: string;
}

interface Pupil {
    id: number;
    user_id: number;
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
    pupil?: Pupil;
}

export default function TutorReunions() {
    // --- Estados ---
    const [reunions, setReunions] = useState<Reunion[]>([]);
    const [pupils, setPupils] = useState<Pupil[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Estados CRUD ---
    const [editingReunion, setEditingReunion] = useState<Reunion | null>(null);
    const [creatingReunion, setCreatingReunion] = useState(false);
    const [formData, setFormData] = useState({
        pupil_id: '' as string | number,
        date_time: '',
        description: ''
    });

    // --- Efectos ---
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/tutor/reunion');
            // El controlador devuelve { reunions: [], pupils: [] }
            setReunions(response.data.reunions);
            setPupils(response.data.pupils);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar datos.');
            setLoading(false);
        }
    };

    // --- Handlers ---

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de cancelar esta reunión?')) return;
        try {
            await axios.delete(`/tutor/reunion/${id}`);
            setReunions(reunions.filter(r => r.id !== id));
        } catch (err) {
            alert('Error al eliminar la reunión.');
        }
    };

    const handleEdit = (reunion: Reunion) => {
        setEditingReunion(reunion);
        setCreatingReunion(false);
        // Formatear fecha para input datetime-local (YYYY-MM-DDTHH:mm)
        const date = new Date(reunion.date_time);
        // Ajustar a zona horaria local para el input
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);

        setFormData({
            pupil_id: reunion.pupil_id,
            date_time: localISOTime,
            description: reunion.description
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreate = () => {
        setCreatingReunion(true);
        setEditingReunion(null);
        setFormData({
            pupil_id: '',
            date_time: '',
            description: ''
        });
    };

    const handleCancel = () => {
        setEditingReunion(null);
        setCreatingReunion(false);
        setFormData({ pupil_id: '', date_time: '', description: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingReunion) {
                const response = await axios.put(`/tutor/reunion/${editingReunion.id}`, formData);
                setReunions(reunions.map(r => (r.id === editingReunion.id ? response.data.reunion : r)));
                alert('Reunión actualizada correctamente.');
            } else {
                const response = await axios.post('/tutor/reunion', formData);
                setReunions([response.data.reunion, ...reunions]);
                alert('Reunión agendada correctamente.');
            }
            handleCancel();
        } catch (err) {
            console.error(err);
            alert('Error al guardar la reunión.');
        }
    };

    // --- Render ---

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando reuniones...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="rounded-lg border-2 border-blue-400 bg-white p-6 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] dark:border-blue-600 dark:bg-sidebar-accent/10">
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

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Gestión de Reuniones 📅
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Administra las reuniones con tus alumnos asignados.
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors shadow"
                >
                    Agendar Reunión
                </button>
            </div>

            {/* Formulario */}
            {(creatingReunion || editingReunion) && (
                <div className="mb-8 animate-slide-in rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {editingReunion ? 'Editar Reunión' : 'Nueva Reunión'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alumno</label>
                            <select
                                value={formData.pupil_id}
                                onChange={(e) => setFormData({ ...formData, pupil_id: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            >
                                <option value="">-- Seleccionar Alumno --</option>
                                {pupils.map((pupil) => (
                                    <option key={pupil.id} value={pupil.id}>
                                        {pupil.user?.name || `Alumno #${pupil.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha y Hora</label>
                            <input
                                type="datetime-local"
                                value={formData.date_time}
                                onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción / Motivo</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                rows={3}
                                required
                                placeholder="Detalles de la reunión..."
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors shadow"
                            >
                                {editingReunion ? 'Actualizar' : 'Agendar'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de Reuniones */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reunions.map((reunion) => (
                    <div
                        key={reunion.id}
                        className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div>
                            <div className="mb-2 flex items-start justify-between">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                    {reunion.pupil?.user?.name || 'Alumno desconocido'}
                                </h4>
                                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {new Date(reunion.date_time).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                🕒 {new Date(reunion.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                {reunion.description}
                            </p>
                        </div>

                        <div className="mt-auto flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                            <button
                                onClick={() => handleEdit(reunion)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(reunion.id)}
                                className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ))}

                {reunions.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                        <p className="text-lg">No hay reuniones programadas.</p>
                        <p className="text-sm">Utiliza el botón "Agendar Reunión" para crear una nueva.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
