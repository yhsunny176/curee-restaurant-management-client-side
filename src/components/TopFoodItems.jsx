import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { toast } from "react-toastify";
import cardImg8 from "../assets/Card Images/card-image-8.webp";
import cardImg9 from "../assets/Card Images/card-image-9.webp";
import Loader from "./Loader";
import { Link } from "react-router";

const TopFoodItems = () => {
    const [topFoods, setTopFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                const foods = await axiosInstance.get("/all-foods");
                // Sort by purchaseCount
                const sorted = foods
                    .sort((foodA, foodB) => (foodB.purchaseCount || 0) - (foodA.purchaseCount || 0))
                    .slice(0, 6);
                setTopFoods(sorted);
            } catch (err) {
                setTopFoods([]);
                toast.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, [axiosInstance]);

    return (
        <div>
            <div className="max-w-11/12 md:max-w-10/12 xl:max-w-8/12 mx-auto py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-6 items-center lg:items-stretch">
                {/* Text Content / Left Side */}
                <div className="text-top-food w-full lg:w-6/12 space-y-6 text-center lg:text-left flex flex-col justify-center">
                    <p className="font-pg font-medium text-xl text-red-text-base">Top Food Items</p>
                    <div className="space-y-6 md:space-y-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-h1 text-black-text-base">
                            Curated Signatures, Crafted to Be Remembered
                        </h1>
                        <p className="leading-relaxed md:leading-p1 text-black-text-light mt-2 text-base md:text-lg">
                            At Cureé, we don’t just serve food, we craft expressions of flavor. These are our most
                            celebrated dishes, curated for those who seek more than a meal. With locally-sourced
                            ingredients and meticulous technique, every item on this list reflects the soul of our
                            kitchen.
                        </p>
                    </div>
                </div>

                {/* Images / Right side */}
                <div className="w-full mx-auto lg:max-w-6/12 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 lg:h-[464px]">
                    <div className="w-full md:w-1/2 flex flex-1 items-start">
                        <div className="w-full h-56 md:h-80 lg:h-96 border border-card-stroke rounded-md overflow-hidden">
                            <img
                                src={cardImg8}
                                alt="Section image containing chicken roll dish"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-1 items-end mt-6 md:mt-0">
                        <div className="w-full h-40 md:h-48 lg:h-56 border border-card-stroke rounded-md overflow-hidden">
                            <img
                                src={cardImg9}
                                alt="Section image containing chicken roll dish"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <span>
                            <Loader />
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 pb-32 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto max-w-11/12 lg:max-w-10/12 xl:max-w-9/12 2xl:max-w-8/12">
                        {topFoods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-card-background rounded-lg overflow-hidden hover:shadow-card-shadow transition-shadow duration-300 border border-card-stroke flex flex-col h-full cursor-pointer">
                                <div className="relative">
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-40 md:h-48 object-cover"
                                    />
                                    <div className="absolute top-2 md:top-3 right-2 md:right-3">
                                        <span className="inline-flex items-center px-2 md:px-4 py-1.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-md font-medium bg-card-tablet text-white-base border border-card-tablet-stroke">
                                            {food.foodCategory}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-lg md:text-xl text-card-main-text mb-2 md:mb-3">
                                        {food.foodName}
                                    </h3>
                                    <p className="text-card-subtext text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2">
                                        {food.description}
                                    </p>
                                    <div className="mt-auto space-y-2 md:space-y-6">
                                        <div className="flex justify-between items-center text-sm md:text-lg border-y border-y-card-stroke py-3">
                                            <span className="text-card-main-text">
                                                <span className="font-medium">Origin :</span> {food.foodOrigin}
                                            </span>
                                            <span className="text-card-main-text">
                                                <span className="font-medium text-card-sec-subtext">Quantity:</span>{" "}
                                                {food.quantity}
                                            </span>
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <div className="text-xl md:text-3xl font-bold text-card-main-text">
                                                ৳{food.price}
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-2">
                                            <Link
                                                to={`/food-detail/${food._id}`}
                                                className="w-full inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300 cursor-pointer"
                                                title="View food details"
                                                style={{ textDecoration: "none" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                                                    viewBox="0 0 24 24"
                                                    width={20}
                                                    height={20}
                                                    color={"#FDFDFD"}
                                                    fill={"none"}>
                                                    <path
                                                        d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                                                        stroke="#FDFDFD"
                                                        strokeWidth="2"
                                                    />
                                                    <path
                                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                        stroke="#FDFDFD"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-span-full items-center justify-center">
                            <Link
                                to="/all-foods"
                                className="max-w-max mx-auto mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg lg:text-xl text-white-text-primary bg-red-base rounded-md hover:bg-red-dark transition-colors duration-600 ease-in-out whitespace-nowrap min-h-[44px] flex items-center justify-center">
                                See All
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopFoodItems;
