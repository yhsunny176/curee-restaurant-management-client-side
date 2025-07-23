import axios from "axios";

const useAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Response interceptor to return data.data directly if present
useAxios.interceptors.response.use(
    (response) => {
        if (response?.data?.data !== undefined) {
            return response.data.data;
        }
        return response.data;
    },
    (error) => Promise.reject(error)
);

export default useAxios;
