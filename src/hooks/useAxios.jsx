import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Create axios Secure instance
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const useAxios = () => {
    const { getStoredToken, user } = useContext(AuthContext);

    // Helper to refresh the Firebase ID token using the refresh token
    const refreshIdToken = async () => {
        // Only works if user is logged in
        if (!user) return null;
        try {
            // Force refresh the ID token
            const newToken = await user.getIdToken(true);
            localStorage.setItem("access-token", newToken);
            return newToken;
        } catch (error) {
            console.error("Failed to refresh ID token:", error);
            return null;
        }
    };

    const getAccessToken = async () => {
        let token = getStoredToken();

        // If no token or token expired, try to refresh
        if ((!token || isTokenExpired(token)) && user) {
            try {
                token = await refreshIdToken();
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

    // Helper to check if JWT token is expired
    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // exp is in seconds
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    // Create auth headers using stored JWT token
    const createAuthHeaders = async () => {
        try {
            const accessToken = await getAccessToken();
            return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        } catch {
            return {};
        }
    };
    // GET request with retry on token expiration
    const get = async (url) => {
        try {
            const headers = await createAuthHeaders();
            const response = await axiosSecure.get(url, { headers });
            return response.data;
        } catch (error) {
            // If token expired, try to refresh and retry ONCE
            if (
                (error.response?.status === 401 || error.response?.status === 403) &&
                error.response?.data?.message?.toLowerCase().includes("token") &&
                user
            ) {
                try {
                    await refreshIdToken();
                    const headers = await createAuthHeaders();
                    const response = await axiosSecure.get(url, { headers });
                    return response.data;
                } catch (retryError) {
                    toast.error(retryError);
                    // fall through to error handling below
                }
            }
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

    // POST request with retry on token expiration
    const post = async (url, data) => {
        try {
            const headers = await createAuthHeaders();
            const response = await axiosSecure.post(url, data, { headers });
            const result = response.data;
            return result;
        } catch (error) {
            // If token expired, try to refresh and retry ONCE
            if (
                (error.response?.status === 401 || error.response?.status === 403) &&
                error.response?.data?.message?.toLowerCase().includes("token") &&
                user
            ) {
                try {
                    await refreshIdToken();
                    const headers = await createAuthHeaders();
                    const response = await axiosSecure.post(url, data, { headers });
                    const result = response.data;
                    return result;
                } catch (retryError) {
                    toast.error(retryError);
                    // fall through to error handling below
                }
            }
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
