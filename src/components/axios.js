// Import the axios library
import axios from 'axios';

// Create a new instance of axios with custom configurations
const instance = axios.create({
  baseURL: 'http://192.168.0.32:7130/api/Buttons/', // Replace with your API base URL
  timeout: 100000, // Set the maximum timeout for requests (in milliseconds)
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8' }
});

// Optionally, you can add request and response interceptors for global error handling
instance.interceptors.request.use(
  (config) => {
    // You can modify the request config before sending it (e.g., adding headers)
    return config;
  },
  (error) => {
    // Handle any request errors (e.g., if request configuration is invalid)
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // You can modify the response before resolving the promise (e.g., extract data)
    return response;
  },
  (error) => {
    // Handle any response errors (e.g., network error, server error, etc.)
    return Promise.reject(error);
  }
);

// Export the axios instance to use in your Vue components
export default instance;
