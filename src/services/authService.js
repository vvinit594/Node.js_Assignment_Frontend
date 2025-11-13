/**
 * Auth Service (Simplified - Frontend Only)
 * Allows anyone to sign up or log in without backend validation
 */

const authService = {
  // Signup - accepts any credentials
  signup: async (userData) => {
    // Simulate a successful signup without backend call
    const fakeToken = 'demo-token-' + Date.now();
    const user = {
      _id: 'demo-user-' + Date.now(),
      name: userData.name || 'Demo User',
      email: userData.email || 'demo@example.com',
      role: 'admin'
    };
    
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      data: {
        token: fakeToken,
        user: user
      }
    };
  },

  // Login - accepts any credentials
  login: async (credentials) => {
    // Simulate a successful login without backend call
    const fakeToken = 'demo-token-' + Date.now();
    const user = {
      _id: 'demo-user-' + Date.now(),
      name: credentials.email ? credentials.email.split('@')[0] : 'Demo User',
      email: credentials.email || 'demo@example.com',
      role: 'admin'
    };
    
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      data: {
        token: fakeToken,
        user: user
      }
    };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user from API (simplified)
  getMe: async () => {
    const user = authService.getCurrentUser();
    return {
      success: true,
      data: user
    };
  }
};

export default authService;
