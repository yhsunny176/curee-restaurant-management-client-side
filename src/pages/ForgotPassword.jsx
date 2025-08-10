import React, { useState } from "react";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address!");
            return;
        }

        setLoading(true);

        try {
            // Custom action code settings to improve email appearance
            const actionCodeSettings = {
                // URL you want to redirect back to after the user clicks the link in the email
                url: window.location.origin + "/auth/login",
                // This must be true for email link sign-in
                handleCodeInApp: true,
            };

            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            toast.success("Password reset email sent successfully! Please check your email.");
            setEmail("");
        } catch (error) {
            let errorMessage = "Failed to send password reset email. Please try again.";

            if (error.code === "auth/user-not-found") {
                errorMessage = "No user found with this email address.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Please enter a valid email address.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many requests. Please try again later.";
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-background-primary flex items-center justify-center p-4 relative">
            {/* Back to Home Link */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-black-text-base hover:text-red-base font-medium text-sm transition ease-in duration-300">
                    <AiOutlineArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>

            {/* Centered Container with Border */}
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                <div className="bg-card-background border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="w-24 sm:w-32 md:w-36 flex flex-col p-3 bg-white-base rounded-lg">
                            <img src="/Logo V2.svg" alt="Curee logo" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col gap-3 text-center mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl leading-tight font-bold text-card-main-text">
                            Reset your password for
                            <span className="text-red-base"> CUREÉ.</span>
                        </h2>
                        <p className="text-card-subtext text-sm sm:text-base">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Divider Line */}
                    <hr className="border-card-stroke mb-6 sm:mb-8" />

                    {/* Form Start */}
                    <form onSubmit={handlePasswordReset} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm sm:text-md font-bold text-black-text-base">
                                Email Address
                            </label>
                            <input
                                className="w-full text-sm sm:text-base px-4 py-2.5 sm:py-3 border border-input-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-red-base focus:border-red-base bg-input-background text-black-text-base placeholder-card-subtext transition ease-in duration-300"
                                type="email"
                                placeholder="Please enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center bg-red-base hover:bg-red-dark text-white-text-primary p-3 sm:p-3.5 rounded-lg font-semibold hover:shadow-card cursor-pointer transition ease-in duration-400 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base">
                                {loading ? "Sending..." : "Send Reset Email"}
                            </button>
                        </div>
                    </form>
                    {/* Form End */}

                    {/* Links Section */}
                    <div className="space-y-4 mt-6 sm:mt-8">
                        <div className="flex items-center justify-center">
                            <p className="text-sm sm:text-md text-black-text-base font-medium">or</p>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm sm:text-base text-black-text-light">
                                Remember your password?
                                <span className="ml-2">
                                    <Link
                                        to="/auth/login"
                                        className="underline font-medium text-red-base hover:text-red-dark transition ease-in duration-300">
                                        Sign In
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
