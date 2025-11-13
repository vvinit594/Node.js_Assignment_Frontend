/**
 * Employee List Page
 * Display and manage employees with pagination and filters
 */

import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaUser, FaDownload } from 'react-icons/fa';
import { Table, Button, SearchBar, Loader, Modal, Select, Pagination } from '../../components/common';
import EmployeeForm from './EmployeeForm';
import employeeService from '../../services/employeeService';
import departmentService from '../../services/departmentService';
import toast from '../../utils/toast';
import { exportEmployeesToCSV } from '../../utils/exportCSV';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    jobTitle: '',
    status: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
    limit: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.currentPage,
        limit: pagination.limit,
        search: searchTerm || undefined,
        department: filters.department || undefined,
        jobTitle: filters.jobTitle || undefined,
        isActive: filters.status ? filters.status === 'active' : undefined,
        sort: sortOrder === 'desc' ? `-${sortField}` : sortField,
      };

      const response = await employeeService.getAll(params);
      setEmployees(response.data || []);
      setPagination({
        currentPage: response.pagination?.currentPage || 1,
        totalPages: response.pagination?.totalPages || 1,
        totalEmployees: response.pagination?.total || 0,
        limit: response.pagination?.limit || 10,
      });
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.response?.data?.message || 'Failed to load employees');
      setEmployees([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.limit, searchTerm, filters, sortField, sortOrder]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data || []);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setDepartments([]); // Reset to empty array on error
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    if (employees.length === 0) {
      toast.warning('No data to export');
      return;
    }
    exportEmployeesToCSV(employees);
    toast.success('Employees exported successfully!');
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return;

    try {
      await employeeService.delete(employeeToDelete._id);
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      fetchEmployees();
      toast.success('Employee deleted successfully!');
    } catch (err) {
      console.error('Error deleting employee:', err);
      toast.error(err.response?.data?.message || 'Failed to delete employee');
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const columns = [
    {
      label: 'Name',
      field: 'firstName',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="text-blue-600" />
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900">
              {row.firstName} {row.lastName}
            </div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Job Title',
      field: 'jobTitle',
      sortable: true,
      render: (value) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      label: 'Department',
      field: 'department',
      sortable: true,
      render: (value) => (
        <span className="text-gray-700">
          {value?.name || 'Not Assigned'}
        </span>
      ),
    },
    {
      label: 'Phone',
      field: 'phone',
      sortable: false,
      render: (value) => (
        <span className="text-gray-600">{value || 'N/A'}</span>
      ),
    },
    {
      label: 'Status',
      field: 'isActive',
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const actions = (employee) => (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="primary"
        icon={FaEye}
        onClick={() => handleView(employee)}
      >
        View
      </Button>
      <Button
        size="sm"
        variant="outline"
        icon={FaEdit}
        onClick={() => handleEdit(employee)}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="danger"
        icon={FaTrash}
        onClick={() => handleDeleteClick(employee)}
      >
        Delete
      </Button>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Employees</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchEmployees}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization's employees ({pagination.totalEmployees} total)
          </p>
        </div>
        <div className="flex space-x-3">
          <Button icon={FaDownload} variant="outline" onClick={handleExport}>
            Export CSV
          </Button>
          <Button icon={FaPlus} onClick={handleAdd}>
            Add Employee
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <SearchBar
          placeholder="Search employees by name, email, job title..."
          onSearch={handleSearch}
          className="w-full"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Department"
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            options={departments.map((dept) => ({
              value: dept._id,
              label: dept.name,
            }))}
            placeholder="All Departments"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={filters.jobTitle}
              onChange={handleFilterChange}
              placeholder="Filter by job title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            placeholder="All Status"
          />
        </div>
      </div>

      {/* Employees Table */}
      {loading ? (
        <Loader text="Loading employees..." />
      ) : (
        <>
          <Table
            columns={columns}
            data={employees}
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            actions={actions}
            emptyMessage="No employees found. Click 'Add Employee' to create one."
          />

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalEmployees}
            itemsPerPage={pagination.limit}
            showingFrom={(pagination.currentPage - 1) * pagination.limit + 1}
            showingTo={Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalEmployees
            )}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Employee Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        size="lg"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* View Employee Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Employee Details"
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                <p className="text-gray-900 font-semibold">{selectedEmployee.firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                <p className="text-gray-900 font-semibold">{selectedEmployee.lastName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <p className="text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <p className="text-gray-900">{selectedEmployee.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                <p className="text-gray-900">{selectedEmployee.jobTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                <p className="text-gray-900">{selectedEmployee.department?.name || 'Not Assigned'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Supervisor</label>
                <p className="text-gray-900">
                  {selectedEmployee.supervisor
                    ? `${selectedEmployee.supervisor.firstName} ${selectedEmployee.supervisor.lastName}`
                    : 'None'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Salary</label>
                <p className="text-gray-900">
                  {selectedEmployee.salary ? `$${selectedEmployee.salary.toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date of Joining</label>
                <p className="text-gray-900">{new Date(selectedEmployee.dateOfJoining).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedEmployee.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedEmployee.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {selectedEmployee.address && (
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900">{selectedEmployee.address.street || 'N/A'}</p>
                  <p className="text-gray-900">
                    {selectedEmployee.address.city || 'N/A'}, {selectedEmployee.address.state || 'N/A'}
                  </p>
                  <p className="text-gray-900">
                    {selectedEmployee.address.country || 'N/A'} - {selectedEmployee.address.zipCode || 'N/A'}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Created</label>
                <p className="text-gray-900 text-sm">{new Date(selectedEmployee.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                <p className="text-gray-900 text-sm">{new Date(selectedEmployee.updatedAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setIsViewModalOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        title="Delete Employee"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center text-red-500 text-5xl">
            <FaTrash />
          </div>
          <p className="text-center text-gray-700">
            Are you sure you want to delete{' '}
            <strong>
              {employeeToDelete?.firstName} {employeeToDelete?.lastName}
            </strong>
            ?
          </p>
          <p className="text-center text-sm text-gray-500">
            This action cannot be undone.
          </p>
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleDeleteCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="danger" className="flex-1">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;
