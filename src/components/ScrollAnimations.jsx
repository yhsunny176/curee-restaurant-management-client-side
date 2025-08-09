/* eslint-disable no-unused-vars */
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ScrollAnimations = ({
    children,
    delay = 0,
    duration = 1.2,
    direction = "up",
    distance = 30,
    className = "",
    threshold = 0.1,
    once = true,
    stagger = false,
    staggerDelay = 0.1,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: once,
        margin: threshold === 0.1 ? "-10px" : `${-threshold * 100}px`,
        amount: threshold,
    });

    // Animation variants based on direction
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? distance : direction === "down" ? -distance : 0,
            x: direction === "left" ? distance : direction === "right" ? -distance : 0,
            scale: direction === "scale" ? 0.8 : 1,
            rotate: direction === "rotate" ? 10 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
                when: "beforeChildren",
                staggerChildren: stagger ? staggerDelay : 0,
            },
        },
    };

    // Stagger variants for child elements
    const staggerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}>
            {stagger ? (
                // If stagger is enabled, wrap children in motion.div for stagger effect
                Array.isArray(children) ? (
                    children.map((child, index) => (
                        <motion.div key={index} variants={staggerVariants}>
                            {child}
                        </motion.div>
                    ))
                ) : (
                    <motion.div variants={staggerVariants}>{children}</motion.div>
                )
            ) : (
                children
            )}
        </motion.div>
    );
};

// Preset components for common use cases
export const FadeInText = ({ children, className = "", ...props }) => (
    <ScrollAnimations className={`${className}`} {...props}>
        {children}
    </ScrollAnimations>
);

export const FadeInFromLeft = ({ children, className = "", ...props }) => (
    <ScrollAnimations direction="left" className={className} {...props}>
        {children}
    </ScrollAnimations>
);

export const FadeInFromRight = ({ children, className = "", ...props }) => (
    <ScrollAnimations direction="right" className={className} {...props}>
        {children}
    </ScrollAnimations>
);

export const ScaleIn = ({ children, className = "", ...props }) => (
    <ScrollAnimations direction="scale" className={className} {...props}>
        {children}
    </ScrollAnimations>
);

export const StaggeredFadeIn = ({ children, className = "", ...props }) => (
    <ScrollAnimations stagger={true} className={className} {...props}>
        {children}
    </ScrollAnimations>
);

export const FadeInCard = ({ children, className = "", delay = 0, duration = 0.8, ...props }) => (
    <ScrollAnimations 
        direction="up" 
        delay={delay}
        duration={duration}
        distance={40}
        threshold={0.2}
        className={className} 
        {...props}
    >
        {children}
    </ScrollAnimations>
);

export default ScrollAnimations;
