import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Create axios Secure instance
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const useAxios = () => {
    const { getStoredToken, user, storeJWTToken } = useContext(AuthContext);
    const getAccessToken = async () => {
        let token = getStoredToken();

        if (!token && user) {
            try {
                token = await storeJWTToken(user);
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }

        if (!token) {
            toast.error("Authentication required. Please log in again.");
            throw new Error("No access token found");
        }
        return token;
    };

    // Create auth headers using stored JWT token
    const createAuthHeaders = async () => {
        try {
            const accessToken = await getAccessToken();
            return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
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
            if (error.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else if (error.response?.status === 403) {
                toast.error("Access denied. Insufficient permissions.");
            } else {
                const errorMessage = error.response?.data?.message || error.message || "Failed to fetch data";
                toast.error(errorMessage);
            }
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
            if (error.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else if (error.response?.status === 403) {
                toast.error("Access denied. Insufficient permissions.");
            } else {
                const errorMessage = error.response?.data?.message || error.message || "Failed to create item";
                toast.error(errorMessage);
            }
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
