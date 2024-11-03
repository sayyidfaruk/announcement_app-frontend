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

export const updateUser = async (data) => {
    const response = await api.put('/auth/user-update', data);
    return response.data;
}

export const changePassword = async (newPassword) => {
    const response = await api.put('/auth/change-password', { newPassword });
    return response.data;
}