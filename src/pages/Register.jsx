import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router";
import loginBanner from "../assets/Banner Images/banner-4.webp";
import { AuthContext } from "../contexts/AuthContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUser, setUser, signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();

        const formValue = e.target;
        const username = formValue.name.value;
        const photo = formValue.photoURL.value;
        const password = formValue.password.value;
        const email = formValue.email.value;

        if (username.length < 6) {
            toast.error("Username must be at least 6 characters long");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (passwordRegex.test(password) === false) {
            toast.error(
                "Must have an Uppercase letter, Lowercase Letter in the password and at least 6 characters long"
            );
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: username, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: username, photoURL: photo });
                    })
                    .catch((error) => {
                        toast.error(`${error.message}`);
                        setUser(user);
                    });
                formValue.reset();

                navigate("/", {
                    state: { message: "Congrats! Registration Successful!", type: "success" },
                });
            })
            .catch((error) => {
                toast.error(`${error.message}`);
            });
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            toast.success("Congratulations! Registration with Google Successful!");
            navigate("/", {
                state: { message: "Congrats! Registration with Google Successful!", type: "success" },
            });
        } catch (error) {
            toast.error("Google sign-up failed! Please try again.");
            console.error("Google sign-up error:", error);
        }
    };

    return (
        <div className="h-screen bg-background-primary flex flex-col overflow-hidden">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

            <div className="flex-shrink-0">
            </div>

            {/* Responsive Layout */}
            <div className="flex-grow h-[calc(100vh-60px)] overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full items-stretch overflow-hidden">
                    {/* Banner Image */}
                    <div className="hidden lg:block relative w-7/12 h-full overflow-hidden">
                        <img
                            src={loginBanner}
                            className="w-full h-full object-cover"
                            alt="register screen banner image with leafy pattern"
                        />
                        {/* Logo + white BG */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-5/12 mx-auto space-y-6">
                            <div className="w-6/12 flex flex-col p-3 bg-white-base rounded-lg">
                                <img src="/Logo V2.svg" alt="Curee logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-3xl text-white-text-primary">Fine Dining Restaurant</h1>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className="w-full lg:w-5/12 px-2 sm:px-4 flex items-center justify-center h-full overflow-hidden">
                        <div className="w-full max-w-10/12 mx-auto rounded-xl bg px-4 py-3 overflow-auto">
                            {/* Title & Subtitle */}
                            <div className="flex flex-col gap-3 mt-2 sm:mt-6">
                                <h2 className="text-2xl sm:text-3xl leading-9 sm:leading-11 text-left font-bold text-card-main-text">
                                    Register to join the curation at
                                    <span className="text-red-base"> CUREÉ.</span>
                                </h2>
                                <p className="text-card-subtext text-sm sm:text-base text-left">
                                    Create your account to experience fine dining and curated moments.
                                </p>
                            </div>

                            {/* Divider Line */}
                            <hr className="mt-6 sm:mt-8 border-1/2 mx-auto w-full text-card-stroke" />

                            <div className="mt-6">
                                {/* Form Start */}
                                <form onSubmit={handleRegistration}>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-base">Name</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-input-stroke rounded-lg mt-2 focus:outline-red-base bg-input-background text-black-text-base placeholder-card-subtext"
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                required
                                            />
                                        </div>
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
                                            <label className="text-md font-bold text-black-text-base">Photo URL</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-input-stroke rounded-lg mt-2 focus:outline-red-base bg-input-background text-black-text-base placeholder-card-subtext"
                                                type="url"
                                                placeholder="Paste your photo URL"
                                                name="photoURL"
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
                                                    placeholder="Create a password"
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
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center bg-red-base hover:bg-red-dark text-white-text-primary p-3 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {/* Form End */}

                                <div className="space-y-2">
                                    <div className="flex items-center justify-center">
                                        <p className="text-md text-black-text-base font-medium mt-2">or</p>
                                    </div>

                                    {/* Google Register Button */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignUp}
                                            className="w-full flex items-center justify-center gap-2 bg-background-primary text-black-text-base p-3 rounded-lg border border-black-text-light font-semibold hover:bg-card-background cursor-pointer transition ease-in duration-400">
                                            <FcGoogle size={24} />
                                            Sign up with Google
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-black-text-light text-center">
                                            Already have an Account?
                                            <span className="ml-2">
                                                <Link
                                                    to={"/auth/login"}
                                                    className="underline font-medium text-red-base">
                                                    Login
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

export default Register;
