import React from "react";
import cardImg8 from "../assets/Card Images/card-image-8.webp"
import cardImg9 from "../assets/Card Images/card-image-9.webp";

const TopFoodItems = () => {
    return (
        <div>
            {/* Top Food Items Section */}
            <div className="max-w-8/12 mx-auto py-32 flex gap-6">
                {/* Text Content / Left Side */}
                <div className="text-top-food w-6/12 space-y-6">
                    <p className="font-pg font-medium text-xl text-red-text-base">Top Food Items</p>
                    <div className="space-y-8">
                        <h1 className="text-5xl leading-h1 text-black-text-base">
                            Curated Signatures, Crafted to Be Remembered
                        </h1>
                        <p className="leading-p1 text-black-text-light mt-2">
                            At Cureé, we don’t just serve food, we craft expressions of flavor. These are our most
                            celebrated dishes, curated for those who seek more than a meal. With locally-sourced
                            ingredients and meticulous technique, every item on this list reflects the soul of our
                            kitchen.
                        </p>
                    </div>
                </div>

                {/* Images / Right side */}
                <div className="w-6/12 flex space-x-6 lg:h-[464px]">
                    <div className="w-1/2 flex flex-1 items-start">
                        <div className="w-full h-96 border-card-stroke rounded-md">
                            <img
                                src={cardImg8}
                                alt="Section image containing chicken roll dish"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-1 items-end">
                        <div className="w-full h-56 border border-card-stroke rounded-md">
                            <img
                                src={cardImg9}
                                alt="Section image containing chicken roll dish"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFoodItems;
