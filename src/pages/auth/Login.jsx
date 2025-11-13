/**
 * Login Page (Simplified)
 * Allows anyone to log in with any credentials
 */

import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import { Button, Input } from "../../components/common";
import authService from "../../services/authService";
import toast from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // Accept any credentials - no validation
      await authService.login(formData);
      toast.success('Welcome! Login successful');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      // Even on error, allow access
      toast.success('Welcome! Login successful');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaBuilding className="text-blue-600 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to Office Management System</p>
          <p className="text-sm text-green-600 mt-2 font-medium">✨ Demo Mode: Enter any credentials to explore</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter any email"
            icon={FaEnvelope}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter any password"
            icon={FaLock}
          />

          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login & Explore'}
          </Button>

          {/* Quick Access Button */}
          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              await authService.login({ email: 'demo@example.com', password: 'demo' });
              toast.success('Welcome! Quick access granted');
              navigate('/');
            }}
            className="w-full mt-4 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            🚀 Quick Access (Skip Form)
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

