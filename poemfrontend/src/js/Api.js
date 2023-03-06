
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_ENDPOINT || 'http://localhost/api'
});

export default api;