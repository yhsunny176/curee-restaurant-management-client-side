import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import animation404 from "../assets/Lotties/404_animation.json";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-primary px-4 py-8">
            <div className="text-center mx-auto max-w-4xl">
                <div className="w-11/12 h-full sm:w-9/12 sm:h-full md:w-11/12 md:h-full lg:w-2xl lg:h-full mx-auto mb-6 md:mb-8">
                    <Lottie animationData={animation404} loop={true} />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black-text-base mb-3 md:mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-black-text-base mb-6 md:mb-8 px-2 max-w-2xl mx-auto">
                        Sorry, the page you are looking for doesn't exist.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-red-base text-white-base px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-red-dark transition-colors">
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
