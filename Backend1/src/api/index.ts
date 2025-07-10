import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS backend URL
});

export const getAllUsers = () => {
  return api.get('/users');
};

export const createUser = (name: string, email: string) => {
  return api.post('/users', { name, email });
};
