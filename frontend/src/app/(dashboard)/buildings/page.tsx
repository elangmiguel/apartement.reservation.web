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
import { buildingService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

const Buildings = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingBuilding, setEditingBuilding] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        floors: '',
        totalUnits: '',
    });

    const fetchBuildings = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await buildingService.getAll(page - 1, 10);
            setBuildings(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load buildings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings();
    }, [currentPage]);

    const handleEdit = (building: any) => {
        setEditingBuilding(building);
        setFormData({
            name: building.name || '',
            address: building.address || '',
            floors: building.floors || '',
            totalUnits: building.totalUnits || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (building: any) => {
        if (window.confirm('Are you sure you want to delete this building?')) {
            try {
                await buildingService.delete(building.id);
                toast.success('Building deleted successfully');
                fetchBuildings();
            } catch (error) {
                toast.error('Failed to delete building');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBuilding) {
                await buildingService.update(editingBuilding.id, formData);
                toast.success('Building updated successfully');
            } else {
                await buildingService.create(formData);
                toast.success('Building created successfully');
            }
            setShowModal(false);
            fetchBuildings();
            resetForm();
        } catch (error) {
            toast.error('Failed to save building');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            floors: '',
            totalUnits: '',
        });
        setEditingBuilding(null);
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'address', label: 'Address' },
        { key: 'floors', label: 'Floors' },
        { key: 'totalUnits', label: 'Total Units' },
    ];

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Buildings</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add Building
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={buildings}
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
                    <CModalTitle>{editingBuilding ? 'Edit' : 'Add'} Building</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name">Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="address">Address</CFormLabel>
                            <CFormInput
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="floors">Floors</CFormLabel>
                            <CFormInput
                                type="number"
                                id="floors"
                                value={formData.floors}
                                onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="totalUnits">Total Units</CFormLabel>
                            <CFormInput
                                type="number"
                                id="totalUnits"
                                value={formData.totalUnits}
                                onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                                required
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

export default Buildings;
