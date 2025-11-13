/**
 * Department List Page
 * Display and manage departments
 */

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBuilding, FaEye, FaDownload } from 'react-icons/fa';
import { Table, Button, SearchBar, Loader, Modal } from '../../components/common';
import DepartmentForm from './DepartmentForm';
import departmentService from '../../services/departmentService';
import toast from '../../utils/toast';
import { exportDepartmentsToCSV } from '../../utils/exportCSV';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchDepartments();
  }, [searchTerm]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await departmentService.getAll({ search: searchTerm });
      setDepartments(response.data || []);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError(err.response?.data?.message || 'Failed to load departments');
      setDepartments([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
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
    setSelectedDepartment(null);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    if (sortedDepartments.length === 0) {
      toast.warning('No data to export');
      return;
    }
    exportDepartmentsToCSV(sortedDepartments);
    toast.success('Departments exported successfully!');
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;

    try {
      await departmentService.delete(departmentToDelete._id);
      setIsDeleteModalOpen(false);
      setDepartmentToDelete(null);
      fetchDepartments();
      toast.success('Department deleted successfully!');
    } catch (err) {
      console.error('Error deleting department:', err);
      toast.error(err.response?.data?.message || 'Failed to delete department');
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDepartmentToDelete(null);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
    fetchDepartments();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  // Sort departments
  const sortedDepartments = Array.isArray(departments) 
    ? [...departments].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'employeeCount') {
          aValue = a.employeeCount || 0;
          bValue = b.employeeCount || 0;
        }

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      })
    : [];

  const columns = [
    {
      label: 'Name',
      field: 'name',
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaBuilding className="text-blue-600 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      label: 'Description',
      field: 'description',
      sortable: false,
      render: (value) => (
        <span className="text-gray-600">{value || 'N/A'}</span>
      ),
    },
    {
      label: 'Head of Department',
      field: 'headOfDepartment',
      sortable: true,
      render: (value) => (
        <span className="text-gray-700">{value || 'Not Assigned'}</span>
      ),
    },
    {
      label: 'Employees',
      field: 'employeeCount',
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value || 0}
        </span>
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

  const actions = (department) => (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="primary"
        icon={FaEye}
        onClick={() => handleView(department)}
      >
        View
      </Button>
      <Button
        size="sm"
        variant="outline"
        icon={FaEdit}
        onClick={() => handleEdit(department)}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="danger"
        icon={FaTrash}
        onClick={() => handleDeleteClick(department)}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Departments</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchDepartments}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization's departments
          </p>
        </div>
        <div className="flex space-x-3">
          <Button icon={FaDownload} variant="outline" onClick={handleExport}>
            Export CSV
          </Button>
          <Button icon={FaPlus} onClick={handleAdd}>
            Add Department
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search departments..."
          onSearch={handleSearch}
          className="w-full md:w-96"
        />
      </div>

      {/* Departments Table */}
      {loading ? (
        <Loader text="Loading departments..." />
      ) : (
        <Table
          columns={columns}
          data={sortedDepartments}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          actions={actions}
          emptyMessage="No departments found. Click 'Add Department' to create one."
        />
      )}

      {/* Department Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedDepartment ? 'Edit Department' : 'Add Department'}
        size="md"
      >
        <DepartmentForm
          department={selectedDepartment}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* View Department Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Department Details"
        size="md"
      >
        {selectedDepartment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <p className="text-gray-900 font-semibold">{selectedDepartment.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedDepartment.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedDepartment.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <p className="text-gray-900">{selectedDepartment.description || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Head of Department</label>
                <p className="text-gray-900">{selectedDepartment.headOfDepartment || 'Not Assigned'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Number of Employees</label>
                <p className="text-gray-900">{selectedDepartment.employeeCount || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Created</label>
                <p className="text-gray-900 text-sm">{new Date(selectedDepartment.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                <p className="text-gray-900 text-sm">{new Date(selectedDepartment.updatedAt).toLocaleString()}</p>
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
        title="Delete Department"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center text-red-500 text-5xl">
            <FaTrash />
          </div>
          <p className="text-center text-gray-700">
            Are you sure you want to delete <strong>{departmentToDelete?.name}</strong>?
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

export default DepartmentList;
