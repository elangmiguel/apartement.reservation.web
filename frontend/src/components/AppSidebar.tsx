'use client';

import React from 'react';
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CNavGroup,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilSpeedometer,
    cilBuilding,
    cilHome,
    cilPeople,
} from '@coreui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <CSidebar className="border-end" position="fixed" unfoldable={false}>
            <CSidebarHeader className="border-bottom">
                <Link href="/" passHref legacyBehavior>
                    <CSidebarBrand>
                        <CIcon customClassName="sidebar-brand-full" icon={cilBuilding} height={32} />
                        <span className="ms-2">Apartment Res.</span>
                    </CSidebarBrand>
                </Link>
            </CSidebarHeader>
            <CSidebarNav>
                <Link href="/dashboard" passHref legacyBehavior>
                    <CNavItem component="a" active={pathname === '/dashboard'}>
                        <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
                    </CNavItem>
                </Link>
                <CNavGroup
                    toggler={
                        <>
                            <CIcon customClassName="nav-icon" icon={cilHome} /> Management
                        </>
                    }
                >
                    <Link href="/apartments" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/apartments')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Apartments
                        </CNavItem>
                    </Link>
                    <Link href="/buildings" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/buildings')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Buildings
                        </CNavItem>
                    </Link>
                    <Link href="/reservations" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/reservations')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Reservations
                        </CNavItem>
                    </Link>
                </CNavGroup>
                <CNavGroup
                    toggler={
                        <>
                            <CIcon customClassName="nav-icon" icon={cilPeople} /> Administration
                        </>
                    }
                >
                    <Link href="/users" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/users')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Users
                        </CNavItem>
                    </Link>
                    <Link href="/roles" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/roles')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Roles
                        </CNavItem>
                    </Link>
                    <Link href="/contacts" passHref legacyBehavior>
                        <CNavItem component="a" active={pathname.startsWith('/contacts')}>
                            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Contacts
                        </CNavItem>
                    </Link>
                </CNavGroup>
            </CSidebarNav>
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
