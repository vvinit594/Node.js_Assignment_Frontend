/**
 * CSV Export Utility
 * Functions to export data to CSV format
 */

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object keys
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header];
        
        // Handle nested objects
        if (typeof cell === 'object' && cell !== null) {
          if (cell.name) cell = cell.name; // For department objects
          else if (cell.firstName && cell.lastName) cell = `${cell.firstName} ${cell.lastName}`; // For supervisor objects
          else cell = JSON.stringify(cell);
        }
        
        // Handle null/undefined
        if (cell === null || cell === undefined) cell = '';
        
        // Escape quotes and wrap in quotes if contains comma
        cell = String(cell).replace(/"/g, '""');
        if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
          cell = `"${cell}"`;
        }
        
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportDepartmentsToCSV = (departments) => {
  const data = departments.map(dept => ({
    Name: dept.name,
    Description: dept.description || '',
    'Head of Department': dept.headOfDepartment || '',
    'Employee Count': dept.employeeCount || 0,
    Status: dept.isActive ? 'Active' : 'Inactive',
    'Created At': new Date(dept.createdAt).toLocaleString(),
  }));
  
  const filename = `departments_${new Date().toISOString().split('T')[0]}.csv`;
  exportToCSV(data, filename);
};

export const exportEmployeesToCSV = (employees) => {
  const data = employees.map(emp => ({
    'First Name': emp.firstName,
    'Last Name': emp.lastName,
    Email: emp.email,
    Phone: emp.phone || '',
    'Job Title': emp.jobTitle,
    Department: emp.department?.name || '',
    Supervisor: emp.supervisor ? `${emp.supervisor.firstName} ${emp.supervisor.lastName}` : '',
    Salary: emp.salary || '',
    Country: emp.country || '',
    State: emp.state || '',
    City: emp.city || '',
    Status: emp.isActive ? 'Active' : 'Inactive',
    'Join Date': emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : '',
  }));
  
  const filename = `employees_${new Date().toISOString().split('T')[0]}.csv`;
  exportToCSV(data, filename);
};

export default {
  exportToCSV,
  exportDepartmentsToCSV,
  exportEmployeesToCSV,
};
