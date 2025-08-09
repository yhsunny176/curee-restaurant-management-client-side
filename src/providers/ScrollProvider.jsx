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

        const element = refs[section]?.current;
        if (element) {
            // Calculate the element's position and scroll the window
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementTop - 80, behavior: "smooth" }); // 80px offset for navbar
        }
    };

    return <ScrollContext.Provider value={{ contactRef, reviewsRef, scrollTo }}>{children}</ScrollContext.Provider>;
};
