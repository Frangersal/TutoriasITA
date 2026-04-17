import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';

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
    const [reunionToDelete, setReunionToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        pupil_id: '' as string | number,
        date_time: '',
        description: ''
    });

    // --- Alertas ---
    const [alertMsg, setAlertMsg] = useState({ show: false, type: 'success', message: '' });

    const showAlert = (message: string, type: 'success' | 'info' | 'danger') => {
        setAlertMsg({ show: true, type, message });
        setTimeout(() => {
            setAlertMsg(prev => ({ ...prev, show: false }));
        }, 6000);
    };

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

    const handleDelete = (id: number) => {
        setReunionToDelete(id);
    };

    const executeDelete = async () => {
        if (!reunionToDelete) return;
        try {
            await axios.delete(`/tutor/reunion/${reunionToDelete}`);
            setReunions(reunions.filter(r => r.id !== reunionToDelete));
            showAlert('Reunión ha sido eliminada con éxito', 'danger');
        } catch (err) {
            showAlert('Error al cancelar la reunión.', 'danger');
        } finally {
            setReunionToDelete(null);
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
                showAlert('Reunión ha sido modificada con éxito', 'info');
            } else {
                const response = await axios.post('/tutor/reunion', formData);
                setReunions([response.data.reunion, ...reunions]);
                showAlert('Reunión ha sido creada con éxito', 'success');
            }
            handleCancel();
        } catch (err) {
            console.error(err);
            showAlert('Error al guardar la reunión.', 'danger');
        }
    };

    // --- Render ---

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando reuniones...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="rounded-lg border-2 border-blue-400 bg-white p-6 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] dark:border-blue-600 dark:bg-sidebar-accent/10">
            <style>{`
                @keyframes expand {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-expand {
                    animation: expand 0.3s ease-out forwards;
                }
                .animate-slide-in {
                    opacity: 0;
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}</style>

            {/* Modal de Confirmación para Cancelar Reunión */}
            {reunionToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-expand">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Cancelar Reunión</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            ¿Estás seguro de cancelar esta reunión? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setReunionToDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 cursor-pointer"
                            >
                                No, mantener
                            </button>
                            <button
                                onClick={executeDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                            >
                                Sí, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                    className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors shadow"
                >
                    Agendar Reunión
                </button>
            </div>

            {/* Alertas */}
            <Transition
                show={alertMsg.show}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-[-10px]"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[-10px]"
            >
                <div className={`fixed top-20 right-6 z-50 min-w-[300px] rounded-md border-l-4 p-4 shadow-md transition-colors duration-300 ${
                    alertMsg.type === 'success' ? 'border-green-500 bg-green-100 dark:bg-green-900/50' : 
                    alertMsg.type === 'info' ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/50' :
                    'border-red-500 bg-red-100 dark:bg-red-900/50'
                }`} role="alert">
                    <div className="flex items-center">
                        <div className="shrink-0 flex items-center">
                            {alertMsg.type === 'success' && (
                                <svg className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                            {alertMsg.type === 'info' && (
                                <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            )}
                            {alertMsg.type === 'danger' && (
                                <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className={`text-sm font-medium ${
                                alertMsg.type === 'success' ? 'text-green-800 dark:text-green-200' :
                                alertMsg.type === 'info' ? 'text-blue-800 dark:text-blue-200' :
                                'text-red-800 dark:text-red-200'
                            }`}>
                                {alertMsg.message}
                            </p>
                        </div>
                        <button type="button" onClick={() => setAlertMsg(prev => ({ ...prev, show: false }))} className={`ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 hover:bg-black/10 inline-flex items-center justify-center h-8 w-8 cursor-pointer transition-colors ${
                            alertMsg.type === 'success' ? 'text-green-500 dark:text-green-400' : alertMsg.type === 'danger' ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'
                        }`}>
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>

            {/* Formulario */}
            {(creatingReunion || editingReunion) && (
                <div className={`mb-8 animate-slide-in rounded-lg border p-4 ${editingReunion ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'}`}>
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
                                className={`cursor-pointer rounded px-4 py-2 text-white shadow transition-colors ${editingReunion ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
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
