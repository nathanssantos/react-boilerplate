import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://baseurl.com/',
  timeout: 30000,
  validateStatus: (status) => status !== 401,
});

export default api;
