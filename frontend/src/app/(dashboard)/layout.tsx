'use client';

/**
 * DashboardLayout
 *
 * Componente de alto nivel encargado de definir la estructura principal
 * del panel administrativo. Incluye:
 * - Barra lateral fija (AppSidebar)
 * - Encabezado superior (AppHeader)
 * - Contenedor central para el contenido dinámico (children)
 */

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

            {/* Área principal del panel */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light flex-grow-1 layout-main ml-[256px]">
                <AppHeader />

                <div className="body flex-grow-1 px-3">
                    <CContainer fluid>{children}</CContainer>
                </div>
            </div>
        </div>
    );
}
