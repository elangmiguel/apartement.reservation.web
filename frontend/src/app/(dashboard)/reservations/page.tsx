'use client';

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

const Reservations = () => {
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

    const fetchReservations = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await reservationService.getAll(page - 1, 10);
            setReservations(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load reservations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [currentPage]);

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

    const handleDelete = async (reservation: any) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await reservationService.delete(reservation.id);
                toast.success('Reservation deleted successfully');
                fetchReservations();
            } catch (error) {
                toast.error('Failed to delete reservation');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingReservation) {
                await reservationService.update(editingReservation.id, formData);
                toast.success('Reservation updated successfully');
            } else {
                await reservationService.create(formData);
                toast.success('Reservation created successfully');
            }
            setShowModal(false);
            fetchReservations();
            resetForm();
        } catch (error) {
            toast.error('Failed to save reservation');
        }
    };

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

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'apartmentId', label: 'Apartment ID' },
        { key: 'userId', label: 'User ID' },
        {
            key: 'startDate',
            label: 'Start Date',
            render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
        },
        {
            key: 'endDate',
            label: 'End Date',
            render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
        },
    ];

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

            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editingReservation ? 'Edit' : 'Add'} Reservation</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="apartmentId">Apartment ID</CFormLabel>
                            <CFormInput
                                type="text"
                                id="apartmentId"
                                value={formData.apartmentId}
                                onChange={(e) => setFormData({ ...formData, apartmentId: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="userId">User ID</CFormLabel>
                            <CFormInput
                                type="text"
                                id="userId"
                                value={formData.userId}
                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                            <CFormInput
                                type="date"
                                id="startDate"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="endDate">End Date</CFormLabel>
                            <CFormInput
                                type="date"
                                id="endDate"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="notes">Notes</CFormLabel>
                            <CFormInput
                                type="text"
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

export default Reservations;
