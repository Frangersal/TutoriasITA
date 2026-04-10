import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Pupil {
    id: number;
    coment: string | null;
    user_id: number;
    tutor_id: number | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
    tutor?: {
        id: number;
        user?: {
            name: string;
        };
    };
}

export function SupervisorPupils() {
    const [pupils, setPupils] = useState<Pupil[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPupils();
    }, []);

    const fetchPupils = async () => {
        try {
            const response = await axios.get('/supervisor/pupils');
            setPupils(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar la lista de alumnos');
            setLoading(false);
        }
    };

    // Filtrado
    const filteredPupils = pupils.filter(pupil => {
        const searchLower = searchTerm.toLowerCase();
        const userName = pupil.user?.name || '';
        const userEmail = pupil.user?.email || '';
        const tutorName = pupil.tutor?.user?.name || '';

        return (
            userName.toLowerCase().includes(searchLower) ||
            userEmail.toLowerCase().includes(searchLower) ||
            tutorName.toLowerCase().includes(searchLower)
        );
    });

    // Paginación lógica
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPupils.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPupils.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDownloadPdf = (pupilId: number) => {
        // Redirigir a la ruta de descarga del PDF
        window.location.href = `/supervisor/pupil/forms/pdf/${pupilId}`;
    };

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando alumnos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white dark:bg-sidebar-accent/10 rounded-lg shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] border-2 border-blue-400 dark:border-blue-600">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Gestión de Alumnos 🎓
                </h1>
            </div>

            {/* Barra de Búsqueda */}
            <div className="mb-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Buscar alumno por nombre, correo o tutor..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear página al buscar
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCurrentPage(1);
                            }}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Correo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tutor Asignado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-sidebar-accent/5 divide-y divide-gray-200 dark:divide-gray-700">
                        {currentItems.length > 0 ? (
                            currentItems.map((pupil) => (
                                <tr key={pupil.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pupil.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pupil.user?.name || 'Sin Nombre'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pupil.user?.email || 'Sin Correo'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pupil.tutor?.user?.name || (
                                            <span className="italic text-gray-400">Sin asignar</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-3">
                                        <button
                                            onClick={() => window.location.href = `/dashboard?view=pupil-forms&pupil_id=${pupil.id}`}
                                            className="flex items-center gap-1 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 cursor-pointer"
                                            title="Ver Respuestas"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => handleDownloadPdf(pupil.id)}
                                            disabled={!pupil.tutor_id}
                                            className={`flex items-center gap-1 ${
                                                !pupil.tutor_id 
                                                    ? 'text-gray-400 cursor-not-allowed' 
                                                    : 'text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer'
                                            }`}
                                            title={!pupil.tutor_id ? "Sin tutor asignado" : "Descargar Reporte PDF"}
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            PDF
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron alumnos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Paginación UI */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'}`}
                    >
                        Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded cursor-pointer ${currentPage === i + 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
