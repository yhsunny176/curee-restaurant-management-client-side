import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import TopFoodItems from "../../components/TopFoodItems";
import { useLocation } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Home = () => {
    const location = useLocation();
    const { message, type } = location.state || {};

    useEffect(() => {
        if (message) {
            if (type === "success") {
                toast.success(message);
            }
        }

        window.history.replaceState({}, document.title);
    }, [message, type]);
    return (
        <div>
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

            <div className="w-full h-[700px] lg:h-[900px]">
                <Banner></Banner>
            </div>

            <div className="bg-background-primary">
                <TopFoodItems></TopFoodItems>
            </div>
        </div>
    );
};

export default Home;
