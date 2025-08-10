import React, { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import useAxios from "@/hooks/useAxios";
import { FadeInCard, FadeInText } from "../components/ScrollAnimations";

const AllFoods = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);
    const axiosInstance = useAxios();

    // Fetch all foods once
    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                setLoading(true);
                const result = await axiosInstance.get("/all-foods");
                setAllFoods(result);
            } catch (err) {
                toast.error("Failed to fetch foods:", err);
            } finally {
                setLoading(false);
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };
        fetchAllFoods();
    }, [axiosInstance]);

    // Keep input focused
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    // Search
    const filteredFoods = allFoods.filter((food) => {
        const searchTerm = search.toLowerCase();
        if (searchTerm === "") return true;
        return (
            food.foodName?.toLowerCase().includes(searchTerm) ||
            food.foodCategory?.toLowerCase().includes(searchTerm) ||
            food.foodOrigin?.toLowerCase().includes(searchTerm) ||
            food.description?.toLowerCase().includes(searchTerm)
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-primary">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-primary py-6 md:py-8 lg:py-12 relative overflow-hidden">
            {/* Background Title Effect */}
            {filteredFoods.length > 0 && (
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
                    <h1 className="text-[6rem] md:text-[10rem] lg:text-[15rem] xl:text-[18rem] font-bold text-bg-text select-none whitespace-nowrap">
                        ALL FOODS
                    </h1>
                </div>
            )}

            <div className="max-w-10/12 mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <FadeInText>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black-text-dark mb-3 md:mb-4">
                            All Food Items
                        </h1>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="text-subtitle-color text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                            Discover all the amazing food items shared by our community members.
                        </p>
                    </FadeInText>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search foods by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-full px-4 py-2 bg-input-background border border-input-stroke rounded-md focus:outline-none focus:ring focus:ring-red-base placeholder-card-subtext text-white-base"
                    />
                </div>

                {/* Foods Display */}
                {filteredFoods.length === 0 ? (
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
                        <h3 className="text-lg md:text-xl font-medium text-card-main-text mb-2">No food items found</h3>
                        <p className="text-card-main-text mb-4 md:mb-6 text-sm md:text-base">
                            No food items have been added yet.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {filteredFoods.map((food, index) => {
                                // Sequential delay but much faster (0.05s between each card)
                                const sequentialDelay = index * 0.05;

                                return (
                                    <FadeInCard key={food._id} delay={sequentialDelay} duration={0.6} threshold={0.1}>
                                        <div className="bg-card-background rounded-lg overflow-hidden hover:shadow-card-shadow transition-shadow duration-300 border border-card-stroke flex flex-col h-full cursor-pointer">
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
                                                            <span className="font-medium">Origin :</span>{" "}
                                                            {food.foodOrigin}
                                                        </span>
                                                        <span className="text-card-main-text">
                                                            <span className="font-medium text-card-sec-subtext">
                                                                Quantity:
                                                            </span>{" "}
                                                            {food.quantity}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-end items-center">
                                                        <div className="text-xl md:text-3xl font-bold text-card-main-text">
                                                            ৳{food.price}
                                                        </div>
                                                    </div>

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
                                                        <span>View Details</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeInCard>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllFoods;
