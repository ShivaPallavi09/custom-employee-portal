import axiosInstance from '../utils/axiosInstance';

export const getUsers = async () => {
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/admin/users', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(`/admin/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

export const getRoles = async () => {
  const response = await axiosInstance.get('/admin/roles');
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await axiosInstance.get('/admin/audit-logs');
  return response.data;
};