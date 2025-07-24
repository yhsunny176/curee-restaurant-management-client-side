import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

// Custom hook for purchasing food (PATCH)
export const useOrderUpdate = () => {
    const { patch } = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ foodId, purchaseAmount }) => patch(`/food-purchase/${foodId}`, { purchaseAmount }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["food-detail"] });
            queryClient.invalidateQueries({ queryKey: ["all-foods"] });
        },
    });
};
