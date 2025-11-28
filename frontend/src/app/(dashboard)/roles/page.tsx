'use client';

/**
 * Gestión de Roles
 *
 * Página cliente responsable de administrar la entidad "Role". Implementa
 * operaciones CRUD conectadas al servicio API y muestra los registros en
 * una tabla paginada. Incluye un formulario modal para la creación y
 * actualización de roles.
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
    CFormTextarea,
    CCol,
    CRow,
} from '@coreui/react';
import { roleService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

/**
 * Componente principal de la vista de Roles.
 * Gestiona estado, paginación, operaciones CRUD y renderizado general.
 */
const Roles = () => {

    /**
     * Estado general del componente:
     * - roles: dataset cargado desde la API.
     * - loading: indicador de carga.
     * - currentPage: índice actual de paginación.
     * - totalPages: número total de páginas.
     * - showModal: estado de visibilidad del formulario modal.
     * - editingRole: registro seleccionado para edición.
     * - formData: formulario controlado para creación/actualización.
     */
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    /**
     * fetchRoles()
     * Obtiene roles paginados desde la API. Actualiza:
     * - dataset de tabla
     * - metadatos de paginación
     * Maneja errores mediante notificaciones.
     */
    const fetchRoles = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await roleService.getAll(page - 1, 10);
            setRoles(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load roles');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efecto principal:
     * Ejecuta la carga inicial y reactualiza la tabla cuando cambia
     * el índice de paginación.
     */
    useEffect(() => {
        fetchRoles();
    }, [currentPage]);

    /**
     * handleEdit()
     * Prepara el formulario para editar un rol.
     * Copia datos del registro seleccionado al estado local y
     * habilita el modal.
     */
    const handleEdit = (role: any) => {
        setEditingRole(role);
        setFormData({
            name: role.name || '',
            description: role.description || '',
        });
        setShowModal(true);
    };

    /**
     * handleDelete()
     * Solicita confirmación y elimina un registro mediante el servicio API.
     * Recarga la tabla tras completar la operación.
     */
    const handleDelete = async (role: any) => {
        if (!window.confirm('Are you sure you want to delete this role?')) return;

        try {
            await roleService.delete(role.id);
            toast.success('Role deleted successfully');
            fetchRoles();
        } catch (error) {
            toast.error('Failed to delete role');
        }
    };

    /**
     * handleSubmit()
     * Gestiona los procesos de creación o actualización según exista
     * editingRole. Envía el formulario al servicio API, actualiza el listado
     * y restablece el formulario.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingRole) {
                await roleService.update(editingRole.id, formData);
                toast.success('Role updated successfully');
            } else {
                await roleService.create(formData);
                toast.success('Role created successfully');
            }

            setShowModal(false);
            fetchRoles();
            resetForm();
        } catch (error) {
            toast.error('Failed to save role');
        }
    };

    /**
     * resetForm()
     * Restaura valores del formulario y elimina el contexto de edición.
     */
    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setEditingRole(null);
    };

    /**
     * Columnas de DataTable:
     * Mapeo entre propiedades del dataset y etiquetas visibles.
     */
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
    ];

    /**
     * Render principal:
     * - Tarjeta con listado de roles.
     * - Tabla paginada con acciones CRUD.
     * - Modal para creación o edición de registros.
     */
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Roles</strong>

                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add Role
                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={roles}
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

            {/* Modal de creación / edición */}
            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editingRole ? 'Edit' : 'Add'} Role</CModalTitle>
                </CModalHeader>

                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name">Name</CFormLabel>
                            <CFormInput
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="description">Description</CFormLabel>
                            <CFormTextarea
                                id="description"
                                rows={3}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
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

export default Roles;
