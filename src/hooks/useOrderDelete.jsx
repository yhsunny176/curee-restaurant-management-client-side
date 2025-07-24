import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export const useOrderDelete = () => {
    const { del } = useAxiosSecure();
    return useMutation({
        mutationFn: async (orderId) => {
            const res = await del(`/orders/${orderId}`);
            return res;
        },
    });
};
