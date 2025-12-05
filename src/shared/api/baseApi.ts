// shared/api/baseApi.ts
import axios from 'axios';

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        indexes: null,
    },
});
