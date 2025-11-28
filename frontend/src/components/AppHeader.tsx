'use client';

import React from 'react';
import Link from 'next/link';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavItem,
    CNavLink,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
    CAvatar,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu, cilBell, cilList, cilEnvelopeOpen, cilUser, cilSettings, cilAccountLogout } from '@coreui/icons';
import { useAuth } from '@/contexts/AuthContext';

const AppHeader = () => {
    const { logout } = useAuth();

    return (
        <CHeader position="sticky" className="mb-4 p-0">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => {
                        // Toggle sidebar logic if needed
                    }}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none" as={Link} href="/">
                    <CIcon icon={cilList} height={48} />
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink href="/dashboard">Dashboard</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="/users">Users</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Settings</CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilList} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg" />
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <CDropdown variant="nav-item">
                        <CDropdownToggle className="py-0" caret={false}>
                            <CAvatar color="secondary" size="md">U</CAvatar>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0">
                            <CDropdownItem href="#">
                                <CIcon icon={cilUser} className="me-2" />
                                Profile
                            </CDropdownItem>
                            <CDropdownItem href="#">
                                <CIcon icon={cilSettings} className="me-2" />
                                Settings
                            </CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem onClick={logout} style={{ cursor: 'pointer' }}>
                                <CIcon icon={cilAccountLogout} className="me-2" />
                                Logout
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid>
                {/* Breadcrumbs could go here */}
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
