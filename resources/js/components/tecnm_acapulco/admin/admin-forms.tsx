import axios from 'axios';
import React, { useEffect, useState } from 'react';

// --- Interfaces de TypeScript para definir la estructura de datos ---
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
    // --- Estados Principales ---
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Estados para CRUD de Formularios (Crear/Editar) ---
    const [editingForm, setEditingForm] = useState<Form | null>(null);
    const [creatingForm, setCreatingForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    // --- Estados para Gestión de Preguntas (Sub-módulo) ---
    const [managingForm, setManagingForm] = useState<Form | null>(null); // Formulario actual cuyas preguntas se están editando
    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionType, setNewQuestionType] = useState(100); // 100: Texto, 300: Opción
    const [newOptionName, setNewOptionName] = useState<{
        [key: number]: string;
    }>({}); // Mapa de question_id -> texto de nueva opción

    // --- Estado para edición de una pregunta específica ---
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(
        null,
    );

    // --- Estados para Paginación ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    // --- Estados para Búsqueda y Filtrado ---
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState<
        'id' | 'name' | 'description'
    >('name');

    // Cargar formularios al montar el componente
    useEffect(() => {
        fetchForms();
    }, []);

    // Obtener lista de formularios del backend
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

    // --- Lógica de CRUD de Formularios ---

    // Eliminar un formulario
    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este formulario?')) return;
        try {
            await axios.delete(`/admin/forms/${id}`);
            setForms(forms.filter((form) => form.id !== id));
        } catch (err) {
            alert('Error al eliminar formulario');
        }
    };

    // Preparar estado para editar un formulario existente
    const handleEdit = (form: Form) => {
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
                    setEditingForm(form);
                    setCreatingForm(false);
                    setFormData({
                        name: form.name,
                        description: form.description,
                    });
                }
            };
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo({ top: 0 });
            setEditingForm(form);
            setCreatingForm(false);
            setFormData({ name: form.name, description: form.description });
        }
    };

    // Preparar estado para crear un nuevo formulario
    const handleCreate = () => {
        setCreatingForm(true);
        setEditingForm(null);
        setFormData({ name: '', description: '' });
    };

    // Enviar datos del formulario (Crear o Actualizar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingForm) {
                const response = await axios.put(
                    `/admin/forms/${editingForm.id}`,
                    formData,
                );
                setForms(
                    forms.map((f) =>
                        f.id === editingForm.id ? response.data.form : f,
                    ),
                );
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

    // Cancelar edición/creación y limpiar formulario
    const handleCancel = () => {
        setEditingForm(null);
        setCreatingForm(false);
        setFormData({ name: '', description: '' });
    };

    // --- Lógica de Gestión de Preguntas ---

    // Abrir el modo de gestión de preguntas para un formulario específico
    const handleManageQuestions = async (form: Form) => {
        try {
            // Cargar el formulario con sus preguntas y opciones
            const response = await axios.get(`/admin/forms/${form.id}`);
            setManagingForm(response.data);
        } catch (err) {
            alert('Error al cargar las preguntas del formulario');
        }
    };

    // Cerrar el modo de gestión de preguntas y volver a la lista de formularios
    const handleCloseQuestions = () => {
        setManagingForm(null);
        setNewQuestionName('');
        setNewQuestionType(100);
        setEditingQuestion(null);
    };

    // Preparar edición de una pregunta (incluye animación de scroll hacia arriba)
    const handleEditQuestion = (question: Question) => {
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
                    setEditingQuestion(question);
                    setNewQuestionName(question.name);
                    setNewQuestionType(question.answer_type_id);
                }
            };
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo({ top: 0 });
            setEditingQuestion(question);
            setNewQuestionName(question.name);
            setNewQuestionType(question.answer_type_id);
        }
    };

    // Cancelar edición de pregunta
    const handleCancelEditQuestion = () => {
        setEditingQuestion(null);
        setNewQuestionName('');
        setNewQuestionType(100);
    };

    // Guardar cambios de una pregunta editada
    const handleUpdateQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!managingForm || !editingQuestion) return;

        try {
            const response = await axios.put(
                `/admin/questions/${editingQuestion.id}`,
                {
                    name: newQuestionName,
                    answer_type_id: newQuestionType,
                },
            );

            // Actualizar estado local
            const updatedQuestions = managingForm.questions?.map((q) =>
                q.id === editingQuestion.id
                    ? { ...q, ...response.data.question }
                    : q,
            );

            setManagingForm({
                ...managingForm,
                questions: updatedQuestions,
            });

            handleCancelEditQuestion();
        } catch (err) {
            alert('Error al actualizar la pregunta');
        }
    };

    // Agregar una nueva pregunta al formulario actual
    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!managingForm) return;

        try {
            const response = await axios.post('/admin/questions', {
                form_id: managingForm.id,
                name: newQuestionName,
                answer_type_id: newQuestionType,
            });

            // Actualizar estado local
            const newQuestion = { ...response.data.question, options: [] };
            setManagingForm({
                ...managingForm,
                questions: [...(managingForm.questions || []), newQuestion],
            });
            setNewQuestionName('');
            setNewQuestionType(100);
        } catch (err) {
            alert('Error al crear la pregunta');
        }
    };

    // Eliminar una pregunta
    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm('¿Eliminar esta pregunta?')) return;
        try {
            await axios.delete(`/admin/questions/${questionId}`);
            if (managingForm) {
                setManagingForm({
                    ...managingForm,
                    questions: managingForm.questions?.filter(
                        (q) => q.id !== questionId,
                    ),
                });
            }
        } catch (err) {
            alert('Error al eliminar la pregunta');
        }
    };

    // --- Lógica de Opciones (para preguntas de tipo selección) ---

    // Agregar una opción a una pregunta
    const handleAddOption = async (questionId: number) => {
        const name = newOptionName[questionId];
        if (!name) return;

        try {
            const response = await axios.post('/admin/options', {
                question_id: questionId,
                name: name,
            });

            if (managingForm) {
                const updatedQuestions = managingForm.questions?.map((q) => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            options: [
                                ...(q.options || []),
                                response.data.option,
                            ],
                        };
                    }
                    return q;
                });
                setManagingForm({
                    ...managingForm,
                    questions: updatedQuestions,
                });
            }
            setNewOptionName({ ...newOptionName, [questionId]: '' });
        } catch (err) {
            alert('Error al agregar opción');
        }
    };

    // Eliminar una opción
    const handleDeleteOption = async (optionId: number, questionId: number) => {
        if (!confirm('¿Eliminar esta opción?')) return;
        try {
            await axios.delete(`/admin/options/${optionId}`);
            if (managingForm) {
                const updatedQuestions = managingForm.questions?.map((q) => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            options: q.options?.filter(
                                (o) => o.id !== optionId,
                            ),
                        };
                    }
                    return q;
                });
                setManagingForm({
                    ...managingForm,
                    questions: updatedQuestions,
                });
            }
        } catch (err) {
            alert('Error al eliminar opción');
        }
    };

    if (loading)
        return (
            <p className="text-gray-600 dark:text-gray-300">
                Cargando formularios...
            </p>
        );
    if (error) return <p className="text-red-500">{error}</p>;

    // --- Renderizado Condicional: Vista de Gestión de Preguntas ---
    // Si estamos gestionando preguntas, mostramos esa vista
    if (managingForm) {
        return (
            <div className="rounded-lg border-2 border-green-400 bg-white p-6 shadow dark:border-green-600 dark:bg-sidebar-accent/10">
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

                {/* Pestañas de Navegación */}
                <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleCloseQuestions}
                        className={`mr-4 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                            !managingForm
                                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        Formularios
                    </button>
                    <button
                        disabled={!managingForm}
                        className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                            managingForm
                                ? 'cursor-pointer border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'cursor-default border-transparent text-gray-300 dark:text-gray-600'
                        }`}
                    >
                        Preguntas
                    </button>
                </div>

                <div className="mb-6 flex items-start justify-between">
                    <div>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Gestión de Preguntas 🔑
                        </h2>
                        {/* <hr className="my-3 border-gray-300 dark:border-gray-600" /> */}
                        <div className="mt-2">
                            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                Formulario: {managingForm.name}
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                Descripción: {managingForm.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Formulario para agregar/editar pregunta */}
                <div
                    key={
                        editingQuestion
                            ? `edit-${editingQuestion.id}`
                            : 'create'
                    }
                    className={`animate-expand mb-8 rounded-lg border p-4 ${editingQuestion ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'}`}
                >
                    <h3
                        className="animate-slide-in mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300"
                        style={{ animationDelay: '0ms' }}
                    >
                        {editingQuestion ? 'Editar Pregunta' : 'Nueva Pregunta'}
                    </h3>
                    <form
                        onSubmit={
                            editingQuestion
                                ? handleUpdateQuestion
                                : handleAddQuestion
                        }
                        className="flex flex-wrap items-end gap-4"
                    >
                        <div
                            className="animate-slide-in min-w-[200px] flex-1"
                            style={{ animationDelay: '100ms' }}
                        >
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Pregunta
                            </label>
                            <input
                                type="text"
                                value={newQuestionName}
                                onChange={(e) =>
                                    setNewQuestionName(e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="¿Qué te pareció el curso?"
                                required
                            />
                        </div>
                        <div
                            className="animate-slide-in w-48"
                            style={{ animationDelay: '200ms' }}
                        >
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Tipo de Respuesta
                            </label>
                            <select
                                value={newQuestionType}
                                onChange={(e) =>
                                    setNewQuestionType(Number(e.target.value))
                                }
                                className="w-full cursor-pointer rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value={100}>Texto Libre</option>
                                <option value={200}>Texto Opcional</option>
                                <option value={300}>Opciones (Selección)</option>
                                <option value={350}>Opciones (Selección Opcional)</option>
                                <option value={501}>Número Entero</option>
                                <option value={502}>Número Decimal</option>
                                <option value={503}>Fecha</option>
                                <option value={553}>Fecha Opcional</option>
                                <option value={506}>Selector de Imágenes</option>
                            </select>
                        </div>
                        <div
                            className="animate-slide-in flex gap-2"
                            style={{ animationDelay: '300ms' }}
                        >
                            <button
                                type="submit"
                                className={`h-[42px] cursor-pointer rounded px-4 py-2 text-white ${editingQuestion ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {editingQuestion ? 'Actualizar' : 'Agregar'}
                            </button>
                            {editingQuestion && (
                                <button
                                    type="button"
                                    onClick={handleCancelEditQuestion}
                                    className="h-[42px] cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Lista de Preguntas */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {managingForm.questions?.map((question, index) => (
                        <div
                            key={question.id}
                            className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div className="mb-4">
                                <span className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                    Pregunta #{index + 1} •{' '}
                                    {[100, 200].includes(question.answer_type_id)
                                        ? 'Texto Libre'
                                        : [300, 350].includes(question.answer_type_id)
                                        ? 'Opciones'
                                        : [501, 502].includes(question.answer_type_id)
                                        ? 'Número'
                                        : [503, 553].includes(question.answer_type_id)
                                        ? 'Fecha'
                                        : question.answer_type_id === 506
                                        ? 'Imagen'
                                        : 'Otro'}
                                </span>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {question.name}
                                </h4>
                            </div>

                            {/* Sección de Opciones (solo si es tipo 300 o 350) */}
                            {[300, 350].includes(question.answer_type_id) && (
                                <div className="mt-4 mb-4 ml-4 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
                                    <h5 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Opciones de respuesta:
                                    </h5>

                                    <ul className="mb-3 space-y-2">
                                        {question.options?.map((option) => (
                                            <li
                                                key={option.id}
                                                className="group flex items-center gap-2 text-sm"
                                            >
                                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {option.name}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOption(
                                                            option.id,
                                                            question.id,
                                                        )
                                                    }
                                                    className="ml-2 cursor-pointer text-red-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-600"
                                                    title="Eliminar opción"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                        {(!question.options ||
                                            question.options.length === 0) && (
                                            <li className="text-sm text-gray-400 italic">
                                                No hay opciones definidas
                                            </li>
                                        )}
                                    </ul>

                                    <div className="flex w-full gap-2">
                                        <input
                                            type="text"
                                            value={
                                                newOptionName[question.id] || ''
                                            }
                                            onChange={(e) =>
                                                setNewOptionName({
                                                    ...newOptionName,
                                                    [question.id]:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="Nueva opción..."
                                            className="min-w-0 flex-1 rounded border border-gray-300 p-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddOption(
                                                        question.id,
                                                    );
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                handleAddOption(question.id)
                                            }
                                            className="cursor-pointer rounded bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                                <button
                                    onClick={() => handleEditQuestion(question)}
                                    className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteQuestion(question.id)
                                    }
                                    className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {(!managingForm.questions ||
                        managingForm.questions.length === 0) && (
                        <p className="py-8 text-center text-gray-500">
                            Este formulario aún no tiene preguntas.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // --- Lógica de Filtrado y Paginación para la Tabla Principal ---
    const filteredForms = forms.filter((form) => {
        const value = form[searchField];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentForms = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // --- Renderizado Principal: Lista de Formularios ---
    return (
        <div className="rounded-lg border-2 border-green-400 bg-white p-6 shadow-[inset_0_0_15px_rgba(74,222,128,0.2)] dark:border-green-600 dark:bg-sidebar-accent/10">
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

            {/* Pestañas de Navegación */}
            <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleCloseQuestions}
                    className={`mr-4 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        !managingForm
                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    Formularios
                </button>
                <button
                    disabled={!managingForm}
                    className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                        managingForm
                            ? 'cursor-pointer border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'cursor-default border-transparent text-gray-300 dark:text-gray-600'
                    }`}
                >
                    Preguntas
                </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Gestión de Formularios 🔑
                </h1>
                <button
                    onClick={handleCreate}
                    className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                    Crear Formulario nuevo
                </button>
            </div>

            {/* Barra de Búsqueda */}
            <div className="mb-4 flex flex-col gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Buscar por:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSearchField('id')}
                            className={`cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                                searchField === 'id'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            ID
                        </button>
                        <button
                            onClick={() => setSearchField('name')}
                            className={`cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                                searchField === 'name'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Nombre
                        </button>
                        <button
                            onClick={() => setSearchField('description')}
                            className={`cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                                searchField === 'description'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                        >
                            Descripción
                        </button>
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <input
                        type="text"
                        placeholder={`Buscar...`}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear a página 1 al buscar
                        }}
                        className="flex-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCurrentPage(1);
                            }}
                            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

            {/* Formulario de Creación/Edición (Desplegable) */}
            {(editingForm || creatingForm) && (
                <div
                    key={editingForm ? `edit-${editingForm.id}` : 'create'}
                    className={`animate-expand mb-6 rounded border p-4 ${
                        editingForm
                            ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                            : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    }`}
                >
                    <h3
                        className="animate-slide-in mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                        style={{ animationDelay: '0ms' }}
                    >
                        {editingForm
                            ? `Editar Formulario: ${editingForm.name}`
                            : 'Crear Nuevo Formulario'}
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        autoComplete="off"
                    >
                        <div
                            className="animate-slide-in"
                            style={{ animationDelay: '100ms' }}
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div
                            className="animate-slide-in"
                            style={{ animationDelay: '200ms' }}
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Descripción
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                required
                                rows={3}
                            />
                        </div>
                        <div
                            className="animate-slide-in flex gap-2"
                            style={{ animationDelay: '300ms' }}
                        >
                            <button
                                type="submit"
                                className={`cursor-pointer rounded px-4 py-2 text-white ${
                                    editingForm
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {editingForm ? 'Actualizar' : 'Crear'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de Resultados */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-sidebar-accent/5">
                        {currentForms.map((form) => (
                            <tr key={form.id}>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {form.id}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {form.name}
                                </td>
                                <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                    {form.description}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <button
                                        onClick={() =>
                                            handleManageQuestions(form)
                                        }
                                        className="mr-4 cursor-pointer font-bold text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                        Preguntas
                                    </button>
                                    <button
                                        onClick={() => handleEdit(form)}
                                        className="mr-4 cursor-pointer text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(form.id)}
                                        className="cursor-pointer text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`rounded px-3 py-1 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`cursor-pointer rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`rounded px-3 py-1 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
