/**
 * Mock Data Service
 * Provides demo data when backend is unavailable
 */

// Mock Departments
export const mockDepartments = [
  {
    _id: 'dept1',
    name: 'IT Department',
    description: 'Information Technology and Software Development',
    manager: 'John Smith',
    employeeCount: 12,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'dept2',
    name: 'Human Resources',
    description: 'HR and Employee Management',
    manager: 'Sarah Johnson',
    employeeCount: 8,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'dept3',
    name: 'Finance',
    description: 'Financial Planning and Analysis',
    manager: 'Michael Chen',
    employeeCount: 10,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'dept4',
    name: 'Marketing',
    description: 'Marketing and Brand Management',
    manager: 'Emily Davis',
    employeeCount: 15,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'dept5',
    name: 'Sales',
    description: 'Sales and Business Development',
    manager: 'David Wilson',
    employeeCount: 20,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'dept6',
    name: 'Operations',
    description: 'Operations and Logistics',
    manager: 'Lisa Anderson',
    employeeCount: 18,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  }
];

// Mock Employees
export const mockEmployees = [
  {
    _id: 'emp1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1-555-0101',
    department: mockDepartments[0],
    position: 'Senior Software Engineer',
    salary: 95000,
    hireDate: '2023-01-15',
    isActive: true,
    location: { city: 'New York', state: 'NY', country: 'USA' }
  },
  {
    _id: 'emp2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0102',
    department: mockDepartments[1],
    position: 'HR Manager',
    salary: 85000,
    hireDate: '2022-03-20',
    isActive: true,
    location: { city: 'Los Angeles', state: 'CA', country: 'USA' }
  },
  {
    _id: 'emp3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1-555-0103',
    department: mockDepartments[2],
    position: 'Financial Analyst',
    salary: 78000,
    hireDate: '2023-06-10',
    isActive: true,
    location: { city: 'Chicago', state: 'IL', country: 'USA' }
  },
  {
    _id: 'emp4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@company.com',
    phone: '+1-555-0104',
    department: mockDepartments[3],
    position: 'Marketing Specialist',
    salary: 72000,
    hireDate: '2023-08-15',
    isActive: true,
    location: { city: 'San Francisco', state: 'CA', country: 'USA' }
  },
  {
    _id: 'emp5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '+1-555-0105',
    department: mockDepartments[4],
    position: 'Sales Executive',
    salary: 88000,
    hireDate: '2022-11-01',
    isActive: true,
    location: { city: 'Boston', state: 'MA', country: 'USA' }
  },
  {
    _id: 'emp6',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@company.com',
    phone: '+1-555-0106',
    department: mockDepartments[5],
    position: 'Operations Manager',
    salary: 92000,
    hireDate: '2021-09-15',
    isActive: true,
    location: { city: 'Seattle', state: 'WA', country: 'USA' }
  },
  {
    _id: 'emp7',
    firstName: 'James',
    lastName: 'Taylor',
    email: 'james.taylor@company.com',
    phone: '+1-555-0107',
    department: mockDepartments[0],
    position: 'Software Developer',
    salary: 82000,
    hireDate: '2023-04-20',
    isActive: true,
    location: { city: 'Austin', state: 'TX', country: 'USA' }
  },
  {
    _id: 'emp8',
    firstName: 'Emma',
    lastName: 'Martinez',
    email: 'emma.martinez@company.com',
    phone: '+1-555-0108',
    department: mockDepartments[1],
    position: 'HR Coordinator',
    salary: 58000,
    hireDate: '2023-09-10',
    isActive: true,
    location: { city: 'Miami', state: 'FL', country: 'USA' }
  },
  {
    _id: 'emp9',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@company.com',
    phone: '+1-555-0109',
    department: mockDepartments[2],
    position: 'Accountant',
    salary: 68000,
    hireDate: '2022-12-05',
    isActive: true,
    location: { city: 'Denver', state: 'CO', country: 'USA' }
  },
  {
    _id: 'emp10',
    firstName: 'Olivia',
    lastName: 'Garcia',
    email: 'olivia.garcia@company.com',
    phone: '+1-555-0110',
    department: mockDepartments[3],
    position: 'Content Writer',
    salary: 62000,
    hireDate: '2023-07-01',
    isActive: true,
    location: { city: 'Portland', state: 'OR', country: 'USA' }
  }
];

// Generate more mock employees to reach 83 total
for (let i = 11; i <= 83; i++) {
  const deptIndex = i % 6;
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
  const positions = ['Developer', 'Analyst', 'Coordinator', 'Specialist', 'Manager', 'Associate', 'Executive', 'Consultant'];
  
  mockEmployees.push({
    _id: `emp${i}`,
    firstName: `Employee${i}`,
    lastName: `Last${i}`,
    email: `employee${i}@company.com`,
    phone: `+1-555-${String(i).padStart(4, '0')}`,
    department: mockDepartments[deptIndex],
    position: positions[i % positions.length],
    salary: 50000 + (i * 1000),
    hireDate: `2023-0${(i % 12) + 1}-15`,
    isActive: i % 10 !== 0, // Every 10th employee is inactive
    location: {
      city: cities[i % cities.length],
      state: states[i % states.length],
      country: 'USA'
    }
  });
}

// Mock Statistics
export const mockStats = {
  totalEmployees: mockEmployees.length,
  activeEmployees: mockEmployees.filter(e => e.isActive).length,
  departmentCount: mockDepartments.length,
  averageSalary: Math.round(mockEmployees.reduce((sum, e) => sum + e.salary, 0) / mockEmployees.length),
  employeesByDepartment: mockDepartments.map(dept => ({
    _id: dept.name,
    count: mockEmployees.filter(e => e.department._id === dept._id).length
  })),
  employeesByLocation: [
    { _id: 'New York', count: 15 },
    { _id: 'Los Angeles', count: 12 },
    { _id: 'Chicago', count: 10 },
    { _id: 'San Francisco', count: 8 },
    { _id: 'Boston', count: 7 },
    { _id: 'Seattle', count: 6 },
    { _id: 'Austin', count: 5 },
    { _id: 'Other', count: 20 }
  ]
};

// Helper functions for mock operations
export const mockOperations = {
  // Simulate API delay
  delay: (ms = 300) => new Promise(resolve => setTimeout(resolve, ms)),

  // Generate mock ID
  generateId: () => `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  // Filter employees
  filterEmployees: (employees, params = {}) => {
    let filtered = [...employees];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(searchLower) ||
        emp.lastName.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower)
      );
    }

    if (params.department) {
      filtered = filtered.filter(emp => emp.department._id === params.department);
    }

    if (params.location) {
      filtered = filtered.filter(emp => emp.location.city === params.location);
    }

    if (params.isActive !== undefined) {
      filtered = filtered.filter(emp => emp.isActive === (params.isActive === 'true'));
    }

    return filtered;
  },

  // Paginate results
  paginate: (items, page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: items.slice(startIndex, endIndex),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: items.length,
        pages: Math.ceil(items.length / limit)
      }
    };
  }
};
