'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Página principal del sistema.
 * Este componente actúa como punto de entrada y realiza una redirección
 * automática hacia el dashboard utilizando navegación del lado del cliente.
 */
export default function Home() {
	/**
	 * Hook de Next.js que proporciona el objeto de enrutamiento
	 * para efectuar redirecciones programáticas.
	 */
	const router = useRouter();

	/**
	 * Efecto que se ejecuta una vez al montar el componente.
	 * Realiza una redirección inmediata hacia la ruta "/dashboard".
	 */
	useEffect(() => {
		router.push('/dashboard');
	}, [router]);

	/**
	 * Contenido mostrado temporalmente mientras ocurre la redirección.
	 * Se incluye un contenedor centrado vertical y horizontalmente.
	 */
	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100">
			<p>Redirecting to dashboard...</p>
		</div>
	);
}