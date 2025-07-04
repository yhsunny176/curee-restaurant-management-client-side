import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router";
import loginBanner from "../assets/Banner Images/banner-4.webp";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUser, setUser } = useContext(AuthContext);

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

                {/* Banner + Form Layout */}
                <div className="flex h-[calc(100vh-120px)] items-stretch">
                    {/* Left Side / Banner Image */}
                    <div className="relative w-7/12 h-[calc(100vh-60px)]">
                        <img
                            src={loginBanner}
                            className="w-full h-full object-cover"
                            alt="register screen banner image with leafy pattern"
                        />
                        {/* Logo + white BG */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-5/12 mx-auto space-y-6">
                            <div className="w-6/12 flex flex-col p-3 bg-base-white rounded-lg">
                                <img src="/Logo V2.svg" alt="Curee logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-3xl text-white-text-400">Fine Dining Restaurant</h1>
                        </div>
                    </div>

                    {/* Right Side / Register Form */}
                    <div className="w-5/12 px-4 pt-6 h-[calc(100vh-120px)] flex items-center">
                        <div className="max-w-9/12 mx-auto rounded-xl bg-base-white">
                            {/* Title & Subtitle */}
                            <div className="flex flex-col gap-3 mt-6">
                                <h2 className="text-3xl leading-11 sm:text-left font-bold text-black-text-600">
                                    Register to join the curation at
                                    <span className="text-red-primary-600"> CUREÉ.</span>
                                </h2>
                                <p className="text-black-text-100 text-sm text-left">
                                    Create your account to experience fine dining and curated moments.
                                </p>
                            </div>

                            {/* Divider Line */}
                            <hr className="mt-8 border-1/2 mx-auto w-full border-gray-200" />

                            <div className="mt-6">
                                {/* Form Start */}
                                <form onSubmit={handleRegistration}>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-500">Name</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-border-gray-200 rounded-lg mt-2 focus:outline-red-text-500 bg-base-white text-black-text-500 placeholder-black-text-100"
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                required
                                            />
                                        </div>
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
                                            <label className="text-md font-bold text-black-text-500">Photo URL</label>
                                            <input
                                                className="w-full text-base px-4 py-2 border border-border-gray-200 rounded-lg mt-2 focus:outline-red-text-500 bg-base-white text-black-text-500 placeholder-black-text-100"
                                                type="url"
                                                placeholder="Paste your photo URL"
                                                name="photoURL"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-md font-bold text-black-text-500">Password</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full text-base px-4 py-2 border border-border-gray-200 rounded-lg mt-2 focus:outline-none focus:border-gold-text bg-base-white text-black-text-500 placeholder-black-text-100"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Create a password"
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
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center bg-red-primary-600 hover:bg-red-primary-700 text-white-text-400 p-3 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {/* Form End */}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-center">
                                        <p className="text-md text-black-text-500 font-medium mt-6">or</p>
                                    </div>

                                    {/* Google Register Button */}
                                    <div>
                                        <button
                                            type="button"
                                            className="w-full flex items-center justify-center gap-2 bg-base-white text-black-text-500 p-3 rounded-lg border border-black-text-100 font-semibold hover:bg-gray-100 cursor-pointer transition ease-in duration-400">
                                            <FcGoogle size={24} />
                                            Sign up with Google
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-black-text-100 text-center">
                                            Already have an Account?
                                            <span className="ml-2">
                                                <Link
                                                    to={"/auth/login"}
                                                    className="underline font-medium text-red-primary-600">
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
