import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddFood = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
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

    const handleSubmit = (e) => {
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

        toast.success("Food item added successfully!");

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
            confirmButtonText: "See My Foods",
            cancelButtonText: "Add Another Food",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/my-foods");
            }
        });
    };

    return (
        <div className="min-h-screen bg-base-white py-8">
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                    toastClassName={() =>
                        "relative w-[95%] sm:w-full sm:max-w-md mx-auto bg-white text-black shadow-lg rounded-lg p-4 mt-15"
                    }
                    bodyClassName={() => "text-sm sm:text-base font-medium"}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-pg lg:text-4xl font-bold text-black-text-600 mb-4">Add New Food Item</h1>
                    <p className="text-black-text-100 text-base lg:text-lg max-w-2xl mx-auto">
                        Share your delicious food creation with our community. Fill in the details below to add your
                        food item.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-base-white rounded-xl shadow-card border border-border-gray-200 p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Food Name */}
                        <div className="space-y-2">
                            <label className="block text-md font-bold text-black-text-500 mb-2">
                                Food Name <span className="text-red-primary-600">*</span>
                            </label>
                            <input
                                className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100"
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
                            <label className="block text-md font-bold text-black-text-500 mb-2">
                                Food Image <span className="text-red-primary-600">*</span>
                            </label>
                            <input
                                className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100"
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
                            <label className="block text-md font-bold text-black-text-500 mb-2">
                                Food Category <span className="text-red-primary-600">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full text-base px-4 py-3 pr-10 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 appearance-none cursor-pointer"
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

                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width={24}
                                        height={24}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="block text-md font-bold text-black-text-500 mb-2">
                                    Quantity <span className="text-red-primary-600">*</span>
                                </label>
                                <input
                                    className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100"
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
                                <label className="block text-md font-bold text-black-text-500 mb-2">
                                    Price <span className="text-red-primary-600">*</span>
                                </label>
                                <input
                                    className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price ($)"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        {/* Food Origin */}
                        <div className="space-y-2">
                            <label className="block text-md font-bold text-black-text-500 mb-2">
                                Food Origin (Country) <span className="text-red-primary-600">*</span>
                            </label>
                            <input
                                className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100"
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
                            <label className="block text-md font-bold text-black-text-500 mb-2">
                                A Short Description <span className="text-red-primary-600">*</span>
                            </label>
                            <textarea
                                className="w-full text-base px-4 py-3 border border-border-gray-200 rounded-lg focus:outline-none focus:border-red-primary-600 bg-base-white text-black-text-500 placeholder-black-text-100 resize-vertical"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the food item (ingredients, making procedure, etc.)"
                                rows="4"
                                required
                            />
                        </div>

                        {/* Added By Info */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-border-gray-200">
                            <h3 className="text-md font-bold text-black-text-500 mb-2">Added By:</h3>
                            <p className="text-black-text-100">
                                <span className="font-medium">Name:</span> {user?.displayName || "Unknown User"}
                            </p>
                            <p className="text-black-text-100">
                                <span className="font-medium">Email:</span> {user?.email || "No email"}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-red-primary-600 hover:bg-red-primary-700 text-white-text-400 py-3 px-6 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400 text-lg">
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;
