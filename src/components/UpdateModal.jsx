import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

const UpdateModal = ({ foodId, onClose, onUpdated }) => {
    const { get, patch } = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        foodCategory: "",
        quantity: "",
        price: "",
        foodOrigin: "",
        description: "",
    });

    useEffect(() => {
        let isMounted = true;
        if (!foodId) {
            setFormData({
                foodName: "",
                foodImage: "",
                foodCategory: "",
                quantity: "",
                price: "",
                foodOrigin: "",
                description: "",
            });
            setFetching(false);
            return;
        }
        const fetchFood = async () => {
            setFetching(true);
            try {
                const res = await get(`/food-detail/${foodId}`);
                if (isMounted && res) {
                    setFormData({
                        foodName: res.foodName || "",
                        foodImage: res.foodImage || "",
                        foodCategory: res.foodCategory || "",
                        quantity: res.quantity?.toString() || "",
                        price: res.price?.toString() || "",
                        foodOrigin: res.foodOrigin || "",
                        description: res.description || "",
                    });
                }
            } catch {
                toast.error("Failed to fetch food data");
            } finally {
                setFetching(false);
            }
        };
        fetchFood();
        return () => {
            isMounted = false;
        };
    }, [foodId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // TanStack mutation for updating food
    const mutation = useMutation({
        mutationFn: async (updatePayload) => {
            return await patch(`/my-food-update/${foodId}`, updatePayload);
        },
        onSuccess: () => {
            toast.success("Food item updated successfully");
            if (onUpdated) onUpdated();
            if (onClose) onClose();
        },
        onError: (err) => {
            toast.error("Failed to update food item", err);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate price and quantity
        if (!formData.quantity.trim() || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
            toast.error("Quantity must be a positive number");
            return;
        }
        if (!formData.price.trim() || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            toast.error("Price must be a positive number");
            return;
        }
        setLoading(true);
        const updatePayload = {
            ...formData,
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.price),
        };
        mutation.mutate(updatePayload);
    };

    return (
        <dialog id="update_modal" className="modal" open={!!foodId}>
            <div className="modal-box w-11/12 max-w-4xl relative bg-background-form">
                <form method="dialog">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle shadow-none absolute right-2 top-2 bg-red-to-gray text-white-base hover:text-white-base border-none"
                        aria-label="Close"
                        onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </form>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-color mb-3 md:mb-4 text-center">
                    Update Food Item
                </h1>
                <p className="text-subtitle-color text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2 text-center mb-6 md:mb-8">
                    Edit your food item details below and save changes.
                </p>
                <div className="bg-background-form rounded-xl shadow-card border border-gray-border-primary p-4 md:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        {/* Food Name */}
                        <div className="space-y-2">
                            <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                Food Name <span className="text-red-base">*</span>
                            </label>
                            <input
                                className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light"
                                type="text"
                                name="foodName"
                                value={formData.foodName}
                                onChange={handleInputChange}
                                placeholder="Enter food name"
                                required
                                disabled={fetching}
                            />
                        </div>

                        {/* Food Image */}
                        <div className="space-y-2">
                            <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                Food Image <span className="text-red-base">*</span>
                            </label>
                            <input
                                className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light"
                                type="url"
                                name="foodImage"
                                value={formData.foodImage}
                                onChange={handleInputChange}
                                placeholder="Enter food image URL"
                                required
                                disabled={fetching}
                            />
                        </div>

                        {/* Food Category */}
                        <div className="space-y-2">
                            <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                Food Category <span className="text-red-base">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 pr-8 md:pr-10 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base appearance-none cursor-pointer"
                                    name="foodCategory"
                                    value={formData.foodCategory}
                                    onChange={handleInputChange}
                                    required
                                    disabled={fetching}>
                                    <option value="">Select food category</option>
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Main Course">Main Course</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Beverage">Beverage</option>
                                    <option value="Snack">Snack</option>
                                    <option value="Salad">Salad</option>
                                    <option value="Seafood">Seafood</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width={20}
                                        height={20}
                                        className="md:w-6 md:h-6"
                                        color={"#000000"}
                                        fill={"none"}>
                                        <path
                                            d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Quantity and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                    Quantity <span className="text-red-base">*</span>
                                </label>
                                <input
                                    className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light"
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    placeholder="Enter quantity"
                                    min="1"
                                    required
                                    disabled={fetching}
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                    Price <span className="text-red-base">*</span>
                                </label>
                                <input
                                    className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price (৳)"
                                    min="0"
                                    step="0.01"
                                    required
                                    disabled={fetching}
                                />
                            </div>
                        </div>

                        {/* Food Origin */}
                        <div className="space-y-2">
                            <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                Food Origin (Country) <span className="text-red-base">*</span>
                            </label>
                            <input
                                className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light"
                                type="text"
                                name="foodOrigin"
                                value={formData.foodOrigin}
                                onChange={handleInputChange}
                                placeholder="Enter country of origin"
                                required
                                disabled={fetching}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                A Short Description <span className="text-red-base">*</span>
                            </label>
                            <textarea
                                className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg focus:outline-none focus:border-red-base bg-input-background text-black-text-base placeholder-black-text-light resize-vertical"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the food item (ingredients, making procedure, etc.)"
                                rows="4"
                                required
                                disabled={fetching}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || fetching}
                                className={`w-full flex justify-center items-center py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold transition ease-in duration-400 text-base md:text-lg ${
                                    loading || fetching
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-base hover:bg-red-dark hover:shadow-card cursor-pointer"
                                } text-white-text-primary`}>
                                {loading ? "Updating..." : "Update Food Item"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateModal;
