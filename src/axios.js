import axios from 'axios';
import { PORT } from './consts';

const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
