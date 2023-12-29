import axios from 'axios';

// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
  // Base URL for API requests
  baseURL: 'http://localhost:8080',
  // Timeout for requests in milliseconds
  timeout: 50000,
  // Default headers for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to modify the request before it is sent
axiosInstance.interceptors.request.use(function (config) {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('token');
  
  // Attach the token to the request headers if it exists
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  // Return the modified config
  return config;
});

// Export the configured Axios instance for use in the application
export default axiosInstance;
