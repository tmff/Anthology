
import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api',
    headers: {
        Authorization: `Token ${new Cookies().get("Token")}`
    }
});

export default api;
