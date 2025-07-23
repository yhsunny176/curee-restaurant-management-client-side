import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

// Create axios Secure instance
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { getStoredToken, user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

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
            toast.error("Failed to refresh ID token:", error);
            return null;
        }
    };

    const getAccessToken = async () => {
        let token = getStoredToken();

        // If no token or token expired, try to refresh
        if ((!token || isTokenExpired(token)) && user) {
            try {
                const newToken = await refreshIdToken();
                if (newToken) {
                    token = newToken;
                }
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }

        // If still no token or user is null, force logout and throw error
        if (!token || !user) {
            toast.error("Authentication required. Please log in again.");
            if (typeof logOut === "function") {
                await logOut();
            }
            throw new Error("No access token found");
        }
        return token;
    };

    // Helper to check if JWT token is expired
    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
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
    // Axios response interceptor for token refresh, logout, and redirect
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            // Only retry once for token errors
            if (
                (error.response?.status === 401 || error.response?.status === 403) &&
                error.response?.data?.message?.toLowerCase().includes("token") &&
                user &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    await refreshIdToken();
                    const headers = await createAuthHeaders();
                    originalRequest.headers = { ...originalRequest.headers, ...headers };
                    return axiosSecure(originalRequest);
                } catch {
                    toast.error("Token refresh failed. Please log in again.");
                }
            }
            // On 401/403, log out and redirect to login
            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error("Session expired or access denied. Please log in again.");
                if (typeof logOut === "function") {
                    await logOut();
                }
                navigate("/auth/login");
            } else {
                const errorMessage = error.response?.data?.message || error.message || "Request failed";
                toast.error(errorMessage);
            }
            return Promise.reject(error);
        }
    );

    // GET request
    const get = async (url) => {
        const headers = await createAuthHeaders();
        const response = await axiosSecure.get(url, { headers });
        return response.data;
    };

    // POST request
    const post = async (url, data) => {
        const headers = await createAuthHeaders();
        const response = await axiosSecure.post(url, data, { headers });
        return response.data;
    };

    return {
        get,
        post,
        axiosSecure,
    };
};

export default useAxiosSecure;
