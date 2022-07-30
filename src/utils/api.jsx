import axios from 'axios';

const BASE_URL = 'https://api.rodolphebeloncle.com/api/';

export const publicRequest = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
