import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import TopFoodItems from "../../components/TopFoodItems";
import { useLocation } from "react-router";
import { Bounce, toast } from "react-toastify";

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
