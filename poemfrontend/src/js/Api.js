
import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api',
    transformRequest: [(data, headers) => {

        const cookies = new Cookies();

        headers['Authorization'] = `Token ${cookies.get("Token")}`
        headers[`X-CSRFToken`] = cookies.get("csrftoken");

        return data;
    }, ...axios.defaults.transformRequest]
});

export async function promptLike(poemId, liked) {

    return new Promise(resolve => {
        const request = liked ? api.delete('/remove-poem-like', { data: { poem_id: poemId } }) : api.post('/like-poem', { poem_id: poemId });
        request.then((res) => {
            resolve(res.data.likes);
        }).catch((err) => {
            console.log(err);
        });
    });
}

export async function promptBookmark(poemId, bookmarked) {

    return new Promise(resolve => {
        const request = bookmarked ? api.delete('/remove-bookmark', { data: { poem_id: poemId } }) : api.post('/bookmark', { poem_id: poemId });
        request.then((res) => {
            resolve();
        }).catch((err) => {
            console.log(err);
        });
    });
}

export async function promptFavourite(poemId, favourited) {

    return new Promise(resolve => {
        const request = favourited ? api.delete('/remove-favourite', { data: { poem_id: poemId } }) : api.post('/favourite', { poem_id: poemId });
        request.then((res) => {
            resolve(res.data.favourited);
        }).catch((err) => {
            console.log(err);
        });
    });
}

export default api;
