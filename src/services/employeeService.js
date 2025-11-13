/**
 * Employee Service
 * API calls for employee operations
 */

import api from './api';

const employeeService = {
  // Get all employees with query parameters
  getAll: async (params = {}) => {
    const response = await api.get('/employees', { params });
    return response.data;
  },

  // Get employee by ID
  getById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  // Create employee
  create: async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  // Update employee
  update: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  // Delete employee
  delete: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },

  // Get potential supervisors
  getPotentialSupervisors: async (employeeId = null, departmentId = null) => {
    const params = {};
    if (employeeId) params.employeeId = employeeId;
    if (departmentId) params.departmentId = departmentId;
    
    const response = await api.get('/employees/supervisors/list', { params });
    return response.data;
  },

  // Get employee statistics
  getStats: async () => {
    const response = await api.get('/employees/stats');
    return response.data;
  },

  // Search employees
  search: async (searchTerm, filters = {}) => {
    const params = { search: searchTerm, ...filters };
    const response = await api.get('/employees', { params });
    return response.data;
  },
};

export default employeeService;
