/**
 * Dashboard Page
 * Main dashboard with statistics and overview
 */

import { useState, useEffect } from 'react';
import { FaBuilding, FaUsers, FaUserTie, FaChartLine } from 'react-icons/fa';
import { Card, Loader } from '../components/common';
import departmentService from '../services/departmentService';
import employeeService from '../services/employeeService';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    departments: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    employees: {
      total: 0,
      active: 0,
      inactive: 0,
      byDepartment: [],
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch department and employee stats in parallel
      const [deptStats, empStats] = await Promise.all([
        departmentService.getStats(),
        employeeService.getStats(),
      ]);

      setStats({
        departments: deptStats || { total: 0, active: 0, inactive: 0 },
        employees: empStats || { total: 0, active: 0, inactive: 0, byDepartment: [] },
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the Office Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Departments"
          value={stats.departments.total}
          icon={FaBuilding}
          color="blue"
        />
        <Card
          title="Active Departments"
          value={stats.departments.active}
          icon={FaBuilding}
          color="green"
        />
        <Card
          title="Total Employees"
          value={stats.employees.total}
          icon={FaUsers}
          color="purple"
        />
        <Card
          title="Active Employees"
          value={stats.employees.active}
          icon={FaUserTie}
          color="indigo"
        />
      </div>

      {/* Department Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Departments by Status */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Department Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Active Departments</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {stats.departments.active}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Inactive Departments</span>
              </div>
              <span className="text-2xl font-bold text-red-600">
                {stats.departments.inactive}
              </span>
            </div>
          </div>
        </Card>

        {/* Employees by Status */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Active Employees</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {stats.employees.active}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Inactive Employees</span>
              </div>
              <span className="text-2xl font-bold text-red-600">
                {stats.employees.inactive}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      {stats.employees.byDepartment && stats.employees.byDepartment.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Department Distribution */}
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-600" />
              Department Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.employees.byDepartment.map(dept => ({
                    name: dept._id || 'No Department',
                    value: dept.count
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.employees.byDepartment.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'][index % 6]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart - Employees by Department */}
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaUsers className="mr-2 text-purple-600" />
              Employees by Department
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.employees.byDepartment.map(dept => ({
                  name: dept._id || 'No Dept',
                  employees: dept.count
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="employees" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Employees by Department Table */}
      {stats.employees.byDepartment && stats.employees.byDepartment.length > 0 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaChartLine className="mr-2 text-blue-600" />
            Detailed Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    Total Employees
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.employees.byDepartment.map((dept, index) => (
                  <tr
                    key={dept._id || index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {dept._id || 'No Department'}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {dept.count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {stats.employees.total > 0
                        ? ((dept.count / stats.employees.total) * 100).toFixed(1)
                        : 0}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/departments"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <FaBuilding className="text-3xl text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-gray-800">Manage Departments</h3>
              <p className="text-sm text-gray-600">View and manage all departments</p>
            </div>
          </a>
          <a
            href="/employees"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <FaUsers className="text-3xl text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-gray-800">Manage Employees</h3>
              <p className="text-sm text-gray-600">View and manage all employees</p>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
