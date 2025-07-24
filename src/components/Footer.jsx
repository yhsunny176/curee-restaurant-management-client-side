import { useTheme } from "@/hooks/useTheme";
import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { Link, NavLink } from "react-router";

const Footer = () => {
    const theme = useTheme();
    const isHome = location.pathname === "/";

    return (
        <div className="w-full px-4 py-8">
            <div className="max-w-11/12 lg:max-w-10/12 xl:max-w-9/12 2xl:max-w-8/12 mx-auto">
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-6 lg:justify-start lg:mb-0">
                        <div className="w-32 h-16 sm:w-36 sm:h-10 md:w-40 md:h-11 lg:w-44 lg:h-12 xl:w-48 xl:h-14">
                            <Link to="/">
                                <img
                                    src={isHome || theme === "dark" ? "/Logo V2.svg" : "/logo.svg"}
                                    alt="Curee restaurant logo"
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Basic Links */}
                    <div className="flex flex-col items-center gap-3 lg:items-start">
                        <span className="text-lg text-red-dark font-bold">Links:</span>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5">
                            <NavLink
                                to="/"
                                className={`text-card-main-text hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                Home
                            </NavLink>
                            <NavLink
                                to="/all-foods"
                                className={`text-card-main-text hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                All Foods
                            </NavLink>
                            <NavLink
                                to="/gallery"
                                className={`text-card-main-text hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                Gallery
                            </NavLink>
                            <NavLink
                                to=""
                                className={`text-card-main-text hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                Reviews
                            </NavLink>
                            <NavLink
                                to=""
                                className={`text-card-main-text hover:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                Contact Us
                            </NavLink>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center gap-3 lg:items-start">
                        <span className="text-lg text-red-dark font-bold">Social Links:</span>
                        <div className="flex gap-3 sm:gap-5 justify-center md:justify-end">
                            <Link
                                to="https://www.facebook.com/yeasinulhaqsani"
                                className={`text-black-text-light hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                <AiOutlineFacebook size={32} />
                            </Link>
                            <Link
                                to="https://instagram.com/"
                                className={`text-black-text-light  hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                <AiOutlineInstagram size={32} />
                            </Link>
                            <Link
                                to="https://www.linkedin.com/in/yeasinulhaquesani/"
                                className={`text-black-text-light  hover:text-red-text-base focus:text-red-text-base active:text-red-text-base transition-colors text-lg duration-500 ease-in-out`}>
                                <AiOutlineLinkedin size={32} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-card-stroke w-full my-8 md:my-12"></div>

                <div className="w-full flex items-center justify-center">
                    <p className="text-md text-black-text-light text-center">
                        ©2025 Curee Fine Dining. Developed & Maintained by Yeasinul Haque Sani
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
