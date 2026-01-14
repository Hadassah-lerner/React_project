import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.60.24.105:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
