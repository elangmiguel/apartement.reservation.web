import axios from 'axios';

/**
 * Cliente HTTP preconfigurado utilizando Axios.
 * Este módulo centraliza la comunicación con el backend y administra
 * autenticación basada en tokens almacenados en el navegador.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088/api';

/**
 * Instancia de Axios con configuración base:
 * - `baseURL` define el endpoint raíz del backend.
 * - Se establece el encabezado estándar `Content-Type`.
 */
const client = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * Interceptor de solicitud.
 * Inserta dinámicamente el token de autenticación (si existe) en las
 * cabeceras antes de enviar cualquier petición al backend.
 *
 * Esta lógica solo se ejecuta en entorno de navegador, ya que utiliza
 * `localStorage`.
 */
client.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

/**
 * Interceptor de respuesta.
 * Maneja errores de autenticación (HTTP 401). Si el backend indica que
 * el token no es válido o ha expirado:
 * - elimina el token almacenado,
 * - redirige al usuario a la página de inicio de sesión.
 */
client.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('token');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

/**
 * Exportación del cliente HTTP para uso en servicios y componentes.
 */
export default client;