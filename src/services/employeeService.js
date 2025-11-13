/**
 * Employee Service
 * API calls for employee operations with offline fallback
 */

import api from './api';
import { mockEmployees, mockStats, mockOperations } from './mockData';

// Check if backend is available
let backendAvailable = true;

const employeeService = {
  // Get all employees with query parameters
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/employees', { params });
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      console.warn('Backend unavailable, using mock data');
      await mockOperations.delay();
      
      const filtered = mockOperations.filterEmployees(mockEmployees, params);
      const paginated = mockOperations.paginate(
        filtered,
        params.page || 1,
        params.limit || 10
      );
      
      return {
        success: true,
        count: filtered.length,
        ...paginated
      };
    }
  },

  // Get employee by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const emp = mockEmployees.find(e => e._id === id);
      return {
        success: true,
        data: emp || mockEmployees[0]
      };
    }
  },

  // Create employee
  create: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const newEmp = {
        _id: mockOperations.generateId(),
        ...employeeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockEmployees.push(newEmp);
      return {
        success: true,
        data: newEmp,
        message: 'Employee created (Demo Mode - Changes not saved)'
      };
    }
  },

  // Update employee
  update: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const index = mockEmployees.findIndex(e => e._id === id);
      if (index !== -1) {
        mockEmployees[index] = {
          ...mockEmployees[index],
          ...employeeData,
          updatedAt: new Date().toISOString()
        };
        return {
          success: true,
          data: mockEmployees[index],
          message: 'Employee updated (Demo Mode - Changes not saved)'
        };
      }
      return { success: false, error: 'Employee not found' };
    }
  },

  // Delete employee
  delete: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const index = mockEmployees.findIndex(e => e._id === id);
      if (index !== -1) {
        mockEmployees.splice(index, 1);
      }
      return {
        success: true,
        message: 'Employee deleted (Demo Mode - Changes not saved)'
      };
    }
  },

  // Get potential supervisors
  getPotentialSupervisors: async (employeeId = null, departmentId = null) => {
    try {
      const params = {};
      if (employeeId) params.employeeId = employeeId;
      if (departmentId) params.departmentId = departmentId;
      
      const response = await api.get('/employees/supervisors/list', { params });
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      let supervisors = mockEmployees.filter(e => e.isActive);
      if (employeeId) {
        supervisors = supervisors.filter(e => e._id !== employeeId);
      }
      if (departmentId) {
        supervisors = supervisors.filter(e => e.department._id === departmentId);
      }
      return {
        success: true,
        data: supervisors.slice(0, 20)
      };
    }
  },

  // Get employee statistics
  getStats: async () => {
    try {
      const response = await api.get('/employees/stats');
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      console.warn('Backend unavailable, using mock stats');
      await mockOperations.delay();
      return {
        success: true,
        data: mockStats
      };
    }
  },

  // Search employees
  search: async (searchTerm, filters = {}) => {
    try {
      const params = { search: searchTerm, ...filters };
      const response = await api.get('/employees', { params });
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const filtered = mockOperations.filterEmployees(
        mockEmployees,
        { search: searchTerm, ...filters }
      );
      return {
        success: true,
        count: filtered.length,
        data: filtered
      };
    }
  },
};

export default employeeService;
