import { getAccessToken } from '@/lib/utils';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken()

    if (token) {
        const headers = config.headers ?? {}
        config.headers = {
            ...(headers as Record<string, string>),
            Authorization: `Bearer ${token}`,
        } as typeof config.headers
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance;
