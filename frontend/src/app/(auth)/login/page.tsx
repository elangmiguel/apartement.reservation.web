'use client';

import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

/**
 * Componente de interfaz para el formulario de inicio de sesión.
 * Implementado como Client Component debido al uso de hooks y manejo de estado.
 */
const Login = () => {
    /**
     * Hook de autenticación que expone la función `login`.
     */
    const { login } = useAuth();

    /**
     * Estados controlados para capturar credenciales y manejar el estado de carga.
     */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Maneja el envío del formulario.
     * Ejecuta la función de login, muestra notificaciones de éxito o error
     * y controla el estado de carga del botón.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ username, password });
            toast.success('Login successful');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        /**
         * Contenedor principal con fondo y centrado vertical.
         */
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>

                            {/** Tarjeta principal del formulario de login */}
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">Sign In to your account</p>

                                        {/** Campo de nombre de usuario */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        {/** Campo de contraseña */}
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        {/** Botones de acciones */}
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Logging in...' : 'Login'}
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>

                            {/** Tarjeta lateral informativa */}
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Contact your administrator to create an account for the Apartment Reservation System.
                                        </p>
                                        {/**
                                         * En caso de habilitar registro:
                                         * <Link href="/register">
                                         *   <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                         *     Register Now!
                                         *   </CButton>
                                         * </Link>
                                         */}
                                    </div>
                                </CCardBody>
                            </CCard>

                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;