import { create } from 'zustand'
import { axiosInstance } from '../utilities/axiosInstance.js';
import { toast } from 'react-toastify';

const store = (set) => ({
  isAuthenticated: false,
  user: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/user/me');
      set({
        isAuthenticated: true,
        user: response.data.user,
        isCheckingAuth: false
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        isCheckingAuth: false
      });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/user/logout');
      set({
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
});

const AuthStore = create((store));

export default AuthStore;