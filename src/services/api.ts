import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.strackify.com',
  // baseURL: 'https://strackify-api.herokuapp.com',
  // baseURL: 'http://10.0.2.2:3333',
});

export default api;
