import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-transparent w-full justify-between lg:max-w-8/12 lg:mx-auto lg:py-3 lg:px-0">
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="my-drawer-3"
                                aria-label="open sidebar"
                                className="cursor-pointer rounded-sm p-3 hover:bg-hover-gray-100 active:bg-hover-gray-100 transition-colors duration-200 ease-in-out inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    color={"#000000"}
                                    fill={"none"}>
                                    <path
                                        d="M4 5L14 5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                    <path
                                        d="M4 12L20 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                    <path
                                        d="M4 19L20 19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-none w-42 h-12 hidden lg:block">
                            <Link to="/">
                                <img
                                    src="/logo.svg"
                                    alt="Curee restaurant logo"
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center space-x-10">
                            <div className="hidden flex-none lg:block">
                                <nav className="flex space-x-6 text-white-text-400">
                                    <NavLink
                                        to="/"
                                        className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                                        All Foods
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                                        Gallery
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                                        Reviews
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                                        Contact Us
                                    </NavLink>
                                </nav>
                            </div>

                            <div className="flex items-center gap-5 ml-10">
                                <div className="flex-none">
                                    <div className="btn btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-none">
                                    <Link className="px-4 py-2 text-white-text-400 bg-red-primary-600 rounded-md hover:bg-red-primary-700 transition-colors duration-600 ease-in-out">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Start */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-8">
                        {/* Close Button */}
                        <div className="flex justify-end mb-4">
                            <label
                                htmlFor="my-drawer-3"
                                className="cursor-pointer rounded-sm p-3 hover:bg-hover-gray-100 active:bg-hover-gray-100 transition-colors duration-200 ease-in-out inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    color={"#000000"}
                                    fill={"none"}>
                                    <path
                                        d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                            </label>
                        </div>
                        {/* Sidebar Content */}
                        <NavLink
                            to="/"
                            className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                            Home
                        </NavLink>
                        <NavLink
                            to=""
                            className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                            All Foods
                        </NavLink>
                        <NavLink
                            to=""
                            className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                            Gallery
                        </NavLink>
                        <NavLink
                            to=""
                            className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                            Reviews
                        </NavLink>
                        <NavLink
                            to=""
                            className="hover:text-gold-text transition-colors text-base duration-300 ease-in-out">
                            Contact Us
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
