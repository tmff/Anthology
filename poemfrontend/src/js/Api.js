
import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api',
    transformRequest: [(data, headers) => {
        headers['Authorization'] = `Token ${new Cookies().get("Token")}`

        return data;
    }, ...axios.defaults.transformRequest]
});

export default api;
