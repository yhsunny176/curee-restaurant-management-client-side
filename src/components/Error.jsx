import React from "react";
import { Link } from "react-router";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-primary">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-black-text-dark mb-4">404</h1>
                <h2 className="text-4xl font-semibold text-black-text-base mb-4">Page Not Found</h2>
                <p className="text-xl text-black-text-base mb-8">Sorry, the page you are looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="bg-red-base text-white-base px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-dark transition-colors">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
