import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};