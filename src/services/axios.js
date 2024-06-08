import axios from 'axios';

const API_KEY = 'AIzaSyBBp_Q-XXKM9OCWqvXQMxoPkSFJQnBo5PI';
const FOLDER_ID = '1s6pWYOJbwqW0ooRIBXN2KP1QBYvseGOX';
const BASE_URL = 'https://www.googleapis.com/drive/v3/files';

export async function listFiles() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: `'${FOLDER_ID}' in parents`,
        key: API_KEY,
        fields: 'files(id, name)'
      }
    });
    return response.data.files;
  } catch (error) {
    console.error('Error fetching file list:', error);
    throw error;
  }
}

export async function getFile(fileId) {
  try {
    const response = await axios.get(`${BASE_URL}/${fileId}`, {
      params: {
        alt: 'media',
        key: API_KEY
      },
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching file:', error.response ? error.response.data : error);

    throw error;
  }
}


/* OLD CODE */

const instance = axios.create({
  baseURL: 'https://instant-buttons-api.azurewebsites.net/api', // Replace with your API base URL
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
