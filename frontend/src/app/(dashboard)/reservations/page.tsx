'use client';

/**
 * Gestión de Reservas
 *
 * Página cliente responsable de la administración de reservas de apartamentos.
 * Implementa operaciones CRUD consumiendo servicios API y presenta los datos
 * mediante una tabla paginada. Incluye un formulario modal para creación y
 * actualización de registros. Todo el flujo opera con estado local.
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
    CCol,
    CRow,
} from '@coreui/react';
import { reservationService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

/**
 * Componente principal de la vista de Reservaciones.
 * Gestiona estado, paginación, operaciones CRUD y renderizado general.
 */
const Reservations = () => {

    /**
     * Estado general del componente:
     * - reservations: dataset principal.
     * - loading: indicador de carga.
     * - currentPage: índice actual de paginación.
     * - totalPages: total de páginas en backend.
     * - showModal: visibilidad del modal de formulario.
     * - editingReservation: registro seleccionado para edición.
     * - formData: valores controlados del formulario.
     */
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingReservation, setEditingReservation] = useState<any>(null);

    const [formData, setFormData] = useState({
        apartmentId: '',
        userId: '',
        startDate: '',
        endDate: '',
        notes: '',
    });

    /**
     * fetchReservations()
     * Obtiene registros paginados desde el backend.
     * Actualiza dataset, metadatos de paginación e indicador de carga.
     */
    const fetchReservations = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await reservationService.getAll(page - 1, 10);
            setReservations(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch {
            toast.error('Error al cargar las reservas');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efecto principal:
     * Ejecuta carga inicial y reactualiza los datos cuando cambia la página.
     */
    useEffect(() => {
        fetchReservations();
    }, [currentPage]);

    /**
     * handleEdit()
     * Carga datos del registro seleccionado en el formulario.
     * Activa el modal para actualizar la reserva.
     */
    const handleEdit = (reservation: any) => {
        setEditingReservation(reservation);
        setFormData({
            apartmentId: reservation.apartmentId || '',
            userId: reservation.userId || '',
            startDate: reservation.startDate ? reservation.startDate.split('T')[0] : '',
            endDate: reservation.endDate ? reservation.endDate.split('T')[0] : '',
            notes: reservation.notes || '',
        });
        setShowModal(true);
    };

    /**
     * handleDelete()
     * Solicita confirmación y elimina el registro mediante API.
     * Recarga datos al finalizar.
     */
    const handleDelete = async (reservation: any) => {
        if (window.confirm('¿Seguro que desea eliminar esta reserva?')) {
            try {
                await reservationService.delete(reservation.id);
                toast.success('Reserva eliminada correctamente');
                fetchReservations();
            } catch {
                toast.error('Error al eliminar la reserva');
            }
        }
    };

    /**
     * handleSubmit()
     * Procesa creación o actualización según el contexto.
     * Envia datos al backend, cierra el modal y refresca la tabla.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingReservation) {
                await reservationService.update(editingReservation.id, formData);
                toast.success('Reserva actualizada correctamente');
            } else {
                await reservationService.create(formData);
                toast.success('Reserva creada correctamente');
            }
            setShowModal(false);
            fetchReservations();
            resetForm();
        } catch {
            toast.error('Error al guardar la reserva');
        }
    };

    /**
     * resetForm()
     * Limpia los valores del formulario y el estado de edición.
     */
    const resetForm = () => {
        setFormData({
            apartmentId: '',
            userId: '',
            startDate: '',
            endDate: '',
            notes: '',
        });
        setEditingReservation(null);
    };

    /**
     * Columnas de DataTable:
     * Define claves visibles y formateadores de fecha.
     */
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'apartmentId', label: 'ID Apartamento' },
        { key: 'userId', label: 'ID Usuario' },
        {
            key: 'startDate',
            label: 'Fecha Inicio',
            render: (value: string) =>
                value ? new Date(value).toLocaleDateString() : '-',
        },
        {
            key: 'endDate',
            label: 'Fecha Fin',
            render: (value: string) =>
                value ? new Date(value).toLocaleDateString() : '-',
        },
    ];

    /**
     * Render principal:
     * - Tabla paginada con acciones CRUD.
     * - Modal con formulario controlado.
     */
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Reservations</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add Reservation
                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={reservations}
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
                    <CModalTitle>
                        {editingReservation ? 'Editar' : 'Agregar'} Reserva
                    </CModalTitle>
                </CModalHeader>

                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="apartmentId">ID Apartamento</CFormLabel>
                            <CFormInput
                                id="apartmentId"
                                type="text"
                                value={formData.apartmentId}
                                onChange={(e) =>
                                    setFormData({ ...formData, apartmentId: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="userId">ID Usuario</CFormLabel>
                            <CFormInput
                                id="userId"
                                type="text"
                                value={formData.userId}
                                onChange={(e) =>
                                    setFormData({ ...formData, userId: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="startDate">Fecha Inicio</CFormLabel>
                            <CFormInput
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, startDate: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="endDate">Fecha Fin</CFormLabel>
                            <CFormInput
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, endDate: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel htmlFor="notes">Notas</CFormLabel>
                            <CFormInput
                                id="notes"
                                type="text"
                                value={formData.notes}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                }
                            />
                        </div>
                    </CModalBody>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </CButton>
                        <CButton color="primary" type="submit">
                            Guardar
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default Reservations;
