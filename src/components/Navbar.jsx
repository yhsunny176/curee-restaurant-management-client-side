import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import placeHolderAvatar from "../assets/profile.png";
import ButtonLoader from "./ButtonLoader";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import useScroll from "@/hooks/useScroll";

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isLogin = location.pathname === "/auth/login";
    const isRegister = location.pathname === "/auth/registration";
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { scrollTo } = useScroll();

    const { user, logOut, loading } = useContext(AuthContext);

    // Auto-close drawer on md and up
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                const drawer = document.getElementById("my-drawer-3");
                if (drawer && drawer.checked) {
                    drawer.checked = false;
                }
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const handleScroll = (section) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => scrollTo(section), 100);
        } else {
            scrollTo(section);
        }
    };

    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col border-b border-gray-border-primary">
                    {/* Navbar */}
                    <div
                        className={`navbar bg-transparent w-full justify-between backdrop-filter backdrop-blur-2xl bg-opacity-0 ${
                            isLogin || isRegister ? "lg:max-w-11/12 lg:mx-auto" : "lg:max-w-7xl lg:mx-auto"
                        } lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8`}>
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="my-drawer-3"
                                aria-label="open sidebar"
                                className="cursor-pointer rounded-sm p-2 hover:text-black-text-dark hover:bg-white-transparent active:bg-white-transparent transition-colors duration-600 ease-in-out inline-flex items-center justify-center min-h-[44px] min-w-[44px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                    color={isHome ? "#FEFDFD" : theme === "light" ? "#1F1F1F" : "#FEFDFD"}
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
                                    src={isHome || theme === "dark" ? "/logo.svg" : "/Logo V2.svg"}
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
                                        className={`hover:text-red-base transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-primary hover:text-gold-text"
                                                : "text-black-text-base hover:text-gold-text"
                                        }`}>
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/all-foods"
                                        className={`hover:text-red-base transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-primary hover:text-gold-text"
                                                : "text-black-text-base hover:text-gold-text"
                                        }`}>
                                        All Foods
                                    </NavLink>
                                    <NavLink
                                        to="/gallery"
                                        className={`hover:text-red-base transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-primary hover:text-gold-text"
                                                : "text-black-text-base hover:text-gold-text"
                                        }`}>
                                        Gallery
                                    </NavLink>
                                    <NavLink
                                        onClick={() => handleScroll("reviews")}
                                        className={`hover:text-red-base transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-primary hover:text-gold-text"
                                                : "text-black-text-base hover:text-gold-text"
                                        }`}>
                                        Reviews
                                    </NavLink>
                                    <NavLink
                                        onClick={() => handleScroll("contact")}
                                        className={`hover:text-red-base transition-colors text-sm lg:text-base xl:text-lg duration-300 ease-in-out whitespace-nowrap ${
                                            isHome
                                                ? "text-white-text-primary hover:text-gold-text"
                                                : "text-black-text-base hover:text-gold-text"
                                        }`}>
                                        Contact Us
                                    </NavLink>
                                </nav>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                                <div>
                                    <ThemeToggle />
                                </div>

                                {/* Avatar with Dropdown */}
                                {user && (
                                    <div className="flex-none relative">
                                        <div
                                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full overflow-hidden border-2 border-white-transparent hover:border-gold-text transition-colors duration-300 cursor-pointer"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                            <img
                                                alt="User avatar"
                                                src={user?.photoURL || placeHolderAvatar}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = placeHolderAvatar;
                                                }}
                                            />
                                        </div>

                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-background-primary rounded-lg shadow-card border border-gray-border-primary py-2 z-50">
                                                <Link
                                                    to="/add-food"
                                                    className="block px-4 py-2 text-black-text-base hover:bg-gray-50 hover:text-red-base transition-colors duration-200"
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Add Food
                                                </Link>
                                                <Link
                                                    to={`/my-foods/${user?.email}`}
                                                    className="block px-4 py-2 text-black-text-base hover:bg-gray-50 hover:text-red-base transition-colors duration-200"
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    My Foods
                                                </Link>
                                                <Link
                                                    to={`/my-orders/${user?.email}`}
                                                    className="block px-4 py-2 text-black-text-base hover:bg-gray-50 hover:text-red-base transition-colors duration-200"
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    My Orders
                                                </Link>
                                                <div className="border-t border-gray-border-primary my-1"></div>
                                                <div className="px-4 py-2">
                                                    <p className="text-xs text-black-text-light font-medium">
                                                        Signed in as:
                                                    </p>
                                                    <p className="text-sm text-black-text-base truncate">
                                                        {user?.displayName || user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Backdrop to close dropdown when clicking outside */}
                                        {isDropdownOpen && (
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsDropdownOpen(false)}></div>
                                        )}
                                    </div>
                                )}

                                <div className="flex-none hidden md:block">
                                    {loading ? (
                                        <div className="cursor-pointer bg-red-text-base text-white-text-primary px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md flex items-center justify-center">
                                            <ButtonLoader size={20} color="#ffffff" />
                                        </div>
                                    ) : user ? (
                                        <button
                                            className="cursor-pointer bg-red-text-base text-white-text-primary px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-dark active:bg-red-dark transition-colors duration-600 ease-in-out flex items-center justify-center"
                                            onClick={handleLogOut}>
                                            Logout
                                        </button>
                                    ) : (
                                        <Link
                                            to={"/auth/login"}
                                            className={
                                                "md:block cursor-pointer bg-red-text-base text-white-text-primary px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-dark active:bg-red-dark transition-colors duration-600 ease-in-out flex items-center justify-center"
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
                    <ul className="menu bg-card-background border-r border-card-stroke min-h-full w-80 p-4 space-y-8">
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
                                    color={theme === "light" ? `#1F1F1F` : `FEFEFE`}
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
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-lg text-card-main-text duration-300 ease-in-out`}>
                            Home
                        </NavLink>
                        <NavLink
                            to="/all-foods"
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-lg text-card-main-text duration-300 ease-in-out`}>
                            All Foods
                        </NavLink>
                        <NavLink
                            to="/gallery"
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-lg text-card-main-text duration-300 ease-in-out`}>
                            Gallery
                        </NavLink>
                        <NavLink
                            onClick={() => {
                                const drawer = document.getElementById("my-drawer-3");
                                if (drawer) drawer.checked = false;
                                setTimeout(() => handleScroll("reviews"), 100);
                            }}
                            className={`hover:text-gold-text focus:text-gold-text active:text-gold-text transition-colors text-lg text-card-main-text duration-300 ease-in-out`}>
                            Reviews
                        </NavLink>
                        <NavLink
                            onClick={() => {
                                const drawer = document.getElementById("my-drawer-3");
                                if (drawer) drawer.checked = false;
                                setTimeout(() => handleScroll("contact"), 100);
                            }}
                            className={`hover:text-gold-text active:text-gold-text transition-colors text-lg text-card-main-text duration-300 ease-in-out`}>
                            Contact Us
                        </NavLink>
                        <div className="flex-none md:hidden">
                            {loading ? (
                                <div className="cursor-pointer bg-red-text-base text-white-text-primary px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md flex items-center justify-center">
                                    <ButtonLoader size={20} color="#ffffff" />
                                </div>
                            ) : user ? (
                                <button
                                    className="cursor-pointer bg-red-text-base text-white-text-primary px-8 py-3 md:px-8 md:py-3 lg:px-12 lg:py-4 text-md md:text-lg lg:text-xl rounded-md hover:bg-red-dark active:bg-red-dark transition-colors duration-600 ease-in-out flex items-center justify-center"
                                    onClick={handleLogOut}>
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to={"/auth/login"}
                                    className={
                                        "cursor-pointer bg-red-text-base text-white-text-primary px-5 py-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-md hover:bg-red-dark active:bg-red-dark transition-colors duration-600 ease-in-out flex items-center justify-center"
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
