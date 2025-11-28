'use client';

/**
 * Gestión de Usuarios
 * 
 * Página cliente encargada de administrar usuarios del sistema.
 * Implementa un CRUD completo con obtención paginada desde la API,
 * renderizado mediante tabla interactiva y un modal para creación
 * y actualización de registros.
 */

import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CCol,
    CRow,
    CBadge,
} from '@coreui/react';
import { userService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

/**
 * Componente principal de la vista de Usuarios.
 * Gestiona estado, paginación, operaciones CRUD y renderizado general.
 */
const Users = () => {
    /**
     * Estado global del componente:
     * - users: registros en tabla.
     * - loading: indicador general de red.
     * - currentPage / totalPages: metadatos para paginación.
     * - showModal: visibilidad del modal.
     * - editingUser: registro en edición (null si es creación).
     * - formData: formulario controlado.
     */
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        status: 'ACTIVE',
    });

    /**
     * fetchUsers()
     * Obtiene usuarios paginados desde la API.
     * Actualiza el dataset de la tabla y sus metadatos.
     * Maneja errores mediante notificación.
     */
    const fetchUsers = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await userService.getAll(page - 1, 10);
            setUsers(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efecto principal:
     * Carga inicial y actualización automática al cambiar el índice de página.
     */
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    /**
     * handleEdit()
     * Prepara la edición de un usuario cargando los datos en el formulario.
     * Habilita el modal en modo edición.
     */
    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            username: user.username || '',
            email: user.email || '',
            password: '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            status: user.status || 'ACTIVE',
        });
        setShowModal(true);
    };

    /**
     * handleDelete()
     * Solicita confirmación y elimina un usuario mediante API.
     * Actualiza la tabla después de la operación.
     */
    const handleDelete = async (user: any) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.delete(user.id);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch {
                toast.error('Failed to delete user');
            }
        }
    };

    /**
     * handleSubmit()
     * Procesa creación y actualización.
     * Si se edita un usuario sin cambiar la contraseña, no se envía.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submitData =
                editingUser && !formData.password
                    ? { ...formData, password: undefined }
                    : formData;

            if (editingUser) {
                await userService.update(editingUser.id, submitData);
                toast.success('User updated successfully');
            } else {
                await userService.create(submitData);
                toast.success('User created successfully');
            }

            setShowModal(false);
            fetchUsers();
            resetForm();
        } catch {
            toast.error('Failed to save user');
        }
    };

    /**
     * resetForm()
     * Restablece valores del formulario y limpia estado de edición.
     */
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            status: 'ACTIVE',
        });
        setEditingUser(null);
    };

    /**
     * Columnas de DataTable:
     * Configuración del mapeo entre claves y etiquetas visibles.
     * Incluye renderizado de estado mediante insignias.
     */
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        {
            key: 'status',
            label: 'Status',
            render: (value: string) => (
                <CBadge color={
                    value === 'ACTIVE'
                        ? 'success'
                        : value === 'INACTIVE'
                        ? 'secondary'
                        : 'warning'
                }>
                    {value}
                </CBadge>
            ),
        },
    ];

    /**
     * Render principal:
     * - Tabla interactiva con paginación.
     * - Botón de creación de usuario.
     * - Modal reutilizable para crear y editar.
     */
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Users</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add User
                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={users}
                                loading={loading}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Modal de creación y edición */}
            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editingUser ? 'Edit' : 'Add'} User</CModalTitle>
                </CModalHeader>

                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        {/* Campos del formulario */}
                        <div className="mb-3">
                            <CFormLabel htmlFor="username">Username</CFormLabel>
                            <CFormInput
                                type="text"
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="email">Email</CFormLabel>
                            <CFormInput
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="password">
                                Password {editingUser && '(leave blank to keep current)'}
                            </CFormLabel>
                            <CFormInput
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editingUser}
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="status">Status</CFormLabel>
                            <CFormSelect
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                            </CFormSelect>
                        </div>
                    </CModalBody>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </CButton>
                        <CButton color="primary" type="submit">
                            Save
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default Users;

