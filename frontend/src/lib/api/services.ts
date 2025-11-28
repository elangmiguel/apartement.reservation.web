import client from './client';

// Generic CRUD service
const createCrudService = <T>(endpoint: string) => ({
    getAll: async (page = 0, size = 10) => {
        const response = await client.get(`${endpoint}?page=${page}&size=${size}`);
        return response.data;
    },
    getById: async (id: number | string) => {
        const response = await client.get(`${endpoint}/${id}`);
        return response.data;
    },
    create: async (data: Partial<T>) => {
        const response = await client.post(endpoint, data);
        return response.data;
    },
    update: async (id: number | string, data: Partial<T>) => {
        const response = await client.put(`${endpoint}/${id}`, data);
        return response.data;
    },
    delete: async (id: number | string) => {
        await client.delete(`${endpoint}/${id}`);
    },
});

export const authService = {
    login: async (credentials: any) => {
        const response = await client.post('/auth/login', credentials);
        return response.data;
    },
};

export const apartmentService = createCrudService('/apartments');
export const buildingService = createCrudService('/buildings');
export const reservationService = createCrudService('/reservations');
export const userService = createCrudService('/users');
export const roleService = createCrudService('/roles');
export const contactService = createCrudService('/contacts');
