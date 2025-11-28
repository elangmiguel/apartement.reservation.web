'use client';

/**
 * Componente de gestión de edificios.
 * 
 * - Obtener, paginar y mostrar los registros de edificios desde la API.
 * - Proveer operaciones CRUD: creación, edición y eliminación.
 * - Renderizar un formulario modal para captura y actualización de datos.
 * - Integrarse con el componente DataTable para visualizar la lista.
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
import { buildingService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

/**
 * Componente principal de la vista de Edificios.
 * Gestiona estado, paginación, operaciones CRUD y renderizado general.
 */
const Buildings = () => {
    /** Lista de edificios cargados desde el backend */
    const [buildings, setBuildings] = useState([]);

    /** Indicador de carga de datos */
    const [loading, setLoading] = useState(true);

    /** Página actual para la paginación */
    const [currentPage, setCurrentPage] = useState(1);

    /** Total de páginas disponibles */
    const [totalPages, setTotalPages] = useState(1);

    /** Control del modal de creación/edición */
    const [showModal, setShowModal] = useState(false);

    /** Edificio actualmente editado */
    const [editingBuilding, setEditingBuilding] = useState<any>(null);

    /** Estado del formulario */
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        floors: '',
        totalUnits: '',
    });

    /**
     * Obtiene los edificios desde la API considerando la paginación.
     * @param page número de página (basado en 1)
     */
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

    /** Carga inicial de datos y actualización al cambiar de página */
    useEffect(() => {
        fetchBuildings();
    }, [currentPage]);

    /**
     * Prepara el formulario para editar un edificio existente.
     * @param building registro seleccionado
     */
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

    /**
     * Elimina un edificio previa confirmación del usuario.
     */
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

    /**
     * Maneja el envío del formulario para crear o actualizar un registro.
     */
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

    /** Restablece valores del formulario */
    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            floors: '',
            totalUnits: '',
        });
        setEditingBuilding(null);
    };

    /** Definición de columnas mostradas en la tabla */
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

            {/* Modal de creación/edición */}
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
