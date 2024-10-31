// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan base URL API Anda
});

// Tambahkan interceptor untuk menyisipkan token di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Cek apakah error dari token kadaluarsa
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Cegah permintaan refresh token berulang
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('/auth/refresh-token', {
            refreshToken: refreshToken,
          });
  
          const newAccessToken = response.data.accessToken;
  
          // Simpan accessToken yang baru di local storage
          localStorage.setItem('accessToken', newAccessToken);
  
          // Update header Authorization pada permintaan asli
          api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
          // Ulangi permintaan dengan token yang baru
          return api(originalRequest);
        } catch (err) {
          // Redirect ke halaman login jika refresh token juga kadaluarsa
          console.error('Refresh token is expired or invalid', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
  
export default api;
