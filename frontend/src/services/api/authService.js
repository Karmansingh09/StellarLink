import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    const data = await apiClient.post('/auth/login', credentials);
    if (data?.token) {
      localStorage.setItem('stellarlink_auth_token', data.token);
    }
    return data;
  },

  getSession: async () => {
    try {
      return await apiClient.get('/auth/session');
    } catch (error) {
      return { authenticated: false };
    }
  },

  logout: () => {
    localStorage.removeItem('stellarlink_auth_token');
  },
};

export default authService;
