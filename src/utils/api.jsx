import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
