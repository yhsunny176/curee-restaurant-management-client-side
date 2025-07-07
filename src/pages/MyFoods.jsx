import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const { get } = useAxios();
    const [myFoods, setMyFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.email) {
            const fetchMyFoods = async () => {
                try {
                    setLoading(true);
                    const result = await get("/foods");

                    if (result && result.success) {
                        // Filter foods by user email
                        const userFoods = result.data.filter((food) => food.addedBy?.email === user.email);
                        setMyFoods(userFoods);
                    }
                } catch (err) {
                    console.error("Failed to fetch foods:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchMyFoods();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-base-white py-6 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black-text-600 mb-3 md:mb-4">My Food Items</h1>
                    <p className="text-black-text-100 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        View and manage all the food items you've added to our community.
                    </p>
                </div>

                {/* Foods Display */}
                {myFoods.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="mb-4">
                            <svg
                                className="mx-auto h-16 w-16 md:h-24 md:w-24 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-medium text-black-text-500 mb-2">No food items found</h3>
                        <p className="text-black-text-100 mb-4 md:mb-6 text-sm md:text-base">You haven't added any food items yet.</p>
                        <a
                            href="/add-food"
                            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-lg text-white bg-red-primary-600 hover:bg-red-primary-700 transition-colors duration-200">
                            Add Your First Food Item
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {myFoods.map((food) => (
                                <div
                                    key={food._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full cursor-pointer">
                                    <div className="relative">
                                        <img
                                            src={food.foodImage}
                                            alt={food.foodName}
                                            className="w-full h-40 md:h-48 object-cover"
                                        />
                                        <div className="absolute top-2 md:top-3 right-2 md:right-3">
                                            <span className="inline-flex items-center px-2 md:px-4 py-1.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-md font-medium bg-red-600 text-white">
                                                {food.foodCategory}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                                        <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">{food.foodName}</h3>

                                        <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2">
                                            {food.description}
                                        </p>

                                        <div className="mt-auto space-y-2 md:space-y-3">
                                            <div className="flex justify-between items-center text-sm md:text-lg text-gray-700">
                                                <span>
                                                    <span className="font-medium">Origin :</span> {food.foodOrigin}
                                                </span>
                                                <span>
                                                    <span className="font-medium text-red-600">Quantity:</span>{" "}
                                                    {food.quantity}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <button
                                                    className="inline-flex items-center px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300 cursor-pointer"
                                                    title="Update food item">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                                                        viewBox="0 0 24 24"
                                                        width={20}
                                                        height={20}
                                                        color={"#FDFDFD"}
                                                        fill={"none"}>
                                                        <path
                                                            d="M8.17151 19.8284L19.8284 8.17157C20.3736 7.62632 20.6462 7.3537 20.792 7.0596C21.0693 6.50005 21.0693 5.8431 20.792 5.28354C20.6462 4.98945 20.3736 4.71682 19.8284 4.17157C19.2831 3.62632 19.0105 3.3537 18.7164 3.20796C18.1568 2.93068 17.4999 2.93068 16.9403 3.20796C16.6462 3.3537 16.3736 3.62632 15.8284 4.17157L4.17151 15.8284C3.59345 16.4064 3.30442 16.6955 3.15218 17.063C2.99994 17.4305 2.99994 17.8393 2.99994 18.6568V20.9999H5.34308C6.16059 20.9999 6.56934 20.9999 6.93688 20.8477C7.30442 20.6955 7.59345 20.4064 8.17151 19.8284Z"
                                                            stroke="#FDFDFD"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 21H18"
                                                            stroke="#FDFDFD"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M14.5 5.5L18.5 9.5"
                                                            stroke="#FDFDFD"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    Update
                                                </button>
                                                <div className="text-xl md:text-3xl font-bold text-gray-900">৳{food.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default MyFoods;
