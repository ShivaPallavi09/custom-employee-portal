import axios from 'axios';

// Create an Axios instance pointing to our backend API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to automatically attach the JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;