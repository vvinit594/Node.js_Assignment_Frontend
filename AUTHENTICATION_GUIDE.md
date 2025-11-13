# 🔐 Authentication Implementation Guide

## Overview
This Office Management System now includes a complete JWT-based authentication system for admin access.

## What Was Implemented

### Backend Components

1. **User Model** (`backend/models/User.js`)
   - Stores admin credentials
   - Password hashing with bcrypt (10 salt rounds)
   - Email validation and uniqueness
   - Password is automatically hashed before saving
   - `comparePassword()` method for login verification

2. **Authentication Controller** (`backend/controllers/authController.js`)
   - `signup`: Register new admin with validation
   - `login`: Authenticate admin and return JWT token
   - `getMe`: Get current logged-in admin info
   - JWT tokens expire after 7 days

3. **Authentication Middleware** (`backend/middleware/auth.js`)
   - `protect`: Verifies JWT token from Authorization header
   - Attaches user to `req.user` for protected routes
   - `authorize`: Role-based access control

4. **Authentication Routes** (`backend/routes/authRoutes.js`)
   - `POST /api/auth/signup` - Public
   - `POST /api/auth/login` - Public
   - `GET /api/auth/me` - Protected

### Frontend Components

1. **Auth Service** (`frontend/src/services/authService.js`)
   - `signup(userData)`: Register new admin
   - `login(email, password)`: Login and store token
   - `logout()`: Clear session
   - `getCurrentUser()`: Get user from localStorage
   - `getToken()`: Get JWT token
   - `isAuthenticated()`: Check if user is logged in

2. **Login Page** (`frontend/src/pages/auth/Login.jsx`)
   - Email and password form
   - Form validation
   - Success/error notifications
   - Redirect to dashboard after login
   - Gradient blue-purple background

3. **Signup Page** (`frontend/src/pages/auth/Signup.jsx`)
   - Name, email, password, confirm password fields
   - Password matching validation
   - Success/error notifications
   - Redirect to dashboard after signup
   - Gradient purple-blue background

4. **Protected Route Component** (`frontend/src/components/auth/ProtectedRoute.jsx`)
   - Wraps protected pages
   - Redirects to `/login` if not authenticated
   - Uses `authService.isAuthenticated()`

5. **Updated Navbar** (`frontend/src/components/layout/Navbar.jsx`)
   - Displays current user's name
   - Logout button with icon
   - User profile icon
   - Mobile-responsive logout

6. **Updated App Routing** (`frontend/src/App.jsx`)
   - Public routes: `/login`, `/signup`
   - Protected routes: `/`, `/departments`, `/employees`
   - All management pages wrapped with `ProtectedRoute`
   - Catch-all redirect to dashboard

## How It Works

### Authentication Flow

```
1. User visits the application
   ↓
2. Not authenticated → Redirected to /login
   ↓
3. User clicks "Sign Up" → Goes to /signup
   ↓
4. Fills registration form (name, email, password)
   ↓
5. Backend creates user with hashed password
   ↓
6. Backend generates JWT token (expires in 7 days)
   ↓
7. Frontend stores token and user data in localStorage
   ↓
8. User is redirected to dashboard
   ↓
9. All API requests include token in Authorization header
   ↓
10. User clicks "Logout" → Token removed, redirected to /login
```

### Token Management

- **Storage**: localStorage (keys: `token`, `user`)
- **Format**: Bearer token in Authorization header
- **Expiration**: 7 days
- **Auto-Injection**: Axios interceptor adds token to all API requests

### Protected Routes

All these routes require authentication:
- `/` - Dashboard
- `/departments` - Department Management
- `/employees` - Employee Management

Public routes:
- `/login` - Login page
- `/signup` - Registration page

## Testing the Authentication

### 1. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 2. Create Your First Admin Account

1. Navigate to http://localhost:5173
2. You'll be automatically redirected to `/login`
3. Click "Don't have an account? Sign Up"
4. Fill in the signup form:
   ```
   Name: Admin User
   Email: admin@example.com
   Password: admin123
   Confirm Password: admin123
   ```
5. Click "Sign Up"
6. You'll be logged in and redirected to the dashboard

### 3. Test Protected Routes

1. Try accessing http://localhost:5173/departments
2. If logged in, you'll see the departments page
3. If not logged in, you'll be redirected to `/login`

### 4. Test Logout

1. Click your name in the navbar (top right)
2. Click the "Logout" button
3. You'll be redirected to `/login`
4. Try accessing any protected route - you'll be redirected to login

### 5. Test Login

1. Go to http://localhost:5173/login
2. Enter your credentials:
   ```
   Email: admin@example.com
   Password: admin123
   ```
3. Click "Login"
4. You'll be redirected to the dashboard

## API Testing with Postman/Thunder Client

### 1. Signup Request

```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 2. Login Request

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 3. Get Current User (Protected)

```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65f1234567890abcdef12345",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 4. Access Protected Endpoint (e.g., Get Employees)

```http
GET http://localhost:5000/api/employees
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Without token, you'll get:**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

## Security Features

1. **Password Hashing**: 
   - Uses bcryptjs with 10 salt rounds
   - Original password never stored in database

2. **JWT Tokens**:
   - Signed with secret key from environment variable
   - Cannot be forged without the secret
   - Expire after 7 days

3. **Protected Routes**:
   - Backend middleware verifies token on every request
   - Frontend ProtectedRoute prevents unauthorized access

4. **Input Validation**:
   - Email format validation
   - Password minimum length (6 characters)
   - Password confirmation matching
   - Unique email constraint

5. **Error Handling**:
   - User-friendly error messages
   - No sensitive information leaked
   - Toast notifications for feedback

## Environment Variables

Make sure these are set in `backend/.env`:

```env
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=7d
```

⚠️ **Important**: Change `JWT_SECRET` to a strong random string in production!

## Troubleshooting

### Problem: "Not authorized to access this route"

**Solutions:**
1. Check if you're logged in
2. Verify token exists in localStorage: `localStorage.getItem('token')`
3. Check if token is expired (7 days)
4. Clear localStorage and login again: `localStorage.clear()`

### Problem: "Invalid credentials"

**Solutions:**
1. Verify email and password are correct
2. Check if user exists in database
3. Try signup if you haven't created an account

### Problem: Token not being sent to backend

**Solutions:**
1. Check `frontend/src/services/api.js` has interceptor
2. Verify Authorization header format: `Bearer <token>`
3. Check browser console for errors

### Problem: Redirect loop

**Solutions:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Check browser console for errors

## Features Summary

✅ **Implemented:**
- JWT-based authentication
- Admin signup and login
- Password hashing with bcrypt
- Protected routes (backend & frontend)
- Token storage in localStorage
- Auto-redirect for unauthenticated users
- Logout functionality
- User info display in navbar
- Token auto-injection in API requests
- 7-day token expiration

✅ **Security:**
- Password hashing
- JWT token signing
- Protected API endpoints
- Input validation
- Secure token storage

✅ **User Experience:**
- Clean login/signup pages
- Form validation
- Success/error notifications
- Auto-redirect after login
- Easy logout
- Responsive design

## Next Steps (Optional Enhancements)

If you want to extend the authentication system:

1. **Password Reset**: Implement forgot password flow
2. **Email Verification**: Verify email addresses
3. **Refresh Tokens**: Implement token refresh
4. **Remember Me**: Add remember me checkbox
5. **Multi-Factor Authentication**: Add 2FA support
6. **Session Management**: Track active sessions
7. **Role-Based Access**: Different roles (admin, manager, user)
8. **Password Strength**: Add password strength indicator
9. **Login History**: Track login attempts
10. **Rate Limiting**: Prevent brute force attacks

## Conclusion

The authentication system is now fully functional and integrated with the Office Management System. All management features (Dashboard, Departments, Employees) are now protected and require authentication to access.

**Quick Start:**
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to http://localhost:5173
4. Click "Sign Up" to create your admin account
5. Start managing your office!

For any issues or questions, refer to the main README.md or the troubleshooting section above.
