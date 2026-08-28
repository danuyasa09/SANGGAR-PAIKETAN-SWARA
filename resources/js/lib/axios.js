import Axios from 'axios';

const axios = Axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;
