import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../assets/Banner Images/banner-1.webp";
import banner2 from "../assets/Banner Images/banner-2.webp";
import banner3 from "../assets/Banner Images/banner-3.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../css/swiper.css";

// import required modules
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";

const Banner = () => {
    const navigate = useNavigate();
    const handleSeeAllDishes = () => {
        navigate("/all-foods");
    };
    return (
        <>
            <Swiper
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                keyboard={{
                    enabled: true,
                }}
                effect={"fade"}
                modules={[Autoplay, Keyboard, EffectFade, Pagination]}
                className="mySwiper">
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src={banner1}
                            alt="Banner image 1 containing wagyu beef dish image"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0"
                        />
                        <div className="absolute inset-0 bg-overlay-dark z-10"></div>
                        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-auto mx-auto absolute inset-0 flex items-center justify-center z-20 px-3 sm:px-4 md:px-6 lg:px-8">
                            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center max-w-full mt-16">
                                <h1 className="text-white-text-primary leading-tight text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal break-words">
                                    Handcrafted <span className="text-gold-text">Culinary</span> Art, Designed to
                                    Delight the Senses.
                                </h1>
                                <p className="text-white-text-secondary leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-light break-words">
                                    Step into a world of refined flavors, where each dish tells a story and every bite
                                    is an unforgettable experience.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleSeeAllDishes}
                                    className="cursor-pointer mx-auto mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg lg:text-xl text-white-text-primary bg-red-base rounded-md hover:bg-red-dark transition-colors duration-600 ease-in-out whitespace-nowrap min-h-[44px] flex items-center justify-center">
                                    See All Dishes
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src={banner2}
                            alt="Banner image 2 containing risotto dish image"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0"
                        />
                        <div className="absolute inset-0 bg-overlay-dark z-10"></div>
                        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-auto mx-auto absolute inset-0 flex items-center justify-center z-20 px-3 sm:px-4 md:px-6 lg:px-8">
                            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center max-w-full mt-16">
                                <h1 className="text-white-text-primary leading-tight text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal break-words">
                                    Where <span className="text-gold-text">Flavor</span> Meets{" "}
                                    <span className="text-gold-text">Precision</span>, and Atmosphere Becomes Art.
                                </h1>
                                <p className="text-white-text-secondary leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-light break-words">
                                    Indulge in a carefully composed dining experience where every plate, scent, and
                                    sound is part of the story.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleSeeAllDishes}
                                    className="mx-auto mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg lg:text-xl text-white-text-primary bg-red-base rounded-md hover:bg-red-dark transition-colors duration-600 ease-in-out whitespace-nowrap min-h-[44px] flex items-center justify-center">
                                    See All Dishes
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src={banner3}
                            alt="Banner image 3 containing risotto dish image"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0"
                        />
                        <div className="absolute inset-0 bg-overlay-dark z-10"></div>
                        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-auto mx-auto absolute inset-0 flex items-center justify-center z-20 px-3 sm:px-4 md:px-6 lg:px-8">
                            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center max-w-full mt-16">
                                <h1 className="text-white-text-primary leading-tight text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal break-words">
                                    Curated Dishes, Crafted Moments, Dining{" "}
                                    <span className="text-gold-text">Elevated</span> to Emotion.
                                </h1>
                                <p className="text-white-text-secondary leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-light break-words">
                                    At Cureé, we turn every bite into a memory with artistry, intention, and an
                                    unmistakable sense of elegance.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleSeeAllDishes}
                                    className="mx-auto mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg lg:text-xl text-white-text-primary bg-red-base rounded-md hover:bg-red-dark transition-colors duration-600 ease-in-out whitespace-nowrap min-h-[44px] flex items-center justify-center">
                                    See All Dishes
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
