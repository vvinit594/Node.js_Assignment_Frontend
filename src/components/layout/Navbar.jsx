/**
 * Navbar Component
 * Main navigation bar
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaChartBar, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import authService from '../../services/authService';
import toast from '../../utils/toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = authService.getCurrentUser();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: FaChartBar },
    { path: '/departments', label: 'Departments', icon: FaBuilding },
    { path: '/employees', label: 'Employees', icon: FaUsers },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBuilding className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">
              Office Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <link.icon className="text-lg" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* User Info & Logout */}
            <div className="flex items-center ml-4 space-x-3 pl-4 border-l border-gray-300">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUserCircle className="text-2xl text-blue-600" />
                <span className="font-medium">{user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <link.icon className="text-lg" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            
            {/* Mobile User Info & Logout */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center space-x-3 px-4 py-2 text-gray-700">
                <FaUserCircle className="text-2xl text-blue-600" />
                <span className="font-medium">{user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
