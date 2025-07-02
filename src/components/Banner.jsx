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
import { Link } from "react-router";

const Banner = () => {
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
                    <div className="relative">
                        <img src={banner1} alt="Banner image 1 containing risotto dish image" />
                        <div className="absolute inset-0 bg-overlay-dark"></div>
                        <div className="w-6/10 h-auto mx-auto absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex flex-col space-y-3">
                                <h1 className="text-white-text-400 leading-h1 text-5xl font-normal">
                                    Handcrafted <span className="text-gold-text">Culinary</span> Art, Designed to
                                    Delight the Senses.
                                </h1>
                                <p className="text-white-text-100 leading-p1 text-lg font-light">
                                    Step into a world of refined flavors, where each dish tells a story and every bite
                                    is an unforgettable experience.
                                </p>

                                <Link className="mx-auto mt-8 px-12 py-3 text-white-text-400 bg-red-primary-600 rounded-md hover:bg-red-primary-700 transition-colors duration-600 ease-in-out">
                                    See All Dishes
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={banner2} alt="Banner image 1 containing risotto dish image" />
                        <div className="absolute inset-0 bg-overlay-dark"></div>
                        <div className="w-6/10 h-auto mx-auto absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex flex-col space-y-3">
                                <h1 className="text-white-text-400 leading-h1 text-5xl font-normal">
                                    Where <span className="text-gold-text">Flavor</span> Meets{" "}
                                    <span className="text-gold-text">Precision</span>, and Atmosphere Becomes Art.
                                </h1>
                                <p className="text-white-text-100 leading-p1 text-lg font-light">
                                    Indulge in a carefully composed dining experience where every plate, scent, and
                                    sound is part of the story.
                                </p>

                                <Link className="mx-auto mt-8 px-12 py-3 text-white-text-400 bg-red-primary-600 rounded-md hover:bg-red-primary-700 transition-colors duration-600 ease-in-out">
                                    See All Dishes
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={banner3} alt="Banner image 1 containing risotto dish image" />
                        <div className="absolute inset-0 bg-overlay-dark"></div>
                        <div className="w-6/10 h-auto mx-auto absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex flex-col space-y-3">
                                <h1 className="text-white-text-400 leading-h1 text-5xl font-normal">
                                    Curated Dishes, Crafted Moments, Dining{" "}
                                    <span className="text-gold-text">Elevated</span> to Emotion.
                                </h1>
                                <p className="text-white-text-100 leading-p1 text-lg font-light">
                                    At Cureé, we turn every bite into a memory with artistry, intention, and an
                                    unmistakable sense of elegance.
                                </p>

                                <Link className="mx-auto mt-8 px-12 py-3 text-white-text-400 bg-red-primary-600 rounded-md hover:bg-red-primary-700 transition-colors duration-600 ease-in-out">
                                    See All Dishes
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
