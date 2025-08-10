import React from "react";
import heritageImg1 from "../assets/Card Images/card-image-3.webp";
import heritageImg3 from "../assets/Card Images/card-image-7.webp";
import { FadeInText, FadeInFromLeft } from "./ScrollAnimations";

const Heritage = () => {
    return (
        <div className="max-w-11/12 md:max-w-10/12 xl:max-w-8/12 mx-auto py-16 md:py-24 lg:py-32">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
                <FadeInText>
                    <p className="font-pg font-medium text-xl text-red-text-base mb-4">Our Heritage</p>
                </FadeInText>
                <FadeInText delay={0.2}>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-h1 text-black-text-base mb-6">
                        A Legacy of Culinary Excellence
                    </h1>
                </FadeInText>
                <FadeInText delay={0.3}>
                    <p className="leading-relaxed md:leading-p1 text-black-text-light text-base md:text-lg max-w-4xl mx-auto">
                        For generations, our family has been dedicated to preserving the authentic flavors and
                        time-honored techniques that define exceptional cuisine. Our heritage is woven into every dish
                        we serve.
                    </p>
                </FadeInText>
            </div>

            {/* Heritage Story Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                    <FadeInFromLeft>
                        <div className="relative">
                            <div className="w-full h-80 md:h-96 lg:h-[480px] border border-card-stroke rounded-md overflow-hidden">
                                <img
                                    src={heritageImg1}
                                    alt="Heritage image showcasing traditional cooking methods"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        </div>
                    </FadeInFromLeft>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6">
                    <FadeInText>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-head text-black-text-base text-center lg:text-left">
                            Rooted in <span className="text-red-text-base">Tradition</span>
                        </h2>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="text-black-text-light text-base md:text-lg leading-relaxed text-center lg:text-left">
                            Since 1952, our restaurant has been a cornerstone of authentic cuisine, where recipes have
                            been passed down through three generations. Our founders believed that food should not only
                            nourish the body but also connect people to their roots and create lasting memories.
                        </p>
                    </FadeInText>
                    <FadeInText delay={0.3}>
                        <p className="text-black-text-light text-base md:text-lg leading-relaxed text-center lg:text-left">
                            Every spice blend, every cooking technique, and every presentation style carries the wisdom
                            of our ancestors. We honor this legacy while embracing innovation, creating a dining
                            experience that bridges the past with the present.
                        </p>
                    </FadeInText>
                </div>
            </div>

            {/* Heritage Values Section */}
            <div className="mb-16 md:mb-20">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <FadeInText>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-head text-black-text-base mb-6">
                            Values That <span className="text-red-text-base">Define</span> Us
                        </h2>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="text-black-text-light text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                            Our heritage is built on fundamental pillars that guide every decision we make, from
                            sourcing ingredients from local farmers to maintaining the traditional cooking methods that
                            our grandparents taught us.
                        </p>
                    </FadeInText>
                </div>

                {/* Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <FadeInText delay={0.3}>
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 md:p-8 text-center hover:shadow-card-shadow transition-shadow duration-300 h-full flex flex-col">
                            <div className="w-12 h-12 bg-red-text-base rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-pg font-medium text-xl text-black-text-base mb-3">Authenticity</h3>
                            <p className="text-black-text-light text-sm md:text-base leading-relaxed flex-grow">
                                Preserving original recipes and traditional cooking methods passed down through
                                generations
                            </p>
                        </div>
                    </FadeInText>

                    <FadeInText delay={0.4}>
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 md:p-8 text-center hover:shadow-card-shadow transition-shadow duration-300 h-full flex flex-col">
                            <div className="w-12 h-12 bg-red-text-base rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white-base"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-pg font-medium text-xl text-black-text-base mb-3">Quality</h3>
                            <p className="text-black-text-light text-sm md:text-base leading-relaxed flex-grow">
                                Using only the finest ingredients and meticulous preparation to ensure exceptional
                                dining
                            </p>
                        </div>
                    </FadeInText>

                    <FadeInText delay={0.5}>
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 md:p-8 text-center hover:shadow-card-shadow transition-shadow duration-300 h-full flex flex-col">
                            <div className="w-12 h-12 bg-red-text-base rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white-base"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-pg font-medium text-xl text-black-text-base mb-3">Community</h3>
                            <p className="text-black-text-light text-sm md:text-base leading-relaxed flex-grow">
                                Creating connections and bringing people together through memorable culinary experiences
                            </p>
                        </div>
                    </FadeInText>
                </div>
            </div>

            {/* Future Legacy Section */}
            <div className="text-center">
                <FadeInText>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-head text-black-text-base mb-6">
                        Crafting Tomorrow's <span className="text-red-text-base">Heritage</span>
                    </h2>
                </FadeInText>
                <FadeInText delay={0.2}>
                    <p className="text-black-text-light text-base md:text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
                        While we honor our past, we're also writing the next chapter of our story. Each dish we create,
                        each guest we serve, and each tradition we uphold contributes to the heritage we'll pass on to
                        future generations.
                    </p>
                </FadeInText>
                <FadeInFromLeft delay={0.3}>
                    <div className="w-full max-w-2xl mx-auto h-64 md:h-80 border border-card-stroke rounded-md overflow-hidden">
                        <img
                            src={heritageImg3}
                            alt="Heritage image representing the future of our culinary journey"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </FadeInFromLeft>
            </div>
        </div>
    );
};

export default Heritage;
