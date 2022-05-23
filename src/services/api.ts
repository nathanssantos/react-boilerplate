import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: (status) => status !== 401,
});

const token = Cookies.get('reacttsboilerplate.token');

if (token?.length) api.defaults.headers.common['Authorization'] = token;

export default api;
