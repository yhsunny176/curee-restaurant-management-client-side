import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useOrderUpdate } from "@/hooks/useOrderUpdate";
import { AuthContext } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";

const PurchaseFood = () => {
    const { id } = useParams();
    const { get, post } = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [purchaseDisabled, setPurchaseDisabled] = useState(false);
    const [isOwnItem, setIsOwnItem] = useState(false);

    // Tanstack mutation
    const orderUpdate = useOrderUpdate();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        get(`/food-detail/${id}`)
            .then((foodData) => {
                setFood(foodData);
                setQuantity(1);
                // Disable purchase if no stock is available
                if (foodData && foodData.quantity < 1) {
                    setPurchaseDisabled(true);
                } else {
                    setPurchaseDisabled(false);
                }
                // Check if the logged-in user is the one who added the food
                if (foodData && user && foodData.addedBy && foodData.addedBy.email === user.email) {
                    setIsOwnItem(true);
                    setPurchaseDisabled(true);
                } else {
                    setIsOwnItem(false);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, orderUpdate.isSuccess, user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-primary">
                <Loader />
            </div>
        );
    }

    if (!food) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-primary">
                <span className="text-xl text-red-base">Food not found.</span>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (purchaseDisabled) return;
        const result = await Swal.fire({
            title: "Confirm Your Order",
            text: `Do you want to comfirm your order of ${food.foodName} (x${quantity}) for ৳${food.price * quantity}?`,
            icon: "question",
            showCancelButton: true,
            customClass: {
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn",
                popup: "swal-popup-custom",
            },
            confirmButtonText: "Yes, Confirm Order!",
        });
        if (!result.isConfirmed) return;
        try {
            // Update purchaseCount and quantity
            await orderUpdate.mutateAsync({ foodId: food._id, purchaseAmount: quantity });

            //Create order
            const orderData = {
                foodId: food._id,
                foodName: food.foodName,
                price: food.price,
                quantity,
                buyerName: user?.displayName,
                buyerEmail: user?.email,
                buyingDate: new Date(Date.now()).toLocaleString(),
            };
            await post("/orders", orderData);
            toast.success("Order placed successfully!");
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to place order";
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <form
                onSubmit={handleSubmit}
                className="bg-card-background border border-card-stroke p-12 rounded-lg shadow-card-shadow w-full max-w-11/12 md:max-w-10/12 xl:max-w-6/10 space-y-6">
                <h1 className="text-2xl font-bold text-red-base mb-4">Order Now</h1>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Food Name</label>
                    <input
                        type="text"
                        value={food && food.foodName ? food.foodName : ""}
                        disabled
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                    />
                </div>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Price</label>
                    <input
                        type="text"
                        value={food && food.price !== undefined ? food.price : ""}
                        disabled
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                    />
                </div>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Quantity</label>
                    <input
                        type="number"
                        min={1}
                        max={food.quantity || 1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                        required
                    />
                </div>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Buyer Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        disabled
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                    />
                </div>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Buyer Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                    />
                </div>
                <div>
                    <label className="block text-md md:text-lg font-bold text-black-text-base mb-2">Buying Date</label>
                    <input
                        type="text"
                        value={new Date(Date.now()).toLocaleString()}
                        disabled
                        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-base"
                    />
                </div>
                {purchaseDisabled && !isOwnItem && (
                    <div className="text-center text-red-base font-semibold mb-2">
                        Item is not available, maximum order quantity reached.
                    </div>
                )}
                <button
                    type="submit"
                    className={`w-full bg-red-base text-white-base py-4 rounded font-bold hover:bg-red-dark transition-colors duration-500 ease-in-out ${
                        purchaseDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={purchaseDisabled}>
                    {isOwnItem ? "You can't purchase your own item" : "Order Item"}
                </button>
            </form>
            {/* ToastContainer for toast notifications */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default PurchaseFood;
