import axios from "axios";
import { toast } from "react-toastify";

// Create axios Secure instance
const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxios = () => {
    // GET request
    const get = async (url) => {
        try {
            const response = await axiosSecure.get(url);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch data";
            toast.error(errorMessage);
            throw error;
        }
    };

    // POST request
    const post = async (url, data) => {
        try {
            const response = await axiosSecure.post(url, data);
            const result = response.data;
            return result;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to create item";
            toast.error(errorMessage);
            throw error;
        }
    };

    return {
        get,
        post,
        axiosSecure,
    };
};

export default useAxios;
