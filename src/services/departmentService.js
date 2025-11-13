/**
 * Department Service
 * API calls for department operations
 */

import api from './api';

const departmentService = {
  // Get all departments
  getAll: async (params) => {
    const response = await api.get('/departments', { params });
    return response.data;
  },

  // Get department by ID
  getById: async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  // Create department
  create: async (departmentData) => {
    const response = await api.post('/departments', departmentData);
    return response.data;
  },

  // Update department
  update: async (id, departmentData) => {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  },

  // Delete department
  delete: async (id) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  },

  // Get department statistics
  getStats: async () => {
    const response = await api.get('/departments/stats');
    return response.data;
  },
};

export default departmentService;
