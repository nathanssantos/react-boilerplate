import axios from "axios";

const baseURL = "http://localhost:3001";

const baseAPI = axios.create({
  baseURL,
  timeout: 10000,
});

export default baseAPI;
