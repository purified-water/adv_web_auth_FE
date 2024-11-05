import axios from "axios";

// Create the axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL ?? "https://adv-web-auth-be.onrender.com",
});

// Request interceptor to add the Authorization header with the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
