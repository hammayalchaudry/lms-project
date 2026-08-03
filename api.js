import axios from 'axios';

// Backend Base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor (JWT Token include karne ke liye)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);

export default API;