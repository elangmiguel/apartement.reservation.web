'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/lib/api/services';
import { useRouter } from 'next/navigation';

/**
 * Tipo que define la estructura del contexto de autenticación.
 * Contiene información del usuario, el token actual y operaciones
 * para iniciar y cerrar sesión, así como indicadores de estado.
 */
interface AuthContextType {
    user: any;
    token: string | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

/**
 * Contexto central de autenticación.
 * Se inicializa con null para obligar al uso del proveedor.
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Proveedor del contexto de autenticación.
 * Gestiona el estado del usuario, el token JWT y la lógica de persistencia.
 * Encapsula las operaciones de login y logout y expone indicadores de estado
 * para el resto de la aplicación.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    /** Usuario actualmente autenticado. */
    const [user, setUser] = useState<any>(null);

    /** Token JWT almacenado en memoria. */
    const [token, setToken] = useState<string | null>(null);

    /** Indicador de carga inicial. */
    const [loading, setLoading] = useState(true);

    /** Controlador de navegación de Next.js. */
    const router = useRouter();

    /**
     * Efecto inicial: verifica si existe un token persistido en localStorage.
     * Si se encuentra, se asume que el usuario está autenticado.
     * Esta lógica puede ampliarse para cargar información del usuario
     * a partir del token.
     */
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // En este punto podría consultarse información del usuario.
        }
        setLoading(false);
    }, []);

    /**
     * Inicia sesión llamando al servicio de autenticación.
     * Almacena el token en memoria, localStorage y cookies.
     * Redirige al panel principal tras autenticarse.
     */
    const login = async (credentials: any) => {
        try {
            const response = await authService.login(credentials);
            const { token } = response;

            setToken(token);
            localStorage.setItem('token', token);

            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict`;

            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    /**
     * Cierra sesión eliminando el token de todos los mecanismos de persistencia
     * y redirigiendo al usuario a la pantalla de login.
     */
    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem('token');

        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook de acceso al contexto de autenticación.
 * Garantiza que solo pueda utilizarse dentro de un AuthProvider.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};