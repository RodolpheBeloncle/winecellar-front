import axios from 'axios';

const BASE_URL =  'https://api.rodolphebeloncle.com/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});