'use client';

import React from 'react';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import { CContainer } from '@coreui/react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="d-flex min-vh-100">
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light flex-grow-1" style={{ marginLeft: '256px' }}>
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CContainer fluid>
                        {children}
                    </CContainer>
                </div>
            </div>
        </div>
    );
}
