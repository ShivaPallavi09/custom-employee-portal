import axiosInstance from '../utils/axiosInstance';

export const fetchZohoData = async (serviceName) => {
  const response = await axiosInstance.get(`/zoho/${serviceName}`);
  return response.data;
};