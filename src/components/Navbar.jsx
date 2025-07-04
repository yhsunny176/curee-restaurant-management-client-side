import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import placeHolderAvatar from "../assets/profile.png";

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isLogin = location.pathname === "/auth/login";
    const isRegister = location.pathname === "/auth/registration";

    const navigate = useNavigate();

    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/auth/login", {
                    state: { message: "Logged out successfully!", type: "success" },
                });
            })
            .catch((error) => {
                navigate("/auth/login", {
                    state: { message: `${error.message}`, type: "error" },
                });
            });
    };

    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div
                        className={`navbar bg-transparent w-full justify-between ${
                            isLogin || isRegister ? "lg:max-w-11/12 lg:mx-auto" : "lg:max-w-7xl lg:mx-auto"
                        } lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8`}>
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="my-drawer-3"
                                aria-label="open sidebar"
                                className="cursor-pointer rounded-sm p-3 hover:text-black-text-600 hover:bg-white-transparent active:bg-white-transparent transition-colors duration-200 ease-in-out inline-flex items-center justify-center min-h-[44px] min-w-[44px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                    color={isHome ? "#FEFDFD" : "#1F1F1F"}
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
                        <div className="flex-none w-32 h-8 sm:w-36 sm:h-10 md:w-40 md:h-11 lg:w-44 lg:h-12 xl:w-48 xl:h-14 hidden lg:block">
                            <Link to="/">
                                <img
                                    src={isHome ? "/logo.svg" : "/Logo V2.svg"}
                                    alt="Curee restaurant logo"
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6">
                            <div className="hidden flex-none lg:block">
                                <nav className="flex space-x-4 lg:space-x-6 xl:space-x-8">
                                    <NavLink
                                        to="/"
                                        className={`hover:text-red-primary-600 transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-400 hover:text-gold-text"
                                                : "text-black-text-500 hover:text-gold-text"
                                        }`}>
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className={`hover:text-red-primary-600 transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-400 hover:text-gold-text"
                                                : "text-black-text-500 hover:text-gold-text"
                                        }`}>
                                        All Foods
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className={`hover:text-red-primary-600 transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-400 hover:text-gold-text"
                                                : "text-black-text-500 hover:text-gold-text"
                                        }`}>
                                        Gallery
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className={`hover:text-red-primary-600 transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-400 hover:text-gold-text"
                                                : "text-black-text-500 hover:text-gold-text"
                                        }`}>
                                        Reviews
                                    </NavLink>
                                    <NavLink
                                        to=""
                                        className={`hover:text-red-primary-600 transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-400 hover:text-gold-text"
                                                : "text-black-text-500 hover:text-gold-text"
                                        }`}>
                                        Contact Us
                                    </NavLink>
                                </nav>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                                <div className="flex-none">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full overflow-hidden border-2 border-white-transparent hover:border-gold-text transition-colors duration-300">
                                        <img
                                            alt="User avatar"
                                            src={user?.photoURL || placeHolderAvatar}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-none hidden md:block">
                                    {loading ? (
                                        <div className="cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : user ? (
                                        <button
                                            className="cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-primary-700 active:bg-red-primary-700 transition-colors duration-600 ease-in-out flex items-center justify-center"
                                            onClick={handleLogOut}>
                                            Logout
                                        </button>
                                    ) : (
                                        <Link
                                            to={"/auth/login"}
                                            className={
                                                "md:block cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-primary-700 active:bg-red-primary-700 transition-colors duration-600 ease-in-out flex items-center justify-center"
                                            }>
                                            Login
                                        </Link>
                                    )}
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
                                className="cursor-pointer rounded-sm p-3 hover:bg-hover-gray-100 active:bg-hover-gray-100 transition-colors duration-200 ease-in-out inline-flex items-center justify-center min-h-[44px] min-w-[44px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    color={`#1F1F1F`}
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
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-base duration-300 ease-in-out`}>
                            Home
                        </NavLink>
                        <NavLink
                            to=""
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-base duration-300 ease-in-out`}>
                            All Foods
                        </NavLink>
                        <NavLink
                            to=""
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-base duration-300 ease-in-out`}>
                            Gallery
                        </NavLink>
                        <NavLink
                            to=""
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-base duration-300 ease-in-out`}>
                            Reviews
                        </NavLink>
                        <NavLink
                            to=""
                            className={`hover:text-gold-text active:text-gold-text transition-colors text-base duration-300 ease-in-out`}>
                            Contact Us
                        </NavLink>
                        <div className="flex-none md:hidden">
                            {loading ? (
                                <div className="cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : user ? (
                                <button
                                    className="cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-primary-700 active:bg-red-primary-700 transition-colors duration-600 ease-in-out flex items-center justify-center"
                                    onClick={handleLogOut}>
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to={"/auth/login"}
                                    className={
                                        "cursor-pointer bg-red-text-500 text-white-text-400 px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-primary-700 active:bg-red-primary-700 transition-colors duration-600 ease-in-out flex items-center justify-center"
                                    }>
                                    Login
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
