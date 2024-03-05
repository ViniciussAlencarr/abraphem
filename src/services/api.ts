import axios from 'axios';

const api = axios.create({
  baseURL: 'https://7jreighcmk.execute-api.us-east-1.amazonaws.com/dev'
  // baseURL: 'http://localhost:3000/dev'
});

export default api;