import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
