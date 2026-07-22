import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Đường dẫn tới Backend NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;