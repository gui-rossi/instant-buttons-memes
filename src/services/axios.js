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
