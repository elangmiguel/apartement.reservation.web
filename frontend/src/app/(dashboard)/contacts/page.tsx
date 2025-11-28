'use client';

/**
 * Gestión de Contactos
 * 
 * Página cliente responsable de administrar la entidad Contact. Implementa
 * operaciones CRUD mediante un servicio API dedicado y presenta los datos en
 * una tabla paginada. Incluye un formulario modal para creación y edición.
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
import { contactService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

/**
 * Componente principal de la vista de Contactos.
 * Gestiona estado, paginación, operaciones CRUD y renderizado general.
 */
const Contacts = () => {

    /**
     * Estado general del componente.
     */
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);

    const [formData, setFormData] = useState({
        personId: '',
        type: 'EMAIL',
        value: '',
        isPrimary: false,
    });

    /**
     * fetchContacts()
     * Obtiene contactos paginados desde la API.
     * Actualiza la tabla y el estado de paginación.
     */
    const fetchContacts = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await contactService.getAll(page - 1, 10);
            setContacts(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch {
            toast.error('Failed to load contacts');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Carga inicial y recarga cuando cambia la página.
     */
    useEffect(() => {
        fetchContacts();
    }, [currentPage]);

    /**
     * handleEdit()
     * Prepara el formulario para editar un contacto existente.
     */
    const handleEdit = (contact: any) => {
        setEditingContact(contact);
        setFormData({
            personId: contact.personId || '',
            type: contact.type || 'EMAIL',
            value: contact.value || '',
            isPrimary: contact.isPrimary || false,
        });
        setShowModal(true);
    };

    /**
     * handleDelete()
     * Solicita confirmación y elimina un contacto a través del servicio API.
     * Actualiza el listado tras la operación.
     */
    const handleDelete = async (contact: any) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await contactService.delete(contact.id);
                toast.success('Contact deleted successfully');
                fetchContacts();
            } catch {
                toast.error('Failed to delete contact');
            }
        }
    };

    /**
     * handleSubmit()
     * Gestiona creación o actualización según exista o no editingContact.
     * Refresca datos y limpia el formulario al finalizar.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingContact) {
                await contactService.update(editingContact.id, formData);
                toast.success('Contact updated successfully');
            } else {
                await contactService.create(formData);
                toast.success('Contact created successfully');
            }

            setShowModal(false);
            fetchContacts();
            resetForm();
        } catch {
            toast.error('Failed to save contact');
        }
    };

    /**
     * resetForm()
     * Limpia campos del formulario y resetea estado de edición.
     */
    const resetForm = () => {
        setFormData({
            personId: '',
            type: 'EMAIL',
            value: '',
            isPrimary: false,
        });
        setEditingContact(null);
    };

    /**
     * Columnas del DataTable, con formateo específico para type e isPrimary.
     */
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'personId', label: 'Person ID' },
        {
            key: 'type',
            label: 'Type',
            render: (value: string) => (
                <CBadge color={value === 'EMAIL' ? 'info' : value === 'PHONE' ? 'success' : 'secondary'}>
                    {value}
                </CBadge>
            ),
        },
        { key: 'value', label: 'Value' },
        {
            key: 'isPrimary',
            label: 'Primary',
            render: (value: boolean) => (
                <CBadge color={value ? 'primary' : 'secondary'}>
                    {value ? 'Yes' : 'No'}
                </CBadge>
            ),
        },
    ];

    /**
     * Render principal:
     * - Tarjeta con listado de contactos
     * - Tabla con paginación
     * - Modal para creación/edición
     */
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Contacts</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add Contact
                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={contacts}
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

            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editingContact ? 'Edit' : 'Add'} Contact</CModalTitle>
                </CModalHeader>

                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="personId">Person ID</CFormLabel>
                            <CFormInput
                                type="text"
                                id="personId"
                                value={formData.personId}
                                onChange={(e) => setFormData({ ...formData, personId: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="type">Type</CFormLabel>
                            <CFormSelect
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="EMAIL">Email</option>
                                <option value="PHONE">Phone</option>
                                <option value="ADDRESS">Address</option>
                            </CFormSelect>
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="value">Value</CFormLabel>
                            <CFormInput
                                type="text"
                                id="value"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isPrimary"
                                checked={formData.isPrimary}
                                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="isPrimary">
                                Primary Contact
                            </label>
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

export default Contacts;
