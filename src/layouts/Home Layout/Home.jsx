import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import TopFoodItems from "../../components/TopFoodItems";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import ReviewSection from "@/components/ReviewSection";
import ContactUs from "@/components/ContactUs";
import useScroll from "@/hooks/useScroll";

const Home = () => {
    const location = useLocation();
    const { message, type } = location.state || {};
    const { reviewsRef } = useScroll();
    const { contactRef } = useScroll();

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
            <section className="w-full h-[700px] lg:h-[900px]">
                <Banner/>
            </section>

            <section className="bg-background-primary">
                <TopFoodItems></TopFoodItems>
            </section>

            <section id="reviews" ref={reviewsRef} className="bg-background-secondary">
                <ReviewSection />
            </section>

            <section id="contact" ref={contactRef} className="bg-red-dark">
                <ContactUs />
            </section>
        </div>
    );
};

export default Home;
