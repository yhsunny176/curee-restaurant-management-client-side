import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import loginBanner from "../assets/Banner Images/banner-4.webp";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { message, type } = location.state || {};
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (message) {
            if (type === "success") {
                toast.success(message);
            }
        }

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
            toast.error("Google sign-in failed! Please try again.");
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div>
            <div>
                {/* Navbar */}
                <header>
                    <Navbar></Navbar>
                </header>

                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                        toastClassName={() =>
                            "relative w-[95%] sm:w-full sm:max-w-md mx-auto bg-white text-black shadow-lg rounded-lg p-4 mt-15"
                        }
                        bodyClassName={() => "text-sm sm:text-base font-medium"}
                    />
                </div>

                {/* Left Side / Banner Image */}
                <div className="flex h-[calc(100vh-120px)] items-stretch">
                    <div className="relative w-7/12 h-[calc(100vh-120px)]">
                        <img
                            src={loginBanner}
                            className="w-full h-full object-cover"
                            alt="login screen banner image with leafy pattern"
                        />
                        {/* Logo + white BG */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-5/12 mx-auto space-y-6">
                            <div className="w-6/12 flex flex-col p-3 bg-base-white rounded-lg">
                                <img src="/Logo V2.svg" alt="Curee logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-3xl text-white-text-400">Fine Dining Restaurant</h1>
                        </div>
                    </div>

                    {/* Right Side / Login Form */}
                    <div className="w-5/12 px-4 h-[calc(100vh-120px)] flex items-center">
                        <div className="max-w-9/12 mx-auto rounded-xl bg-base-white">
                            {/* Title & Subtitle */}
                            <div className="flex flex-col gap-3 mt-6">
                                <h2 className="text-3xl leading-11 sm:text-left font-bold text-black-text-600">
                                    Sign in to let the curation begin at
                                    <span className="text-red-primary-600"> CUREÉ.</span>
                                </h2>
                                <p className="text-black-text-100 text-sm text-left">
                                    Every journey back to Cureé is the beginning of something exquisite.
                                </p>
                            </div>

                            {/* Divider Line */}
                            <hr className="mt-8 border-1/2 mx-auto w-full border-gray-200" />

                            <div className="mt-6">
                                {/* Form Start */}
                                <form onSubmit={handleLogin}>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-500">Email</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-border-gray-200 rounded-lg mt-2 focus:outline-red-text-500 bg-base-white text-black-text-500 placeholder-black-text-100"
                                                type="email"
                                                placeholder="Please enter your email"
                                                name="email"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-500">Password</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full text-base px-4 py-2 border border-border-gray-200 rounded-lg mt-2 focus:outline-red-text-500 bg-base-white text-black-text-500 placeholder-black-text-100"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-4 top-[0.55rem] flex items-center text-xl text-black-text-100 cursor-pointer"
                                                    onClick={() => setShowPassword((prev) => !prev)}>
                                                    {showPassword ? (
                                                        <AiOutlineEyeInvisible className="text-red-primary-600" />
                                                    ) : (
                                                        <AiOutlineEye className="text-red-primary-600" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-md">
                                                <Link className="text-black-text-500 hover:text-red-primary-600 underline">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center bg-red-primary-600 hover:bg-red-primary-700 text-white-text-400 p-3 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {/* Form End */}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-center">
                                        <p className="text-md text-black-text-500 font-medium mt-6">or</p>
                                    </div>

                                    {/* Google Login Button */}

                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignIn}
                                            className="w-full flex items-center justify-center gap-2 bg-base-white text-black-text-500 p-3 rounded-lg border border-black-text-100 font-semibold hover:bg-gray-100 cursor-pointer transition ease-in duration-400">
                                            <FcGoogle size={24} />
                                            Sign in with Google
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-black-text-100 text-center">
                                            Don't have an Account?
                                            <span className="ml-2">
                                                <Link
                                                    to={"/auth/registration"}
                                                    className="underline font-medium text-red-primary-600">
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
