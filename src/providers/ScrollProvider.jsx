import ScrollContext from "@/contexts/ScrollContext";
import React, { useRef } from "react";

export const ScrollProvider = ({ children }) => {
    const contactRef = useRef(null);
    const reviewsRef = useRef(null);

    const scrollTo = (section) => {
        const refs = {
            contact: contactRef,
            reviews: reviewsRef,
        };

        refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
    };

    return <ScrollContext.Provider value={{ contactRef, reviewsRef, scrollTo }}>{children}</ScrollContext.Provider>;
};
