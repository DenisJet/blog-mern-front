import axios from 'axios';
import { BASEURL } from './consts';

const instance = axios.create({
  baseURL: BASEURL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
