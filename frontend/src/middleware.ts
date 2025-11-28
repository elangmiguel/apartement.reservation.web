import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // We can't access localStorage in middleware, so we rely on cookies or just client-side checks.
    // However, for a proper implementation, the token should be stored in a cookie.
    // Since we implemented localStorage in AuthContext, middleware can't verify it easily.
    // BUT, we can check for a cookie if we change AuthContext to set a cookie.

    // For this implementation, we'll skip strict middleware checks for token validity 
    // and rely on the client-side ProtectedRoute or AuthContext to redirect.
    // OR we can update AuthContext to set a cookie.

    // Let's assume we'll update AuthContext to set a cookie named 'token' as well.

    const token = request.cookies.get('token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/apartments') ||
        request.nextUrl.pathname.startsWith('/buildings') ||
        request.nextUrl.pathname.startsWith('/reservations') ||
        request.nextUrl.pathname.startsWith('/users') ||
        request.nextUrl.pathname.startsWith('/roles') ||
        request.nextUrl.pathname.startsWith('/contacts');

    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

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
