import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://stellarlink.onrender.com/api';
  }
  return 'http://localhost:5001/api';
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Auth Token Injection
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('stellarlink_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Normalized Data & Error Handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected network error occurred';
    
    console.error(`[API Error] ${error.config?.url}:`, message);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
