import axios from "axios";

let api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

//start request
api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers = {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }

    return config;
});

//end request

api.interceptors.response.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers = {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }

    return config;
});


export default api;