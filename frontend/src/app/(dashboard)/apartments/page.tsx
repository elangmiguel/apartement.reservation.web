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
    CFormSelect,
    CCol,
    CRow,
} from '@coreui/react';
import { apartmentService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

const Apartments = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingApartment, setEditingApartment] = useState<any>(null);
    const [formData, setFormData] = useState({
        number: '',
        floor: '',
        buildingId: '',
        status: 'AVAILABLE',
    });

    const fetchApartments = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await apartmentService.getAll(page - 1, 10);
            setApartments(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load apartments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, [currentPage]);

    const handleEdit = (apartment: any) => {
        setEditingApartment(apartment);
        setFormData({
            number: apartment.number || '',
            floor: apartment.floor || '',
            buildingId: apartment.buildingId || '',
            status: apartment.status || 'AVAILABLE',
        });
        setShowModal(true);
    };

    const handleDelete = async (apartment: any) => {
        if (window.confirm('Are you sure you want to delete this apartment?')) {
            try {
                await apartmentService.delete(apartment.id);
                toast.success('Apartment deleted successfully');
                fetchApartments();
            } catch (error) {
                toast.error('Failed to delete apartment');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingApartment) {
                await apartmentService.update(editingApartment.id, formData);
                toast.success('Apartment updated successfully');
            } else {
                await apartmentService.create(formData);
                toast.success('Apartment created successfully');
            }
            setShowModal(false);
            fetchApartments();
            resetForm();
        } catch (error) {
            toast.error('Failed to save apartment');
        }
    };

    const resetForm = () => {
        setFormData({
            number: '',
            floor: '',
            buildingId: '',
            status: 'AVAILABLE',
        });
        setEditingApartment(null);
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'number', label: 'Number' },
        { key: 'floor', label: 'Floor' },
        { key: 'buildingId', label: 'Building ID' },
        {
            key: 'status',
            label: 'Status',
            render: (value: string) => (
                <span className={`badge bg-${value === 'AVAILABLE' ? 'success' : 'warning'}`}>
                    {value}
                </span>
            ),
        },
    ];

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Apartments</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add Apartment
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={apartments}
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
                    <CModalTitle>{editingApartment ? 'Edit' : 'Add'} Apartment</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="number">Number</CFormLabel>
                            <CFormInput
                                type="text"
                                id="number"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="floor">Floor</CFormLabel>
                            <CFormInput
                                type="number"
                                id="floor"
                                value={formData.floor}
                                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="buildingId">Building ID</CFormLabel>
                            <CFormInput
                                type="text"
                                id="buildingId"
                                value={formData.buildingId}
                                onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })}
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
                                <option value="AVAILABLE">Available</option>
                                <option value="OCCUPIED">Occupied</option>
                                <option value="MAINTENANCE">Maintenance</option>
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

export default Apartments;
