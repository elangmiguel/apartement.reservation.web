import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

/**
 * Configuración de fuentes personalizadas utilizando `next/font`.
 * Las variables CSS generadas permiten aplicar la tipografía globalmente.
 */
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

/**
 * Metadatos globales de la aplicación.
 * Next.js utiliza esta información para SEO y configuración del documento.
 */
export const metadata: Metadata = {
	title: "Apartment Reservation System",
	description: "Dashboard for managing apartments and reservations",
};

/**
 * RootLayout define la estructura raíz del documento HTML.
 * Se aplica a todas las páginas de la aplicación.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/**
			 * El atributo `lang` establece el idioma principal del documento.
			 */}
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				{/**
				 * AuthProvider envuelve toda la aplicación, proporcionando
				 * contexto global para autenticación de usuario.
				 */}
				<AuthProvider>
					{/**
					 * Renderiza el contenido dinámico de cada página.
					 */}
					{children}

					{/**
					 * Contenedor global de notificaciones proporcionado por React-Toastify.
					 * Permite mostrar toasts desde cualquier componente de la app.
					 */}
					<ToastContainer />
				</AuthProvider>
			</body>
		</html>
	);
}