import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadDataset = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/upload`, formData);
};

export const executeQuery = (query) => {
  return axios.post(`${API_URL}/query`, { query });
};