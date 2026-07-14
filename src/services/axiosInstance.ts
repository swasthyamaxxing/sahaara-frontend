import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        // You can modify the request config here if needed
        return config;
    }
);

export default axiosInstance;
