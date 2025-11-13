/**
 * Department Service
 * API calls for department operations with offline fallback
 */

import api from './api';
import { mockDepartments, mockOperations } from './mockData';

// Check if backend is available
let backendAvailable = true;

const departmentService = {
  // Get all departments
  getAll: async (params) => {
    try {
      const response = await api.get('/departments', { params });
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      console.warn('Backend unavailable, using mock data');
      await mockOperations.delay();
      return {
        success: true,
        count: mockDepartments.length,
        data: mockDepartments
      };
    }
  },

  // Get department by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const dept = mockDepartments.find(d => d._id === id);
      return {
        success: true,
        data: dept || mockDepartments[0]
      };
    }
  },

  // Create department
  create: async (departmentData) => {
    try {
      const response = await api.post('/departments', departmentData);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const newDept = {
        _id: mockOperations.generateId(),
        ...departmentData,
        employeeCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockDepartments.push(newDept);
      return {
        success: true,
        data: newDept,
        message: 'Department created (Demo Mode - Changes not saved)'
      };
    }
  },

  // Update department
  update: async (id, departmentData) => {
    try {
      const response = await api.put(`/departments/${id}`, departmentData);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const index = mockDepartments.findIndex(d => d._id === id);
      if (index !== -1) {
        mockDepartments[index] = {
          ...mockDepartments[index],
          ...departmentData,
          updatedAt: new Date().toISOString()
        };
        return {
          success: true,
          data: mockDepartments[index],
          message: 'Department updated (Demo Mode - Changes not saved)'
        };
      }
      return { success: false, error: 'Department not found' };
    }
  },

  // Delete department
  delete: async (id) => {
    try {
      const response = await api.delete(`/departments/${id}`);
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      const index = mockDepartments.findIndex(d => d._id === id);
      if (index !== -1) {
        mockDepartments.splice(index, 1);
      }
      return {
        success: true,
        message: 'Department deleted (Demo Mode - Changes not saved)'
      };
    }
  },

  // Get department statistics
  getStats: async () => {
    try {
      const response = await api.get('/departments/stats');
      backendAvailable = true;
      return response.data;
    } catch (error) {
      backendAvailable = false;
      await mockOperations.delay();
      return {
        success: true,
        data: mockDepartments.map(dept => ({
          _id: dept._id,
          name: dept.name,
          employeeCount: dept.employeeCount
        }))
      };
    }
  },
};

export default departmentService;
