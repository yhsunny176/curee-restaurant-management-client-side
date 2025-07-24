import React from "react";
import cardImg8 from "../assets/Card Images/card-image-8.webp";
import cardImg9 from "../assets/Card Images/card-image-9.webp";

const TopFoodItems = () => {
    return (
        <div>
            {/* Top Food Items Section */}
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
                <div className="w-full lg:w-6/12 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 lg:h-[464px]">
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
        </div>
    );
};

export default TopFoodItems;
