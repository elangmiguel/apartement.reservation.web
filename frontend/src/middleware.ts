import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware de control de acceso basado en autenticación mediante cookie.
 * Este componente se ejecuta antes de que Next.js resuelva la ruta solicitada.
 * Su propósito es restringir el acceso a rutas protegidas y gestionar
 * redirecciones según el estado de autenticación del usuario.
 */
export function middleware(request: NextRequest) {
    /**
     * Token de autenticación almacenado en las cookies del cliente.
     * Si no existe, el usuario se considera no autenticado.
     */
    const token = request.cookies.get('token')?.value;

    /**
     * Determina si la ruta solicitada corresponde a la página de autenticación.
     */
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');

    /**
     * Conjunto de rutas protegidas que requieren autenticación.
     * Se identifican por prefijos relacionados con las secciones del sistema.
     */
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/apartments') ||
        request.nextUrl.pathname.startsWith('/buildings') ||
        request.nextUrl.pathname.startsWith('/reservations') ||
        request.nextUrl.pathname.startsWith('/users') ||
        request.nextUrl.pathname.startsWith('/roles') ||
        request.nextUrl.pathname.startsWith('/contacts');

    /**
     * Regla 1: si el usuario no está autenticado e intenta acceder
     * a una ruta protegida, se redirige a la página de inicio de sesión.
     */
    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    /**
     * Regla 2: si el usuario ya está autenticado e intenta acceder
     * a la página de login, se redirige al panel principal.
     */
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    /**
     * Si ninguna regla aplica, la petición continúa sin modificaciones.
     */
    return NextResponse.next();
}

/**
 * Configuración del middleware.
 * El parámetro `matcher` define las rutas donde este middleware debe ejecutarse.
 */
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/apartments/:path*',
        '/buildings/:path*',
        '/reservations/:path*',
        '/users/:path*',
        '/roles/:path*',
        '/contacts/:path*',
        '/login'
    ],
};