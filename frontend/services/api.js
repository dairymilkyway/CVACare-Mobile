import axios from 'axios';

// Configure base URL - update this to your backend URL
const API_URL = 'http://192.168.1.64:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = null; // Get from AsyncStorage later
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Resend OTP
  resendOTP: async (email) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get current user
  getMe: async (token) => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Google Sign In
  googleSignIn: async (idToken) => {
    try {
      const response = await api.post('/auth/google', { idToken });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Complete Profile (for Google sign-in users)
  completeProfile: async (token, profileData) => {
    try {
      const response = await api.post('/auth/complete-profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update Profile
  updateProfile: async (token, profileData) => {
    try {
      console.log('API: Updating profile with token:', token ? 'Token exists' : 'No token');
      console.log('API: Profile data:', profileData);
      
      const response = await api.put('/auth/updateprofile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('API: Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Update error:', error.response?.data || error);
      throw error.response?.data || { message: error.message || 'Unknown error' };
    }
  },
};

export default api;
