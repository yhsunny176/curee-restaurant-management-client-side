import { useEffect, useRef } from "react";
import axios from "axios";

const useAxios = () => {
    const axiosInstanceRef = useRef();

    if (!axiosInstanceRef.current) {
        axiosInstanceRef.current = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
    }

    useEffect(() => {
        const instance = axiosInstanceRef.current;
        const resInterceptor = instance.interceptors.response.use(
            (response) => {
                if (response?.data?.data !== undefined) {
                    return response.data.data;
                }
                return response.data;
            },
            (error) => Promise.reject(error)
        );
        return () => {
            instance.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return axiosInstanceRef.current;
};

export default useAxios;
