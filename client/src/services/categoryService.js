import api from './api.js';

export const getCategoriesService = async () => {
    // Faz a chamada HTTP para o backend
    const response = await api.get('/categories');

    // Retorna os dados que vieram do servidor: { message, token, user }
    return response.data;
};

export const createCategoriesService = async (name, description) => {
    // Faz a chamada HTTP para o backend
    const response = await api.post('/categories', { name, description });

    // Retorna os dados que vieram do servidor: { message, token, user }
    return response.data;
};
