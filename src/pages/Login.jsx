import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import loginBanner from "../assets/Banner Images/banner-4.webp";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { message, type } = location.state || {};
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        window.history.replaceState({}, document.title);
    }, [message, type]);

    const handleLogin = (e) => {
        e.preventDefault();
        const formValue = e.target;
        const password = formValue.password.value;
        const email = formValue.email.value;

        signIn(email, password)
            .then(() => {
                toast.success("Congratulations! You Have Logged in Successfully!");
                setTimeout(() => {
                    navigate(from);
                });
            })
            .catch(() => {
                toast.error("One or more Invalid Credentials! Please Try Again!");
            });
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success("Congratulations! You Have Logged in Successfully!");
            setTimeout(() => {
                navigate(from);
            });
        } catch (error) {
            toast.error(error, "Google sign-in failed! Please try again!");
        }
    };

    return (
        <div className="min-h-dvh bg-background-primary flex flex-col">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

            <div></div>

            {/* Responsive Layout */}
            <div className="flex-1">
                <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-120px)] items-stretch ">
                    {/* Banner Image: hidden on <lg screens */}
                    <div className="hidden lg:block relative w-7/12 h-[calc(100vh-120px)]">
                        <img
                            src={loginBanner}
                            className="w-full h-full object-cover"
                            alt="login screen banner image with leafy pattern"
                        />
                        {/* Logo + white BG */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-5/12 mx-auto space-y-6">
                            <div className="w-6/12 flex flex-col p-3 bg-white-base rounded-lg">
                                <img src="/Logo V2.svg" alt="Curee logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-3xl text-white-text-primary">Fine Dining Restaurant</h1>
                        </div>
                    </div>

                    {/* Login Form: full width on mobile/tablet, right side on lg+ */}
                    <div className="w-full lg:w-5/12 px-2 sm:px-4 flex items-center justify-center h-auto lg:h-[calc(100vh-120px)] py-8 lg:py-0">
                        <div className="w-full max-w-10/12 mx-auto rounded-xl bg px-4 py-6 sm:py-8">
                            {/* Title & Subtitle */}
                            <div className="flex flex-col gap-3 mt-2 sm:mt-6">
                                <h2 className="text-2xl sm:text-3xl leading-9 sm:leading-11 text-left font-bold text-card-main-text">
                                    Sign in to let the curation begin at
                                    <span className="text-red-base"> CUREÉ.</span>
                                </h2>
                                <p className="text-card-subtext text-sm sm:text-base text-left">
                                    Every journey back to Cureé is the beginning of something exquisite.
                                </p>
                            </div>

                            {/* Divider Line */}
                            <hr className="mt-6 sm:mt-8 border-1/2 mx-auto w-full text-card-stroke" />

                            <div className="mt-6">
                                {/* Form Start */}
                                <form onSubmit={handleLogin}>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-base">Email</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-input-stroke rounded-lg mt-2 focus:outline-red-base bg-input-background text-black-text-base placeholder-card-subtext"
                                                type="email"
                                                placeholder="Please enter your email"
                                                name="email"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-base">Password</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full text-base px-4 py-2 border border-gray-border-primary rounded-lg mt-2 focus:outline-red-base bg-input-background text-black-text-base placeholder-card-subtext"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-4 top-[0.55rem] flex items-center text-xl text-black-text-light cursor-pointer"
                                                    onClick={() => setShowPassword((prev) => !prev)}>
                                                    {showPassword ? (
                                                        <AiOutlineEyeInvisible className="text-red-base" />
                                                    ) : (
                                                        <AiOutlineEye className="text-red-base" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-md">
                                                <Link 
                                                    to="/auth/forgot-password"
                                                    className="text-black-text-base hover:text-red-base underline transition ease-in duration-300"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center bg-red-base hover:bg-red-dark text-white-text-primary p-3 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {/* Form End */}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-center">
                                        <p className="text-md text-black-text-base font-medium mt-6">or</p>
                                    </div>

                                    {/* Google Login Button */}

                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignIn}
                                            className="w-full flex items-center justify-center gap-2 bg-background-primary text-black-text-base p-3 rounded-lg border border-black-text-light font-semibold hover:bg-card-background cursor-pointer transition ease-in duration-400">
                                            <FcGoogle size={24} />
                                            Sign in with Google
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-black-text-light text-center">
                                            Don't have an Account?
                                            <span className="ml-2">
                                                <Link
                                                    to={"/auth/registration"}
                                                    className="underline font-medium text-red-base">
                                                    Register
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
