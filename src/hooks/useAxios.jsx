import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Create axios Secure instance
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const useAxios = () => {
    const { user } = useContext(AuthContext);

    // Get access token
    const getAccessToken = async () => {
        try {
            if (!user) {
                throw new Error("User not authenticated");
            }
            return await user.getIdToken();
        } catch (error) {
            console.error("Error getting access token:", error);
            toast.error("Authentication error. Please log in again.");
            throw error;
        }
    };

    // Create auth headers
    const createAuthHeaders = async () => {
        try {
            const accessToken = await getAccessToken();
            return accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {};
        } catch {
            return {};
        }
    };
    // GET request
    const get = async (url) => {
        try {
            const headers = await createAuthHeaders();
            const response = await axiosSecure.get(url, { headers });
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
            const headers = await createAuthHeaders();
            const response = await axiosSecure.post(url, data, { headers });
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
