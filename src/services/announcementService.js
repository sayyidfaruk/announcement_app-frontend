import api from './api';

export const getAnnouncements = async () => {
    const response = await api.get('/announcements',);
    return response.data;
};

export const getAnnouncementById = async (id) => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
};

export const editAnnouncement = async (id, data) => {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
};

export const addAnnouncement = async (data) => {
    const response = await api.post('/announcements', data);
    return response.data;
};

export const deleteAnnouncement = async (id) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
};