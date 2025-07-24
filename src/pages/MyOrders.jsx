import Loader from "@/components/Loader";
import { AuthContext } from "@/contexts/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";
import { useOrderDelete } from "@/hooks/useOrderDelete";

const MyOrders = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { get } = useAxiosSecure();
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const orderDelete = useOrderDelete();

    // Delete order handler using Tanstack Mutation
    const handleDelete = async (orderId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this order? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn",
                popup: "swal-popup-custom",
            },
            confirmButtonText: "Yes, delete it!",
        });
        if (!result.isConfirmed) return;
        orderDelete.mutate(orderId, {
            onSuccess: (res) => {
                if (res && res.success) {
                    setMyOrders((prev) => prev.filter((order) => order._id !== orderId));
                    Swal.close();
                    toast.success("Order deleted!");
                } else {
                    toast.error("Failed to delete order.");
                }
            },
            onError: (err) => {
                toast.error("Failed to delete order.", err);
            },
        });
    };

    useEffect(() => {
        if (!authLoading && user?.email) {
            const fetchMyOrders = async () => {
                try {
                    setLoading(true);
                    const result = await get(`/my-orders/${user?.email}`);
                    if (result && result.success) {
                        setMyOrders(result.data);
                    }
                } catch (err) {
                    toast.error("Failed to fetch Orders", err);
                    // Show user-friendly error message
                    if (err.response?.status === 401) {
                        toast.error("Authentication required. Please log in again.");
                    } else if (err.response?.status === 403) {
                        toast.error("Access denied. You can only view your own Orders.");
                    } else {
                        toast.error("Failed to load your Orders. Please try again.");
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchMyOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email, authLoading]);

    if (authLoading || loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-background-primary py-6 md:py-8 lg:py-12">
            <div className="max-w-10/12 mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-black-text-dark mb-3 md:mb-4 pt-6">
                        My Orders
                    </h1>
                    <p className="text-black-text-light text-md lg:text-lg xl:text-xl max-w-2xl mx-auto px-2">
                        You can see all the foods that you have ordered and manage them from the table below.
                    </p>
                </div>

                {/* Orders Table Display */}
                {myOrders.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="mb-4 bg-card-background max-w-max mx-auto p-6 rounded-lg"></div>
                        <h3 className="text-2xl md:text-3xl font-medium text-black-text-base mb-2">No Orders found</h3>
                        <p className="text-black-text-light mb-4 md:mb-6 text-md lg:text-lg xl:text-xl">
                            You have not Ordered any food yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-card-background rounded-lg border border-card-stroke shadow-card-shadow">
                        <table className="min-w-full divide-y divide-card-stroke">
                            <thead className="bg-background-primary">
                                <tr>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Food Name
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Price
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Quantity
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Buyer Name
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Buyer Email
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Buying Date
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Food Manager
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-card-background divide-y divide-card-stroke">
                                {myOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-background-primary/60 transition-colors">
                                        <td className="px-4 py-5 text-black-text-base font-medium whitespace-nowrap">
                                            {order.foodName}
                                        </td>
                                        <td className="px-4 py-5 text-red-base font-bold whitespace-nowrap">
                                            ৳{order.price}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {order.quantity}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {order.buyerName}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {order.buyerEmail}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {order.buyingDate ? moment(order.buyingDate).format("lll") : "-"}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {order.foodOwner.ownerEmail}
                                        </td>
                                        <td className="px-4 py-5 whitespace-nowrap">
                                            <button
                                                className="inline-flex items-center px-3 py-2 text-md font-medium text-white bg-red-base hover:bg-red-700 rounded-md transition-colors duration-300 cursor-pointer"
                                                title="Delete order"
                                                onClick={() => handleDelete(order._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
