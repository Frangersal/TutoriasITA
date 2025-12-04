import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
    id: number;
    name: string;
    question_id: number;
}

interface Question {
    id: number;
    name: string;
    form_id: number;
    answer_type_id: number;
    options?: Option[];
}

interface Form {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    questions?: Question[];
}

export default function AdminForms() {
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Estados para CRUD de Formularios
    const [editingForm, setEditingForm] = useState<Form | null>(null);
    const [creatingForm, setCreatingForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    // Estados para Gestión de Preguntas
    const [managingForm, setManagingForm] = useState<Form | null>(null);
    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionType, setNewQuestionType] = useState(1); // 1: Texto, 2: Opción
    const [newOptionName, setNewOptionName] = useState<{ [key: number]: string }>({}); // Mapa de question_id -> texto de nueva opción
    
    // Estado para edición de preguntas
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    // Búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState<'id' | 'name' | 'description'>('name');

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('/admin/forms');
            setForms(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar formularios');
            setLoading(false);
        }
    };

    // --- Lógica de Formularios ---

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este formulario?')) return;
        try {
            await axios.delete(`/admin/forms/${id}`);
            setForms(forms.filter(form => form.id !== id));
        } catch (err) {
            alert('Error al eliminar formulario');
        }
    };

    const handleEdit = (form: Form) => {
        setEditingForm(form);
        setCreatingForm(false);
        setFormData({ name: form.name, description: form.description });
    };

    const handleCreate = () => {
        setCreatingForm(true);
        setEditingForm(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (editingForm) {
                const response = await axios.put(`/admin/forms/${editingForm.id}`, formData);
                setForms(forms.map(f => (f.id === editingForm.id ? response.data.form : f)));
                alert('Formulario actualizado correctamente');
            } else {
                const response = await axios.post('/admin/forms', formData);
                setForms([...forms, response.data.form]);
                alert('Formulario creado correctamente');
            }
            handleCancel();
        } catch (err) {
            alert('Error al guardar formulario');
        }
    };

    const handleCancel = () => {
        setEditingForm(null);
        setCreatingForm(false);
        setFormData({ name: '', description: '' });
    };

    // --- Lógica de Preguntas ---

    const handleManageQuestions = async (form: Form) => {
        try {
            // Cargar el formulario con sus preguntas y opciones
            const response = await axios.get(`/admin/forms/${form.id}`);
            setManagingForm(response.data);
        } catch (err) {
            alert('Error al cargar las preguntas del formulario');
        }
    };

    const handleCloseQuestions = () => {
        setManagingForm(null);
        setNewQuestionName('');
        setNewQuestionType(1);
        setEditingQuestion(null);
    };

    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setNewQuestionName(question.name);
        setNewQuestionType(question.answer_type_id);
    };

    const handleCancelEditQuestion = () => {
        setEditingQuestion(null);
        setNewQuestionName('');
        setNewQuestionType(1);
    };

    const handleUpdateQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!managingForm || !editingQuestion) return;

        try {
            const response = await axios.put(`/admin/questions/${editingQuestion.id}`, {
                name: newQuestionName,
                answer_type_id: newQuestionType
            });

            // Actualizar estado local
            const updatedQuestions = managingForm.questions?.map(q => 
                q.id === editingQuestion.id ? { ...q, ...response.data.question } : q
            );

            setManagingForm({
                ...managingForm,
                questions: updatedQuestions
            });
            
            handleCancelEditQuestion();
        } catch (err) {
            alert('Error al actualizar la pregunta');
        }
    };

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!managingForm) return;

        try {
            const response = await axios.post('/admin/questions', {
                form_id: managingForm.id,
                name: newQuestionName,
                answer_type_id: newQuestionType
            });
            
            // Actualizar estado local
            const newQuestion = { ...response.data.question, options: [] };
            setManagingForm({
                ...managingForm,
                questions: [...(managingForm.questions || []), newQuestion]
            });
            setNewQuestionName('');
            setNewQuestionType(1);
        } catch (err) {
            alert('Error al crear la pregunta');
        }
    };

    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm('¿Eliminar esta pregunta?')) return;
        try {
            await axios.delete(`/admin/questions/${questionId}`);
            if (managingForm) {
                setManagingForm({
                    ...managingForm,
                    questions: managingForm.questions?.filter(q => q.id !== questionId)
                });
            }
        } catch (err) {
            alert('Error al eliminar la pregunta');
        }
    };

    const handleAddOption = async (questionId: number) => {
        const name = newOptionName[questionId];
        if (!name) return;

        try {
            const response = await axios.post('/admin/options', {
                question_id: questionId,
                name: name
            });

            if (managingForm) {
                const updatedQuestions = managingForm.questions?.map(q => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            options: [...(q.options || []), response.data.option]
                        };
                    }
                    return q;
                });
                setManagingForm({ ...managingForm, questions: updatedQuestions });
            }
            setNewOptionName({ ...newOptionName, [questionId]: '' });
        } catch (err) {
            alert('Error al agregar opción');
        }
    };

    const handleDeleteOption = async (optionId: number, questionId: number) => {
        if (!confirm('¿Eliminar esta opción?')) return;
        try {
            await axios.delete(`/admin/options/${optionId}`);
            if (managingForm) {
                const updatedQuestions = managingForm.questions?.map(q => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            options: q.options?.filter(o => o.id !== optionId)
                        };
                    }
                    return q;
                });
                setManagingForm({ ...managingForm, questions: updatedQuestions });
            }
        } catch (err) {
            alert('Error al eliminar opción');
        }
    };


    if (loading) return <p className="text-gray-600 dark:text-gray-300">Cargando formularios...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Si estamos gestionando preguntas, mostramos esa vista
    if (managingForm) {
        return (
            <div className="p-6 bg-white dark:bg-sidebar-accent/10 rounded-lg shadow border-2 border-green-400 dark:border-green-600">
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Gestión de Preguntas 🔑{'->'} {managingForm.name} 
                    </h2>
                    <button 
                        onClick={handleCloseQuestions}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Volver a Gestión de Formularios
                    </button>
                </div>

                {/* Formulario para agregar/editar pregunta */}
                <div 
                    key={editingQuestion ? `edit-${editingQuestion.id}` : 'create'}
                    className={`animate-expand mb-8 p-4 rounded-lg border ${editingQuestion ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'}`}
                >
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 animate-slide-in" style={{ animationDelay: '0ms' }}>
                        {editingQuestion ? 'Editar Pregunta' : 'Nueva Pregunta'}
                    </h3>
                    <form onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion} className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px] animate-slide-in" style={{ animationDelay: '100ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Pregunta</label>
                            <input
                                type="text"
                                value={newQuestionName}
                                onChange={e => setNewQuestionName(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                                placeholder="¿Qué te pareció el curso?"
                                required
                            />
                        </div>
                        <div className="w-48 animate-slide-in" style={{ animationDelay: '200ms' }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Tipo de Respuesta</label>
                            <select
                                value={newQuestionType}
                                onChange={e => setNewQuestionType(Number(e.target.value))}
                                className="w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                            >
                                <option value={1}>Texto Libre</option>
                                <option value={2}>Opciones (Selección)</option>
                            </select>
                        </div>
                        <div className="flex gap-2 animate-slide-in" style={{ animationDelay: '300ms' }}>
                            <button 
                                type="submit"
                                className={`px-4 py-2 text-white rounded h-[42px] ${editingQuestion ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {editingQuestion ? 'Actualizar' : 'Agregar'}
                            </button>
                            {editingQuestion && (
                                <button 
                                    type="button"
                                    onClick={handleCancelEditQuestion}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 h-[42px]"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Lista de Preguntas */}
                <div className="space-y-6">
                    {managingForm.questions?.map((question, index) => (
                        <div key={question.id} className="p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mb-2">
                                        Pregunta #{index + 1} • {question.answer_type_id === 1 ? 'Texto Libre' : 'Opciones'}
                                    </span>
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{question.name}</h4>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditQuestion(question)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuestion(question.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>

                            {/* Sección de Opciones (solo si es tipo 2) */}
                            {question.answer_type_id === 2 && (
                                <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 mt-4">
                                    <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Opciones de respuesta:</h5>
                                    
                                    <ul className="space-y-2 mb-3">
                                        {question.options?.map(option => (
                                            <li key={option.id} className="flex items-center gap-2 text-sm group">
                                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                <span className="text-gray-700 dark:text-gray-300">{option.name}</span>
                                                <button
                                                    onClick={() => handleDeleteOption(option.id, question.id)}
                                                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 ml-2 transition-opacity"
                                                    title="Eliminar opción"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                        {(!question.options || question.options.length === 0) && (
                                            <li className="text-sm text-gray-400 italic">No hay opciones definidas</li>
                                        )}
                                    </ul>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newOptionName[question.id] || ''}
                                            onChange={e => setNewOptionName({ ...newOptionName, [question.id]: e.target.value })}
                                            placeholder="Nueva opción..."
                                            className="text-sm rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white p-1 border"
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddOption(question.id);
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => handleAddOption(question.id)}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {(!managingForm.questions || managingForm.questions.length === 0) && (
                        <p className="text-center text-gray-500 py-8">Este formulario aún no tiene preguntas.</p>
                    )}
                </div>
            </div>
        );
    }

    // Lógica de búsqueda y paginación (Vista Principal)
    const filteredForms = forms.filter(form => {
        const value = form[searchField];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentForms = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

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
                    Gestión de Formularios 🔑
                </h1>
                <button 
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Crear Formulario nuevo
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
                            onClick={() => setSearchField('description')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                searchField === 'description' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Descripción
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

            {(editingForm || creatingForm) && (
                <div 
                    key={editingForm ? `edit-${editingForm.id}` : 'create'}
                    className={`animate-expand mb-6 p-4 border rounded ${
                        editingForm 
                            ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800' 
                            : 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
                    }`}
                >
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 animate-slide-in" style={{ animationDelay: '0ms' }}>
                        {editingForm ? `Editar Formulario: ${editingForm.name}` : 'Crear Nuevo Formulario'}
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                                required
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-2 animate-slide-in" style={{ animationDelay: '300ms' }}>
                            <button 
                                type="submit" 
                                className={`px-4 py-2 text-white rounded ${
                                    editingForm ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {editingForm ? 'Actualizar' : 'Crear'}
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-sidebar-accent/5 divide-y divide-gray-200 dark:divide-gray-700">
                        {currentForms.map((form) => (
                            <tr key={form.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{form.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{form.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">{form.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleManageQuestions(form)}
                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4 font-bold"
                                    >
                                        Preguntas
                                    </button>
                                    <button
                                        onClick={() => handleEdit(form)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(form.id)}
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
