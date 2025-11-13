# 🧪 API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Test All Endpoints

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 📊 DEPARTMENT ENDPOINTS

### 1.1 Get All Departments
```bash
GET http://localhost:5000/api/departments
```

### 1.2 Get Department by ID
```bash
GET http://localhost:5000/api/departments/{id}
```

### 1.3 Create Department
```bash
POST http://localhost:5000/api/departments
Content-Type: application/json

{
  "name": "Human Resources",
  "description": "Manages employee relations, recruitment, and benefits"
}
```

### 1.4 Update Department
```bash
PUT http://localhost:5000/api/departments/{id}
Content-Type: application/json

{
  "name": "Human Resources Updated",
  "description": "Updated description",
  "isActive": true
}
```

### 1.5 Delete Department
```bash
DELETE http://localhost:5000/api/departments/{id}
```

### 1.6 Get Department Statistics
```bash
GET http://localhost:5000/api/departments/stats
```

---

## 👤 EMPLOYEE ENDPOINTS

### 2.1 Get All Employees (with Pagination)
```bash
GET http://localhost:5000/api/employees?page=1&limit=10
```

### 2.2 Search Employees by Name
```bash
GET http://localhost:5000/api/employees?search=john
```

### 2.3 Filter by Department
```bash
GET http://localhost:5000/api/employees?department={departmentId}
```

### 2.4 Filter by Job Title
```bash
GET http://localhost:5000/api/employees?jobTitle=engineer
```

### 2.5 Combined Search & Filter
```bash
GET http://localhost:5000/api/employees?search=john&department={departmentId}&page=1&limit=10
```

### 2.6 Get Employee by ID
```bash
GET http://localhost:5000/api/employees/{id}
```

### 2.7 Create Employee
```bash
POST http://localhost:5000/api/employees
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phone": "123-456-7890",
  "jobTitle": "Software Engineer",
  "department": "{departmentId}",
  "supervisor": "{supervisorId}",
  "country": "United States",
  "state": "California",
  "city": "San Francisco",
  "address": "123 Tech Street",
  "zipCode": "94102",
  "salary": 75000,
  "gender": "Male"
}
```

### 2.8 Update Employee
```bash
PUT http://localhost:5000/api/employees/{id}
Content-Type: application/json

{
  "jobTitle": "Senior Software Engineer",
  "salary": 85000
}
```

### 2.9 Delete Employee
```bash
DELETE http://localhost:5000/api/employees/{id}
```

### 2.10 Get Potential Supervisors
```bash
GET http://localhost:5000/api/employees/supervisors/list?employeeId={id}
```

### 2.11 Get Employee Statistics
```bash
GET http://localhost:5000/api/employees/stats
```

---

## 🌍 LOCATION ENDPOINTS (External API)

### 3.1 Get All Countries
```bash
GET http://localhost:5000/api/locations/countries
```

### 3.2 Search Countries
```bash
GET http://localhost:5000/api/locations/countries?search=united
```

### 3.3 Get States by Country
```bash
GET http://localhost:5000/api/locations/states/United%20States
```

### 3.4 Get Cities by State
```bash
GET http://localhost:5000/api/locations/cities/United%20States/California
```

### 3.5 Get Country Details
```bash
GET http://localhost:5000/api/locations/country-details/United%20States
```

---

## 🧪 Quick Test Sequence

### Step 1: Create a Department
```json
POST /api/departments
{
  "name": "Engineering",
  "description": "Software Development Team"
}
```
**Save the `_id` from response**

### Step 2: Create a Supervisor
```json
POST /api/employees
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "phone": "555-123-4567",
  "jobTitle": "Engineering Manager",
  "department": "{departmentId from step 1}",
  "country": "United States",
  "state": "California",
  "city": "San Francisco",
  "salary": 95000
}
```
**Save the `_id` from response**

### Step 3: Create an Employee with Supervisor
```json
POST /api/employees
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phone": "555-987-6543",
  "jobTitle": "Software Engineer",
  "department": "{departmentId from step 1}",
  "supervisor": "{supervisorId from step 2}",
  "country": "United States",
  "state": "California",
  "city": "San Francisco",
  "salary": 75000
}
```

### Step 4: Test Search
```bash
GET /api/employees?search=john
```

### Step 5: Test Filter
```bash
GET /api/employees?department={departmentId}
```

### Step 6: Get Statistics
```bash
GET /api/departments/stats
GET /api/employees/stats
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "count": 10,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error"
}
```

---

## 🔍 Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)

### Sorting
- `sort` - Sort by field (e.g., `sort=firstName` or `sort=-createdAt`)
- Use `-` prefix for descending order

### Filtering
- `search` - Search term
- `department` - Filter by department ID
- `jobTitle` - Filter by job title
- `isActive` - Filter by status (true/false)
- `country`, `state`, `city` - Location filters

---

## ✅ Testing Checklist

- [ ] Health check endpoint
- [ ] Create department
- [ ] Get all departments
- [ ] Get department by ID
- [ ] Update department
- [ ] Delete department
- [ ] Create employee
- [ ] Get all employees
- [ ] Search employees
- [ ] Filter employees by department
- [ ] Filter employees by job title
- [ ] Get employee by ID
- [ ] Update employee
- [ ] Delete employee
- [ ] Get potential supervisors
- [ ] Get countries
- [ ] Get states
- [ ] Get cities
- [ ] Pagination working
- [ ] Statistics endpoints

---

**All endpoints are now ready for testing!** 🚀
