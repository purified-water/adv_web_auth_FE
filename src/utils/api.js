import axios from "axios";

const api = axios.create({
    baseURL: "https://adv-web-auth-be.onrender.com",
});

export default api;
