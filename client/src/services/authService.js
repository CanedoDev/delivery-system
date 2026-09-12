import api from './api.js';

export const loginService = async (email, password) => {
    // Faz a chamada HTTP para o backend
    const response = await api.post('/auth/login', { email, password });
    
    // Retorna os dados que vieram do servidor: { message, token, user }
    return response.data; 
};
