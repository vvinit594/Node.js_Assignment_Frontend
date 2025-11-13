# 🏢 Office Management System

A comprehensive full-stack web application for managing office departments and employees with a modern, responsive interface and secure authentication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![React](https://img.shields.io/badge/React-v18.2-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v7+-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [License](#license)

## ✨ Features

### Core Features
- **Department Management**: Create, read, update, and delete departments
- **Employee Management**: Comprehensive employee CRUD operations
- **Employee-Department Relationship**: Link employees to departments with automatic reference management
- **Advanced Search & Filtering**: Search by name, filter by department, location, and status
- **Pagination**: Efficient data loading with customizable page sizes
- **Sorting**: Multi-field sorting capabilities

### Advanced Features
- **📊 Interactive Dashboard**: Real-time statistics with pie and bar charts using Recharts
- **🔐 JWT Authentication**: Secure admin login/signup with token-based authentication
- **📥 CSV Export**: Export employee and department data to CSV files
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🔔 Toast Notifications**: User-friendly notifications for all actions
- **🎨 Modern UI**: Clean, professional interface with gradient backgrounds

### Technical Features
- RESTful API architecture
- MongoDB with Mongoose ODM
- Input validation and error handling
- Protected routes with JWT middleware
- Automatic department reference counting
- Password hashing with bcrypt
- CORS enabled for cross-origin requests

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4.18.2)
- **Database**: MongoDB (v7+) with Mongoose (v8.0.3)
- **Authentication**: JWT (jsonwebtoken v9.0.2) + bcryptjs (v2.4.3)
- **Validation**: Express Validator
- **Environment**: dotenv (v16.3.1)
- **Security**: CORS, bcrypt password hashing

### Frontend
- **Library**: React (v18.2.0)
- **Build Tool**: Vite (v5.4.21)
- **Styling**: Tailwind CSS (v3.4.0)
- **Routing**: React Router DOM (v6.21.0)
- **HTTP Client**: Axios (v1.6.2)
- **Charts**: Recharts (v2.15.0)
- **Notifications**: React Toastify (v10.0.6)
- **Icons**: React Icons (v4.12.0)


Images for Refernce :-
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/5925962a-ba00-4bfa-aa28-e2243397dd38" />
<img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/ddb8e451-f8d3-48d1-8974-4cf9c823c1fd" />
<img width="1916" height="981" alt="image" src="https://github.com/user-attachments/assets/a87a967f-a8b0-4657-b037-0d834df83ab5" />
<img width="1919" height="979" alt="image" src="https://github.com/user-attachments/assets/e62076f7-6825-47e5-b21b-09ac34ad1b35" />




## 📁 Project Structure

```
Node.js_Ass/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── departmentController.js
│   │   ├── employeeController.js
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handler
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── Department.js         # Department schema
│   │   ├── Employee.js           # Employee schema
│   │   └── User.js               # User/Admin schema
│   ├── routes/
│   │   ├── departmentRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── authRoutes.js
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── departments/
│   │   │   │   ├── DepartmentForm.jsx
│   │   │   │   └── DepartmentTable.jsx
│   │   │   └── employees/
│   │   │       ├── EmployeeForm.jsx
│   │   │       ├── EmployeeTable.jsx
│   │   │       └── EmployeeFilters.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── departments/
│   │   │   │   └── DepartmentList.jsx
│   │   │   ├── employees/
│   │   │   │   └── EmployeeList.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   ├── authService.js    # Auth API calls
│   │   │   ├── departmentService.js
│   │   │   └── employeeService.js
│   │   ├── utils/
│   │   │   └── toast.js          # Toast configuration
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # React entry point
│   ├── .env                      # Frontend environment variables
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v7 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Node.js_Ass
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The required dependencies will be installed:
# express, mongoose, dotenv, cors, express-validator, jsonwebtoken, bcryptjs
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# The required dependencies will be installed:
# react, react-dom, react-router-dom, axios, tailwind CSS, react-icons,
# recharts, react-toastify, and more
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/office_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=7d
```

⚠️ **Important**: Change `JWT_SECRET` to a strong, unique secret in production!

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Development Mode

**Backend (with auto-reload):**
```bash
cd backend
npm run dev  # If nodemon is configured
```

**Frontend (Vite dev server):**
```bash
cd frontend
npm run dev
```

### Access the Application


- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://127.0.0.1:27017

## 📊 Database Schema

### Department Model
```javascript
{
  name: String (required, unique),
  description: String,
  manager: String,
  employeeCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Employee Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  department: ObjectId (ref: 'Department'),
  position: String (required),
  salary: Number (required, min: 0),
  hireDate: Date (required),
  isActive: Boolean (default: true),
  location: {
    city: String,
    state: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### User Model (Admin)
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: String (default: 'admin'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Initial Data Seeding

The application includes sample data to get started quickly. When you run the backend for the first time, it automatically seeds:

**6 Departments:**
- IT Department
- Human Resources
- Finance
- Marketing
- Operations
- Sales

**18 Employees:**
- 3 employees per department with realistic data including names, emails, positions, salaries, and locations

## 🔐 Authentication

### JWT-Based Authentication Flow

1. **Signup**: Create admin account at `/signup`
2. **Login**: Authenticate at `/login`
3. **Token Storage**: JWT token stored in localStorage
4. **Protected Routes**: All management pages require authentication
5. **Auto-Logout**: Token expires after 7 days
6. **Token Refresh**: Automatic token attachment to API requests

### Authentication Endpoints

```http
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me (Protected)
```

### Creating Your First Admin Account

1. Navigate to http://localhost:5173/signup
2. Fill in the registration form:
   - Name: Your Name
   - Email: admin@example.com
   - Password: (minimum 6 characters)
   - Confirm Password: (must match)
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to the dashboard

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Signup (Public)
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Login (Public)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepassword123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Department Endpoints (All Protected)

#### Get All Departments
```http
GET /api/departments
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "count": 6,
  "data": [...]
}
```

#### Get Single Department
```http
GET /api/departments/:id
Authorization: Bearer <jwt_token>
```

#### Create Department
```http
POST /api/departments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Engineering",
  "description": "Software development team",
  "manager": "John Doe"
}
```

#### Update Department
```http
PUT /api/departments/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "description": "Updated description"
}
```

#### Delete Department
```http
DELETE /api/departments/:id
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "message": "Department deleted successfully"
}
```

### Employee Endpoints (All Protected)

#### Get All Employees (with filters, search, pagination, sorting)
```http
GET /api/employees?page=1&limit=10&search=john&department=dept_id&location=New York&isActive=true&sortBy=firstName&sortOrder=asc
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "count": 18,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 18,
    "pages": 2
  },
  "data": [...]
}
```

#### Get Single Employee
```http
GET /api/employees/:id
Authorization: Bearer <jwt_token>
```

#### Create Employee
```http
POST /api/employees
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "department": "department_id",
  "position": "Software Engineer",
  "salary": 75000,
  "hireDate": "2024-01-15",
  "location": {
    "city": "New York",
    "state": "NY",
    "country": "USA"
  }
}
```

#### Update Employee
```http
PUT /api/employees/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "position": "Senior Software Engineer",
  "salary": 95000
}
```

#### Delete Employee
```http
DELETE /api/employees/:id
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "message": "Employee deleted successfully"
}
```

### Dashboard Statistics (Protected)
```http
GET /api/employees/stats/summary
Authorization: Bearer <jwt_token>

Response: {
  "success": true,
  "data": {
    "totalEmployees": 18,
    "activeEmployees": 17,
    "departmentCount": 6,
    "averageSalary": 71666.67,
    "employeesByDepartment": [...],
    "employeesByLocation": [...]
  }
}
```

## 🎨 Features Walkthrough

### 1. Authentication
- **Signup**: Create new admin account with validation
- **Login**: Secure login with JWT token generation
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Logout**: Clear session and redirect to login page

### 2. Dashboard
- **Statistics Cards**: Total employees, active employees, departments, average salary
- **Pie Chart**: Employee distribution by department
- **Bar Chart**: Employee distribution by location
- **Real-time Updates**: Data refreshes automatically

### 3. Department Management
- **List View**: All departments with employee count
- **Search**: Find departments by name
- **Create**: Add new departments with validation
- **Edit**: Update department information
- **Delete**: Remove departments (with employee count warning)

### 4. Employee Management
- **Advanced Filters**: Department, location, active status
- **Search**: Search by name or email
- **Pagination**: Configurable page size (10, 25, 50, 100)
- **Sorting**: Sort by any column
- **Create**: Add employees with full details
- **Edit**: Update employee information
- **Delete**: Remove employees (updates department count)
- **CSV Export**: Export filtered data to CSV

### 5. Responsive Design
- **Mobile Navigation**: Hamburger menu for small screens
- **Responsive Tables**: Horizontal scroll on mobile
- **Touch-Friendly**: Large click targets for mobile
- **Adaptive Layouts**: Optimized for all screen sizes

## 🔧 Common Issues & Troubleshooting

### MongoDB Connection Error
```
Error: MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the port in `.env` or kill the process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Error
**Solution**: Ensure backend CORS is configured correctly in `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Authentication Not Working
1. Check if JWT_SECRET is set in backend `.env`
2. Clear localStorage in browser console: `localStorage.clear()`
3. Ensure token is being sent in Authorization header
4. Check backend logs for JWT verification errors

## 📝 Development Guidelines

### Code Structure
- Use functional components with React Hooks
- Keep components small and focused
- Use service layer for API calls
- Implement proper error handling
- Follow async/await patterns

### Best Practices
- Validate all user inputs
- Use environment variables for configuration
- Handle errors gracefully with user-friendly messages
- Implement loading states for async operations
- Use meaningful variable and function names
- Comment complex logic

### Security
- Never commit `.env` files
- Use strong JWT secrets in production
- Implement rate limiting for API endpoints
- Validate and sanitize all inputs
- Use HTTPS in production
- Implement proper CORS policies

## 🚀 Deployment

### Backend Deployment (Example with Render/Heroku)
1. Set environment variables in platform settings
2. Update MongoDB URI to production database
3. Set `NODE_ENV=production`
4. Deploy code

### Frontend Deployment (Example with Netlify/Vercel)
1. Update `VITE_API_URL` to production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## 📄 API Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "pagination": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 👥 Author

Your Name - Office Management System

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js community
- MongoDB team
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful charts
- All open-source contributors

---

**Made with ❤️ using Node.js, React, and MongoDB**

For issues and questions, please open an issue on the repository.
