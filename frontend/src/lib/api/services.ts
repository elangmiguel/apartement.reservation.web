import client from './client';

/**
 * Factoría de servicios CRUD genéricos.
 * Proporciona operaciones estándar de consulta, creación, actualización
 * y eliminación sobre un endpoint determinado.
 * @template T Tipo de entidad manejada por el servicio.
 * @param endpoint Ruta base del recurso en la API.
 */
const createCrudService = <T>(endpoint: string) => ({
    /**
     * Obtiene un listado paginado de registros.
     * @param page Número de página (por defecto 0).
     * @param size Cantidad de elementos por página (por defecto 10).
     * @returns Datos devueltos por el servidor.
     */
    getAll: async (page = 0, size = 10) => {
        const response = await client.get(`${endpoint}?page=${page}&size=${size}`);
        return response.data;
    },

    /**
     * Recupera un registro por su identificador.
     * @param id Identificador numérico o cadena del recurso.
     * @returns Datos del recurso solicitado.
     */
    getById: async (id: number | string) => {
        const response = await client.get(`${endpoint}/${id}`);
        return response.data;
    },

    /**
     * Crea un nuevo registro en el backend.
     * @param data Datos parciales del recurso a crear.
     * @returns Recurso creado.
     */
    create: async (data: Partial<T>) => {
        const response = await client.post(endpoint, data);
        return response.data;
    },

    /**
     * Actualiza un registro existente.
     * @param id Identificador del recurso.
     * @param data Datos a actualizar.
     * @returns Recurso actualizado.
     */
    update: async (id: number | string, data: Partial<T>) => {
        const response = await client.put(`${endpoint}/${id}`, data);
        return response.data;
    },

    /**
     * Elimina un recurso por su identificador.
     * @param id Identificador del registro a eliminar.
     */
    delete: async (id: number | string) => {
        await client.delete(`${endpoint}/${id}`);
    },
});

/**
 * Servicio de autenticación.
 * Proporciona operaciones relacionadas con el inicio de sesión.
 */
export const authService = {
    /**
     * Autentica al usuario mediante credenciales.
     * @param credentials Objeto con credenciales de inicio de sesión.
     * @returns Token u objeto de autenticación retornado por la API.
     */
    login: async (credentials: any) => {
        const response = await client.post('/auth/login', credentials);
        return response.data;
    },
};

/** Servicios CRUD específicos basados en la factoría genérica */
export const apartmentService = createCrudService('/apartments');
export const buildingService = createCrudService('/buildings');
export const reservationService = createCrudService('/reservations');
export const userService = createCrudService('/users');
export const roleService = createCrudService('/roles');
export const contactService = createCrudService('/contacts');