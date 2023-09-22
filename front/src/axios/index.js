import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
});

axiosInstance.interceptors.request.use((config) => {
    const {
        accessToken
    } = store.getters['user/getUser'];

    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default axiosInstance;
