/**
 * Employee Form Component
 * Form for creating and editing employees with location dropdowns
 */

import { useState, useEffect } from 'react';
import { Input, Select, Button } from '../../components/common';
import employeeService from '../../services/employeeService';
import departmentService from '../../services/departmentService';
import locationService from '../../services/locationService';
import toast from '../../utils/toast';

const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    jobTitle: '',
    department: '',
    supervisor: '',
    salary: '',
    hireDate: '',
    country: '',
    state: '',
    city: '',
    address: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Dropdown options
  const [departments, setDepartments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Loading states for dropdowns
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingSupervisors, setLoadingSupervisors] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.split('T')[0] : '',
        gender: employee.gender || '',
        jobTitle: employee.jobTitle || '',
        department: employee.department?._id || employee.department || '',
        supervisor: employee.supervisor?._id || employee.supervisor || '',
        salary: employee.salary || '',
        hireDate: employee.hireDate ? employee.hireDate.split('T')[0] : '',
        country: employee.country || '',
        state: employee.state || '',
        city: employee.city || '',
        address: employee.address || '',
        isActive: employee.isActive !== undefined ? employee.isActive : true,
      });

      // Load location dropdowns if editing
      if (employee.country) {
        fetchStates(employee.country);
        if (employee.state) {
          fetchCities(employee.country, employee.state);
        }
      }
    }
  }, [employee]);

  useEffect(() => {
    if (formData.department) {
      fetchSupervisors(formData.department);
    }
  }, [formData.department]);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      const deptData = response?.data || [];
      setDepartments(deptData.filter(dept => dept.isActive));
    } catch (err) {
      console.error('Error fetching departments:', err);
      setDepartments([]);
    }
  };

  const fetchSupervisors = async (departmentId) => {
    try {
      setLoadingSupervisors(true);
      const response = await employeeService.getPotentialSupervisors(
        employee?._id,
        departmentId
      );
      setSupervisors(response?.data || []);
    } catch (err) {
      console.error('Error fetching supervisors:', err);
      setSupervisors([]);
    } finally {
      setLoadingSupervisors(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await locationService.getCountries();
      const countriesData = response?.data || [];
      // Extract country names if data is array of objects
      const countryNames = Array.isArray(countriesData) 
        ? countriesData.map(c => typeof c === 'string' ? c : c.name || c)
        : [];
      setCountries(countryNames);
    } catch (err) {
      console.error('Error fetching countries:', err);
      setCountries([]);
    }
  };

  const fetchStates = async (country) => {
    try {
      setLoadingStates(true);
      const response = await locationService.getStates(country);
      const statesData = response?.data || [];
      // Extract state names if data is array of objects
      const stateNames = Array.isArray(statesData)
        ? statesData.map(s => typeof s === 'string' ? s : s.name || s)
        : [];
      setStates(stateNames);
    } catch (err) {
      console.error('Error fetching states:', err);
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      setLoadingCities(true);
      const response = await locationService.getCities(country, state);
      const citiesData = response?.data || [];
      // Extract city names if data is array of objects
      const cityNames = Array.isArray(citiesData)
        ? citiesData.map(c => typeof c === 'string' ? c : c.name || c)
        : [];
      setCities(cityNames);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Handle cascading location dropdowns
    if (name === 'country') {
      setFormData((prev) => ({ ...prev, state: '', city: '' }));
      setStates([]);
      setCities([]);
      if (value) {
        fetchStates(value);
      }
    } else if (name === 'state') {
      setFormData((prev) => ({ ...prev, city: '' }));
      setCities([]);
      if (value && formData.country) {
        fetchCities(formData.country, value);
      }
    } else if (name === 'department') {
      setFormData((prev) => ({ ...prev, supervisor: '' }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (formData.salary && isNaN(formData.salary)) {
      newErrors.salary = 'Salary must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        jobTitle: formData.jobTitle.trim(),
        department: formData.department,
        supervisor: formData.supervisor || undefined,
        salary: formData.salary ? Number(formData.salary) : undefined,
        hireDate: formData.hireDate || undefined,
        country: formData.country || undefined,
        state: formData.state || undefined,
        city: formData.city || undefined,
        address: formData.address.trim() || undefined,
        isActive: formData.isActive,
      };

      if (employee) {
        await employeeService.update(employee._id, submitData);
        toast.success('Employee updated successfully!');
      } else {
        await employeeService.create(submitData);
        toast.success('Employee created successfully!');
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving employee:', err);

      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setErrors(backendErrors);
      } else {
        setErrors({
          submit: err.response?.data?.message || 'Failed to save employee',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      {/* Personal Information */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            disabled={loading}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            disabled={loading}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            disabled={loading}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            disabled={loading}
          />
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            disabled={loading}
          />
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            disabled={loading}
          />
        </div>
      </div>

      {/* Employment Information */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Employment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            error={errors.jobTitle}
            required
            disabled={loading}
          />
          <Select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            required
            options={(departments || []).map((dept) => ({
              value: dept._id,
              label: dept.name,
            }))}
            disabled={loading}
          />
          <Select
            label="Supervisor"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            error={errors.supervisor}
            options={(supervisors || []).map((sup) => ({
              value: sup._id,
              label: `${sup.firstName} ${sup.lastName} - ${sup.jobTitle}`,
            }))}
            placeholder={loadingSupervisors ? 'Loading...' : 'Select a supervisor'}
            disabled={loading || loadingSupervisors || !formData.department}
          />
          <Input
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            error={errors.salary}
            disabled={loading}
          />
          <Input
            label="Hire Date"
            name="hireDate"
            type="date"
            value={formData.hireDate}
            onChange={handleChange}
            error={errors.hireDate}
            disabled={loading}
          />
        </div>
      </div>

      {/* Location Information */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Location Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            options={(countries || []).map((country) => ({
              value: country,
              label: country,
            }))}
            disabled={loading}
          />
          <Select
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            options={(states || []).map((state) => ({
              value: state,
              label: state,
            }))}
            placeholder={loadingStates ? 'Loading...' : 'Select a state'}
            disabled={loading || loadingStates || !formData.country}
          />
          <Select
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            options={(cities || []).map((city) => ({
              value: city,
              label: city,
            }))}
            placeholder={loadingCities ? 'Loading...' : 'Select a city'}
            disabled={loading || loadingCities || !formData.state}
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            disabled={loading}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          disabled={loading}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Active Employee
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : employee ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
