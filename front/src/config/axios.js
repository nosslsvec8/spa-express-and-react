import axios from 'axios';

export const defaultApiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
    responseType: "json"
});

export const secureApiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
    responseType: "json",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});
