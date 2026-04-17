import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- Interfaz de TypeScript para definir la estructura de Usuario ---
interface User {
    id: number;
    name: string;
    email: string;
    control_number?: string | null;
    picture?: string | null;
    major_id?: number | null;
    role_id: number;
    created_at: string;
    updated_at: string;
    pupil?: {
        id: number;
        tutor_id: number | null;
    };
}

interface Tutor {
    id: number;
    user_id: number;
    user?: {
        name: string;
    };
}

export default function AdminUsers() {
    // --- Estados Principales ---
    const [users, setUsers] = useState<User[]>([]);
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [majors, setMajors] = useState<{id: number, name: string, initials?: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [alertInfo, setAlertInfo] = useState<{ message: string, type: 'success' | 'danger' | 'info' } | null>(null);

    const showAlert = (message: string, type: 'success' | 'danger' | 'info') => {
        setAlertInfo({ message, type });
        setTimeout(() => setAlertInfo(null), 6000);
    };

    // --- Estados para CRUD de Usuarios (Crear/Editar) ---
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [creatingUser, setCreatingUser] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', control_number: '', picture: '' as string | File, major_id: '' as string | number, role_id: 3, password: '', password_confirmation: '', tutor_id: '' as string | number });
    
    // --- Estados para Drag & Drop de Foto ---
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    
    // --- Estados para Paginación ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    // --- Estados para Búsqueda y Filtrado ---
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState<'id' | 'control_number' | 'name' | 'major_id' | 'email' | 'role_id'>('name');

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsers();
        fetchTutors();
        fetchMajors();
    }, []);

    const fetchMajors = async () => {
        try {
            const response = await axios.get('/majors');
            setMajors(response.data);
        } catch (err) {
            console.error('Error al cargar carreras');
        }
    };

    // Obtener lista de usuarios del backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/admin/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar usuarios');
            setLoading(false);
        }
    };

    const fetchTutors = async () => {
        try {
            const response = await axios.get('/supervisor/tutors');
            setTutors(response.data);
        } catch (err) {
            console.error('Error al cargar tutores');
        }
    };

    // --- Lógica de CRUD de Usuarios ---

    // Preparar eliminación de un usuario
    const handleDelete = (id: number) => {
        setUserToDelete(id);
    };

    // Ejecutar eliminación confirmada
    const executeDelete = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`/admin/users/${userToDelete}`);
            setUsers(users.filter(user => user.id !== userToDelete));
            showAlert('Usuario eliminado correctamente', 'danger');
            // Actualizar lista de tutores por si se eliminó un tutor
            fetchTutors();
        } catch (err) {
            alert('Error al eliminar usuario');
        } finally {
            setUserToDelete(null);
        }
    };

    // Preparar estado para editar un usuario existente
    const handleEdit = (user: User) => {
        const startY = window.scrollY;

        if (startY > 100) {
            // Scroll manual más rápido (300ms) para asegurar que se vea la animación al llegar
            const duration = 300;
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

                window.scrollTo(0, startY * (1 - ease));

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setEditingUser(user);
                    setCreatingUser(false);
                    setFormData({
                        name: user.name,
                        email: user.email,
                        control_number: user.control_number || '',
                        picture: '',
                        major_id: user.major_id || '',
                        role_id: user.role_id,
                        password: '',
                        password_confirmation: '',
                        tutor_id: user.pupil?.tutor_id || '',
                    });
                    setImagePreview(user.picture ? (user.picture.startsWith('http') ? user.picture : `/storage/${user.picture}`) : null);
                }
            };
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo({ top: 0 });
            setEditingUser(user);
            setCreatingUser(false);
            setFormData({
                name: user.name,
                email: user.email,
                control_number: user.control_number || '',
                picture: '',
                major_id: user.major_id || '',
                role_id: user.role_id,
                password: '',
                password_confirmation: '',
                tutor_id: user.pupil?.tutor_id || '',
            });
            setImagePreview(user.picture ? (user.picture.startsWith('http') ? user.picture : `/storage/${user.picture}`) : null);
        }
    };

    // Preparar estado para crear un nuevo usuario
    const handleCreate = () => {
        setCreatingUser(true);
        setEditingUser(null);
        setFormData({ name: '', email: '', control_number: '', picture: '', major_id: '', role_id: 3, password: '', password_confirmation: '', tutor_id: '' });
        setImagePreview(null);
    };

    // Enviar datos del formulario (Crear o Actualizar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('control_number', formData.control_number);
            submitData.append('major_id', String(formData.major_id));
            submitData.append('role_id', String(formData.role_id));
            if (formData.password) submitData.append('password', formData.password);
            if (formData.password_confirmation) submitData.append('password_confirmation', formData.password_confirmation);
            if (formData.tutor_id) submitData.append('tutor_id', String(formData.tutor_id));
            
            if (formData.picture instanceof File) {
                submitData.append('picture', formData.picture);
            }

            if (editingUser) {
                submitData.append('_method', 'PUT'); // Trick for Laravel
                const response = await axios.post(`/admin/users/${editingUser.id}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                setUsers(users.map(u => (u.id === editingUser.id ? response.data.user : u)));
                showAlert('Usuario actualizado correctamente', 'info');
            } else {
                const response = await axios.post('/admin/users', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                setUsers([...users, response.data.user]);
                showAlert('Usuario creado correctamente', 'success');
            }

            // Actualizar lista de tutores siempre, por si se creó/editó un tutor
            fetchTutors();
            handleCancel();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al guardar usuario');
        }
    };

    // Cancelar edición/creación y limpiar formulario
    const handleCancel = () => {
        setEditingUser(null);
        setCreatingUser(false);
        setFormData({ name: '', email: '', control_number: '', picture: '', major_id: '', role_id: 3, password: '', password_confirmation: '', tutor_id: '' });
        setImagePreview(null);
    };

    // Manejo de la foto de perfil (Drag & Drop / Input File)
    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setFormData({ ...formData, picture: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando usuarios...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // --- Lógica de Filtrado y Paginación ---
    const filteredUsers = users.filter(user => {
        if (searchField === 'major_id') {
            const major = majors.find(m => m.id === user.major_id);
            const majorSearchStr = `${major?.name || ''} ${major?.initials || ''}`;
            return majorSearchStr.toLowerCase().includes(searchTerm.toLowerCase());
        }
        
        const value = user[searchField];
        // Convertir a string para poder buscar tanto en números (ID, rol) como en texto
        return String(value || '').toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // --- Renderizado Principal: Lista de Usuarios ---
    return (
        <div className="p-6 bg-white dark:bg-sidebar-accent/10 rounded-lg shadow-[inset_0_0_15px_rgba(74,222,128,0.2)] border-2 border-green-400 dark:border-green-600 relative">
            
            {/* Alerta Global Tailwind (Éxito, Información y Eliminación) */}
            {alertInfo && (
                <div className={`fixed top-20 right-6 z-50 rounded-md border-l-4 p-4 shadow-md animate-slide-in min-w-[300px] transition-colors duration-300 ${
                    alertInfo.type === 'success' 
                        ? 'border-green-500 bg-green-100 dark:bg-green-900/50' 
                        : alertInfo.type === 'danger'
                            ? 'border-red-500 bg-red-100 dark:bg-red-900/50'
                            : 'border-blue-500 bg-blue-100 dark:bg-blue-900/50'
                }`} role="alert">
                    <div className="flex items-center">
                        <div className="shrink-0 flex items-center">
                            {alertInfo.type === 'success' ? (
                                <svg className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : alertInfo.type === 'danger' ? (
                                <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 flex items-center">
                            <p className={`text-sm font-medium ${
                                alertInfo.type === 'success' 
                                    ? 'text-green-800 dark:text-green-200' 
                                    : alertInfo.type === 'danger'
                                        ? 'text-red-800 dark:text-red-200'
                                        : 'text-blue-800 dark:text-blue-200'
                            }`}>
                                {alertInfo.message}
                            </p>
                        </div>
                        <button type="button" onClick={() => setAlertInfo(null)} className={`ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 hover:bg-black/10 inline-flex items-center justify-center h-8 w-8 cursor-pointer transition-colors ${
                            alertInfo.type === 'success' ? 'text-green-500 dark:text-green-400' : alertInfo.type === 'danger' ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'
                        }`}>
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación para Eliminar Tailwind */}
            {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-expand">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirmar eliminación</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            ¿Estás seguro de eliminar este usuario? Toda su información será eliminada permanentemente de la base de datos y esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setUserToDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={executeDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Gestión de Usuarios 🔑
                </h1>
                <button 
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                    Crear Usuario nuevo
                </button>
            </div>

            {/* Barra de Búsqueda */}
            <div className="mb-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Buscar por:</span>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSearchField('id')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'id' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            ID
                        </button>
                        <button
                            onClick={() => setSearchField('name')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'name' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Nombre
                        </button>
                        <button
                            onClick={() => setSearchField('control_number')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'control_number' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            N. Control
                        </button>
                        <button
                            onClick={() => setSearchField('major_id')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'major_id' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Carrera
                        </button>
                        <button
                            onClick={() => setSearchField('email')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'email' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            E-Mail
                        </button>
                        <button
                            onClick={() => setSearchField('role_id')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                searchField === 'role_id' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Rol ID
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder={`Buscar...`}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear a página 1 al buscar
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

            {/* Formulario de Creación/Edición (Desplegable) */}
            {(editingUser || creatingUser) && (
                <div 
                    key={editingUser ? `edit-${editingUser.id}` : 'create'}
                    className={`animate-expand mb-6 p-4 border rounded ${
                        editingUser 
                            ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800' 
                            : 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
                    }`}
                >
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 animate-slide-in" style={{ animationDelay: '0ms' }}>
                        {editingUser ? `Editar Usuario: ${editingUser.name}` : 'Crear Nuevo Usuario'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                        <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-Mail</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '220ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Control</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d{8}"
                                maxLength={8}
                                minLength={8}
                                value={formData.control_number}
                                onChange={e => {
                                    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 8);
                                    setFormData({ ...formData, control_number: onlyNums });
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                autoComplete="off"
                                placeholder="Ej. 19320001"
                            />
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '240ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Carrera</label>
                            <select
                                value={formData.major_id}
                                onChange={e => setFormData({ ...formData, major_id: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border cursor-pointer"
                            >
                                <option value="" disabled>-- Seleccionar Carrera --</option>
                                {majors.map(major => (
                                    <option key={major.id} value={major.id}>{major.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '260ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto de Perfil</label>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center mt-1">
                                {imagePreview && (
                                    <div className="shrink-0 flex justify-center">
                                        <img 
                                            src={imagePreview} 
                                            alt="Vista previa" 
                                            className="h-24 w-24 rounded-full object-cover border-4 border-gray-100 shadow-sm dark:border-gray-800"
                                        />
                                    </div>
                                )}
                                <div className="flex w-full items-center justify-center">
                                    <label
                                        htmlFor="pictureInput"
                                        className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                                            isDragging 
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                                        }`}
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">Haz clic para subir</span> o arrastra un archivo
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                PNG, JPG o WEBP (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input 
                                            id="pictureInput"
                                            type="file" 
                                            accept="image/png, image/jpeg, image/jpg, image/webp" 
                                            className="hidden" 
                                            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña {editingUser && '(Dejar en blanco para mantener)'}</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                required={!editingUser}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={formData.password_confirmation}
                                onChange={e => setFormData({ ...formData, password_confirmation: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                required={!editingUser}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="animate-slide-in" style={{ animationDelay: '500ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol ID</label>
                            <select
                                value={formData.role_id}
                                onChange={e => setFormData({ ...formData, role_id: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border cursor-pointer"
                            >
                                <option value={1}>Admin (1)</option>
                                <option value={2}>Tutor (2)</option>
                                <option value={3}>Estudiante (3)</option>
                            </select>
                        </div>

                        {formData.role_id === 3 && (
                            <div className="animate-slide-in" style={{ animationDelay: '550ms' }}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asignar Tutor</label>
                                <select
                                    value={formData.tutor_id}
                                    onChange={e => setFormData({ ...formData, tutor_id: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border cursor-pointer"
                                >
                                    <option value="">-- Seleccionar Tutor --</option>
                                    {tutors.map(tutor => (
                                        <option key={tutor.id} value={tutor.id}>
                                            {tutor.user?.name || `Tutor #${tutor.id}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex gap-2 animate-slide-in" style={{ animationDelay: '600ms' }}>
                            <button 
                                type="submit" 
                                className={`px-4 py-2 text-white rounded cursor-pointer ${
                                    editingUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {editingUser ? 'Actualizar' : 'Crear'}
                            </button>
                            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de Resultados */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">N. Control</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Carrera</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">E-Mail</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-sidebar-accent/5 divide-y divide-gray-200 dark:divide-gray-700">
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-mono">{user.control_number || 'S/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                                    {majors.find(m => m.id === user.major_id)?.initials || 'S/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'Tutor' : 'Estudiante'} ({user.role_id})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación UI */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'}`}
                    >
                        Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 rounded cursor-pointer ${currentPage === i + 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
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
