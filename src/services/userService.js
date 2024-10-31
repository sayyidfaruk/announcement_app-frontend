import api from './api';

export const getUsers = async () => {
    const response = await api.get('/auth/users');
    return response.data;
};

export const addUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/auth/user/${id}`);
    return response.data;
};