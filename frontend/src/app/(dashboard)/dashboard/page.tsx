'use client';

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
import {
    cilHome,
    cilBuilding,
    cilCalendar,
    cilPeople,
} from '@coreui/icons';
import { apartmentService, buildingService, reservationService, userService } from '@/lib/api/services';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalApartments: 0,
        totalBuildings: 0,
        totalReservations: 0,
        totalUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [apartments, buildings, reservations, users] = await Promise.all([
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

    return (
        <>
            <CRow className="mb-4">
                <CCol>
                    <h2>Dashboard</h2>
                    <p className="text-medium-emphasis">Welcome to the Apartment Reservation System</p>
                </CCol>
            </CRow>

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
                        title="Apartments"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilHome} size="xl" />
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
                        title="Buildings"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilBuilding} size="xl" />
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
                        title="Reservations"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilCalendar} size="xl" />
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
                        title="Users"
                        chart={
                            <div style={{ height: '70px' }}>
                                <CIcon icon={cilPeople} size="xl" />
                            </div>
                        }
                    />
                </CCol>
            </CRow>

            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Quick Actions</strong>
                        </CCardHeader>
                        <CCardBody>
                            <p>
                                Use the sidebar navigation to manage apartments, buildings, reservations, users, roles, and contacts.
                            </p>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Dashboard;
