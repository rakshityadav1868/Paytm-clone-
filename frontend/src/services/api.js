import axios from "axios";

 const api = axios.create({
    baseURL:"http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
})

// Add Authorization header with token to all requests]
// learn what is interceptors
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;