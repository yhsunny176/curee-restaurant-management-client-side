import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxiosSecure";
import ButtonLoader from "../components/ButtonLoader";

const AddFood = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { post } = useAxios();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        foodCategory: "",
        quantity: "",
        price: "",
        foodOrigin: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate price and quantity
        if (!formData.quantity.trim() || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
            toast.error("Valid quantity is required");
            return;
        }
        if (!formData.price.trim() || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            toast.error("Valid price is required");
            return;
        }

        try {
            setLoading(true);
            const foodData = {
                ...formData,
                quantity: parseInt(formData.quantity),
                price: parseFloat(formData.price),
                addedBy: {
                    name: user?.displayName || "",
                    email: user?.email || "",
                },
                purchaseCount: 0,
                createdAt: new Date().toISOString(),
            };

            const result = await post("/foods", foodData);

            if (result.success) {
                toast.success("Food item added successfully!");

                // Reset form
                setFormData({
                    foodName: "",
                    foodImage: "",
                    foodCategory: "",
                    quantity: "",
                    price: "",
                    foodOrigin: "",
                    description: "",
                });

                // Show Success Message
                Swal.fire({
                    title: "Success!",
                    text: "Food item added successfully!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#dc2626",
                    cancelButtonColor: "#6b7280",
                    customClass: {
                        popup: "swal-popup-custom",
                    },
                    confirmButtonText: "See My Foods",
                    cancelButtonText: "Add Another Food",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/all-foods");
                    }
                });
            }
        } catch {
            // Axios hook handles Error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-primary py-6 md:py-8 lg:py-12">
            <div></div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-color mb-3 md:mb-4">
                        Add New Food Item
                    </h1>
                    <p className="text-subtitle-color text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Share your delicious food creation with our community. Fill in the details below to add your
                        food item.
                    </p>
                </div>

                {/* Form Container */}
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
                                    required>
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
                            />
                        </div>

                        {/* Added By Info (Uneditable Input Fields, display only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                    Added By (Name)
                                </label>
                                <input
                                    className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg bg-input-background text-black-text-base placeholder-black-text-light cursor-not-allowed"
                                    type="text"
                                    value={user?.displayName || "Unknown User"}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm md:text-md font-bold text-black-text-base mb-2">
                                    Added By (Email)
                                </label>
                                <input
                                    className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 border border-input-stroke rounded-lg bg-input-background text-black-text-base placeholder-black-text-light cursor-not-allowed"
                                    type="email"
                                    value={user?.email || "No email"}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold transition ease-in duration-400 text-base md:text-lg ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-base hover:bg-red-dark hover:shadow-card cursor-pointer"
                                } text-white-text-primary`}>
                                {loading ? (
                                    <>
                                        <ButtonLoader size={20} color="#ffffff" />
                                    </>
                                ) : (
                                    "Add Item"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;
