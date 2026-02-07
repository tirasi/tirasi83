import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (formData) => api.post('/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const neoAPI = {
  getFeed: (params) => api.get('/neos/feed', { params }),
  getById: (id) => api.get(`/neos/${id}`),
  addToWatchlist: (id) => api.post(`/neos/${id}/watch`),
  removeFromWatchlist: (id) => api.delete(`/neos/${id}/watch`),
};

export const alertAPI = {
  getAlerts: () => api.get('/alerts'),
  getWatchlist: () => api.get('/alerts/watchlist'),
};

export default api;
