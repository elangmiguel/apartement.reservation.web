'use client';

/**
 * Dashboard del sistema
 *
 * Página cliente que consolida y muestra indicadores globales del sistema,
 * incluyendo el número total de apartamentos, edificios, reservas y usuarios.
 * Ejecuta solicitudes concurrentes hacia múltiples servicios y presenta los
 * valores mediante widgets estadísticos de CoreUI.
 */

import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CWidgetStatsA,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilHome, cilBuilding, cilCalendar, cilPeople } from '@coreui/icons';
import {
    apartmentService,
    buildingService,
    reservationService,
    userService,
} from '@/lib/api/services';

/**
 * Componente principal de la vista de Dashboard
 */
const Dashboard = () => {
    /**
     * Estado general del componente:
     * - stats: contadores agregados recuperados desde el backend.
     * - loading: indicador de carga para mostrar estados transitorios.
     */
    const [stats, setStats] = useState({
        totalApartments: 0,
        totalBuildings: 0,
        totalReservations: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    /**
     * Efecto principal:
     * Ejecuta solicitudes paralelas mediante Promise.all para obtener
     * los totales de apartamentos, edificios, reservas y usuarios.
     * Se usa una paginación mínima (limit = 1) solo para consultar conteos.
     */
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [apartments, buildings, reservations, users] =
                    await Promise.all([
                        apartmentService.getAll(0, 1),
                        buildingService.getAll(0, 1),
                        reservationService.getAll(0, 1),
                        userService.getAll(0, 1),
                    ]);

                setStats({
                    totalApartments: apartments.totalDocs || 0,
                    totalBuildings: buildings.totalDocs || 0,
                    totalReservations: reservations.totalDocs || 0,
                    totalUsers: users.totalDocs || 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    /**
     * Render principal del Dashboard:
     * - Encabezado general.
     * - Cuatro tarjetas estadísticas (apartamentos, edificios, reservas, usuarios).
     * - Sección informativa con sugerencias de navegación.
     */
    return (
        <>
            <CRow className="mb-4">
                <CCol>
                    <h2>Dashboard</h2>
                    <p className="text-medium-emphasis">
                        Bienvenido al Sistema de Reservas de Apartamentos
                    </p>
                </CCol>
            </CRow>

            {/* Indicadores del sistema */}
            <CRow>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={
                            <>
                                {stats.totalApartments}{' '}
                                <span className="fs-6 fw-normal">
                                    ({loading ? '...' : 'Total'})
                                </span>
                            </>
                        }
                        title="Apartamentos"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilHome} size="xl" className="m-4" />
                            </div>
                        }
                    />
                </CCol>

                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="info"
                        value={
                            <>
                                {stats.totalBuildings}{' '}
                                <span className="fs-6 fw-normal">
                                    ({loading ? '...' : 'Total'})
                                </span>
                            </>
                        }
                        title="Edificios"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilBuilding} size="xl" className="m-4" />
                            </div>
                        }
                    />
                </CCol>

                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="warning"
                        value={
                            <>
                                {stats.totalReservations}{' '}
                                <span className="fs-6 fw-normal">
                                    ({loading ? '...' : 'Total'})
                                </span>
                            </>
                        }
                        title="Reservas"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilCalendar} size="xl" className="m-4" />
                            </div>
                        }
                    />
                </CCol>

                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="danger"
                        value={
                            <>
                                {stats.totalUsers}{' '}
                                <span className="fs-6 fw-normal">
                                    ({loading ? '...' : 'Total'})
                                </span>
                            </>
                        }
                        title="Usuarios"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilPeople} size="xl" className="m-4" />
                            </div>
                        }
                    />
                </CCol>
            </CRow>

            {/* Sección informativa */}
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Acciones rápidas</strong>
                        </CCardHeader>
                        <CCardBody>
                            <p>
                                Utiliza la barra lateral para gestionar apartamentos, edificios,
                                reservas, usuarios, roles y contactos.
                            </p>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
