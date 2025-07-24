import Loader from "@/components/Loader";
import useAxios from "@/hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";

const SingleFood = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axiosInstance
            .get(`/food-detail/${id}`)
            .then((res) => {
                setFood(res);
                setLoading(false);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message || "Failed to fetch food";
                toast.error(message);
                setLoading(false);
                toast.error("Failed to fetch food:", err);
            });
    }, [axiosInstance, id]);

    const { foodName, foodImage, foodCategory, quantity, price, foodOrigin, description, purchaseCount } = food || {};

    return (
        <div className="min-h-[300px] flex flex-col justify-center items-center bg-background-primary">
            {loading && (
                <div className="my-10 text-2xl font-bold bg-background-primary">
                    <Loader />
                </div>
            )}
            {!loading && food && (
                <div className="max-w-11/12 md:max-w-10/12 lg:max-w-11/12 xl:max-w-9/12 2xl:max-w-8/12 py-12 xl:py-16 mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        {/* Image */}
                        <div className="w-full mb-6 lg:mb-0">
                            <img
                                src={foodImage}
                                alt={`This is the image of ${foodName}`}
                                className="w-full h-full object-cover rounded-xl border-2 border-card-stroke"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-6 sm:gap-8">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <span className="font-pg text-lg font-bold text-red-base">Name</span>
                                <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-black-text-base">
                                    {foodName}
                                </h1>
                            </div>

                            {/* Responsive row for Category and Origin on mobile, stacked on md+ */}
                            <div className="flex flex-row md:flex-col gap-12 md:gap-8 sm:gap-3 items-stretch w-full">
                                <div className="flex-1 flex flex-col gap-1">
                                    <span className="font-pg text-lg font-bold text-red-base">Category</span>
                                    <h1 className="font-bold gap-2 text-lg sm:text-xl text-black-text-base">
                                        {foodCategory}
                                    </h1>
                                </div>
                                <div className="hidden md:block h-2"></div>
                                <div className="flex items-center md:hidden px-3">
                                    <div className="w-px h-8 bg-card-stroke"></div>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <span className="font-pg text-lg font-bold text-red-base">Origin</span>
                                    <h1 className="font-bold gap-2 text-lg sm:text-xl text-black-text-base">
                                        {foodOrigin}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 py-8 w-full items-stretch">
                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-card-sec-subtext mt-1">
                                Price:
                            </span>
                            <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-black-text-base items-center">
                                ৳{price}
                            </h1>
                        </div>

                        <div className="hidden md:block border-r-2 border-card-stroke"></div>

                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-card-sec-subtext mt-1">
                                Quantity Left:
                            </span>
                            <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-black-text-base items-center">
                                {quantity}
                            </h1>
                        </div>

                        <div className="hidden md:block border-r-2 border-card-stroke"></div>

                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-card-sec-subtext mt-1">
                                Purchase Count:
                            </span>
                            <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-black-text-base items-center">
                                {purchaseCount}
                            </h1>
                        </div>
                    </div>

                    <div className="border-t-1 border-card-stroke w-full"></div>

                    <div className="max-w-full flex flex-col gap-3 py-8 sm:py-10">
                        <span className="font-pg text-lg font-bold text-red-base">Description</span>
                        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-black-text-light">
                            {description}
                        </p>
                    </div>

                    <div className="w-full">
                        <button
                            type="button"
                            className="w-full cursor-pointer bg-red-base text-white-text-primary px-4 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-base sm:text-lg md:text-xl rounded-md hover:bg-red-dark active:bg-red-dark transition-colors duration-600 ease-in-out flex items-center justify-center"
                            onClick={() => navigate(`/purchase-food/${id}`, { state: { from: location } })}>
                            Order this Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleFood;
