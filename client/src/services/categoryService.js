import api from './api.js';

export const getCategoriesService = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const createCategoriesService = async (name) => {
    const response = await api.post('/categories', { name });
    return response.data;
};

export const editCategoriesService = async (id, name) => {
    const response = await api.put(`/categories/${id}`, { name });
    return response.data;
};

export const deleteCategoriesService = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

export const switchCategoriesService = async (id) => {
    const response = await api.patch(`/categories/${id}/toggle`);
    return response.data;
};
