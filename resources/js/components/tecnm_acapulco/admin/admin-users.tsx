import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [creatingUser, setCreatingUser] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role_id: 3, password: '', password_confirmation: '' });
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    // Búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState<'id' | 'name' | 'email' | 'role_id'>('name');

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            await axios.delete(`/admin/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            alert('Error al eliminar usuario');
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setCreatingUser(false);
        setFormData({ name: user.name, email: user.email, role_id: user.role_id, password: '', password_confirmation: '' });
    };

    const handleCreate = () => {
        setCreatingUser(true);
        setEditingUser(null);
        setFormData({ name: '', email: '', role_id: 3, password: '', password_confirmation: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (editingUser) {
                const response = await axios.put(`/admin/users/${editingUser.id}`, formData);
                setUsers(users.map(u => (u.id === editingUser.id ? response.data.user : u)));
                alert('Usuario actualizado correctamente');
            } else {
                const response = await axios.post('/admin/users', formData);
                setUsers([...users, response.data.user]);
                alert('Usuario creado correctamente');
            }
            handleCancel();
        } catch (err) {
            alert('Error al guardar usuario');
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setCreatingUser(false);
        setFormData({ name: '', email: '', role_id: 3, password: '', password_confirmation: '' });
    };

    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando usuarios...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Lógica de búsqueda y paginación
    const filteredUsers = users.filter(user => {
        const value = user[searchField];
        // Convertir a string para poder buscar tanto en números (ID, rol) como en texto
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="p-6 bg-white dark:bg-sidebar-accent/10 rounded-lg shadow-[inset_0_0_15px_rgba(74,222,128,0.2)] border-2 border-green-400 dark:border-green-600">
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
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                searchField === 'id' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            ID
                        </button>
                        <button
                            onClick={() => setSearchField('name')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                searchField === 'name' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Nombre
                        </button>
                        <button
                            onClick={() => setSearchField('email')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                searchField === 'email' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            E-Mail
                        </button>
                        <button
                            onClick={() => setSearchField('role_id')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
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
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                            >
                                <option value={1}>Admin (1)</option>
                                <option value={2}>Tutor (2)</option>
                                <option value={3}>Estudiante (3)</option>
                            </select>
                        </div>
                        <div className="flex gap-2 animate-slide-in" style={{ animationDelay: '600ms' }}>
                            <button 
                                type="submit" 
                                className={`px-4 py-2 text-white rounded ${
                                    editingUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {editingUser ? 'Actualizar' : 'Crear'}
                            </button>
                            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'Tutor' : 'Estudiante'} ({user.role_id})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
