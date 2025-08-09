import React from "react";
import { FadeInText } from "./ScrollAnimations";

const ContactUs = () => {
    return (
        <div className="py-16 mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 2xl:max-w-8/12">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                {/* Left Side */}
                <div className="space-y-8 md:w-1/2 w-full text-center md:text-left">
                    <FadeInText>
                        <h1 className="text-4xl font-bold text-white-base">Want to Order food Online?</h1>
                    </FadeInText>

                    <div className="space-y-4">
                        <FadeInText delay={0.2}>
                            <p className="text-xl text-white-base">Call us directly on the hotline numbers:</p>
                        </FadeInText>
                        <FadeInText delay={0.4}>
                            <p className="text-2xl text-gold-text">+999 764 886, +999 423 097</p>
                        </FadeInText>
                    </div>

                    <div className="space-y-3">
                        <FadeInText delay={0.6}>
                            <p className="text-2xl text-white-base">We are located at:</p>
                        </FadeInText>
                        <FadeInText delay={0.8}>
                            <p className="text-md text-white-base">
                                39/5 Zigatola (ground Floor), Dhanmondi, 1209, Dhaka
                            </p>
                        </FadeInText>
                    </div>
                </div>

                <div className="hidden md:block border-r border-white-base mx-8"></div>

                {/* Right Side */}
                <div className="space-y-6 md:w-1/2 w-full mt-8 md:mt-0 text-center md:text-left">
                    <div className="space-y-3">
                        <FadeInText>
                            <h1 className="text-2xl font-bold text-gold-text">Or Submit a Request</h1>
                        </FadeInText>
                        <FadeInText delay={0.2}>
                            <p className="text-white-base text-md">
                                Our Agent will respond to your query as early as possible
                            </p>
                        </FadeInText>
                    </div>

                    <FadeInText delay={0.4}>
                        <div>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    className="bg-white-base rounded-md px-4 py-3 w-full focus:outline-none placeholder-black-text-light"
                                    placeholder="Enter your email address or phone number"></input>
                                <textarea
                                    rows={4}
                                    className="bg-white-base rounded-md px-4 py-3 w-full focus:outline-none placeholder-black-text-light"
                                    placeholder="Enter your message, food name, quantity etc."
                                />
                                <button
                                    type="submit"
                                    className="py-3 px-6 bg-gold-text rounded-lg text-black cursor-pointer hover:shadow-lg transition-shadow duration-500 ease-in-out">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </FadeInText>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
