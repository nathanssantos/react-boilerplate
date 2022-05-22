import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://api.url.com/api/v1',
  validateStatus: (status) => status !== 401,
});

const token = Cookies.get('sveltetsboilerplate.token');

if (token?.length) api.defaults.headers.common['Authorization'] = token;

export default api;
