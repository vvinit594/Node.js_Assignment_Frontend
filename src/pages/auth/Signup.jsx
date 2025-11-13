/**
 * Signup Page (Simplified)
 * Allows anyone to sign up with any credentials
 */

import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import { Button, Input } from "../../components/common";
import authService from "../../services/authService";
import toast from "../../utils/toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      const { confirmPassword, ...signupData } = formData;
      await authService.signup(signupData);
      toast.success('Welcome! Account created successfully');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      // Even on error, allow access
      toast.success('Welcome! Account created successfully');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <FaBuilding className="text-purple-600 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up for Office Management System</p>
          <p className="text-sm text-green-600 mt-2 font-medium">✨ Demo Mode: Enter any details to explore</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter any name"
            icon={FaUser}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
            {loading ? 'Creating Account...' : 'Sign Up & Explore'}
          </Button>

          {/* Quick Access Button */}
          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              await authService.signup({ name: 'Demo User', email: 'demo@example.com', password: 'demo' });
              toast.success('Welcome! Quick access granted');
              navigate('/');
            }}
            className="w-full mt-4 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            🚀 Quick Access (Skip Form)
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

