import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FadeInText, FadeInCard } from "../components/ScrollAnimations";

// Import all gallery images
import cardImage1 from "../assets/Card Images/card-image-1.webp";
import cardImage2 from "../assets/Card Images/card-image-2.webp";
import cardImage3 from "../assets/Card Images/card-image-3.webp";
import cardImage4 from "../assets/Card Images/card-image-4.webp";
import cardImage5 from "../assets/Card Images/card-image-5.webp";
import cardImage6 from "../assets/Card Images/card-image-6.webp";
import cardImage7 from "../assets/Card Images/card-image-7.webp";
import cardImage8 from "../assets/Card Images/card-image-8.webp";
import cardImage9 from "../assets/Card Images/card-image-9.webp";
import bannerImage1 from "../assets/Banner Images/banner-1.webp";
import bannerImage2 from "../assets/Banner Images/banner-2.webp";
import bannerImage3 from "../assets/Banner Images/banner-3.webp";

const Gallery = () => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Gallery images - using imported images
    const galleryImages = [
        {
            src: cardImage1,
            alt: "Delicious Food Item 1",
            title: "Mediterranean Salad Bowl",
        },
        {
            src: cardImage2,
            alt: "Delicious Food Item 2",
            title: "Fresh Pasta with Herbs",
        },
        {
            src: cardImage3,
            alt: "Delicious Food Item 3",
            title: "Grilled Chicken Platter",
        },
        {
            src: cardImage4,
            alt: "Delicious Food Item 4",
            title: "Seafood Delight",
        },
        {
            src: cardImage5,
            alt: "Delicious Food Item 5",
            title: "Vegetarian Pizza",
        },
        {
            src: cardImage6,
            alt: "Delicious Food Item 6",
            title: "Breakfast Special",
        },
        {
            src: cardImage7,
            alt: "Delicious Food Item 7",
            title: "Asian Cuisine",
        },
        {
            src: cardImage8,
            alt: "Delicious Food Item 8",
            title: "BBQ Platter",
        },
        {
            src: cardImage9,
            alt: "Delicious Food Item 9",
            title: "Dessert Paradise",
        },
        {
            src: bannerImage1,
            alt: "Beautiful Food Banner 1",
            title: "Food Festival Banner",
        },
        {
            src: bannerImage2,
            alt: "Beautiful Food Banner 2",
            title: "Culinary Experience",
        },
        {
            src: bannerImage3,
            alt: "Beautiful Food Banner 3",
            title: "Fine Dining Experience",
        },
    ];

    const openLightbox = (imageIndex) => {
        setIndex(imageIndex);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-background-primary py-12 relative">
            {/* Background Title Effect (z-10) */}
            <div className="absolute top-56 sm:top-52 md:top-44 lg:top-40 xl:top-36 left-0 right-0 flex justify-center pointer-events-none z-10">
                <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[8rem] xl:text-[12rem] font-bold text-bg-text select-none whitespace-nowrap">
                    Food Gallery
                </h1>
            </div>
            <div className="max-w-7xl mx-auto relative z-20">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <FadeInText>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading-color mb-4">
                            Food Gallery
                        </h1>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="text-lg md:text-xl text-gray-text-base max-w-3xl mx-auto">
                            Explore our stunning collection of delicious dishes and culinary masterpieces. Click on any
                            image to view it in full size with our interactive lightbox.
                        </p>
                    </FadeInText>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryImages.map((image, imageIndex) => {
                        // Sequential delay for smooth one-by-one appearance
                        const sequentialDelay = imageIndex * 0.05; // 0.05s delay between each image

                        return (
                            <FadeInCard key={imageIndex} delay={sequentialDelay} duration={0.6} threshold={0.1}>
                                <div
                                    className="group relative overflow-hidden rounded-lg border border-card-stroke hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                                    onClick={() => openLightbox(imageIndex)}>
                                    {/* Image */}
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black-primary opacity-60 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white-text-primary">
                                            <div className="text-2xl mb-2">
                                                <svg
                                                    className="w-8 h-8 mx-auto"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm7.707 3.293a1 1 0 00-1.414-1.414L11 12.172l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-medium">{image.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInCard>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className="mt-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 shadow-md">
                            <h3 className="text-3xl font-bold text-card-sec-subtext mb-2">{galleryImages.length}+</h3>
                            <p className="text-card-main-text">Gallery Images</p>
                        </div>
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 shadow-md">
                            <h3 className="text-3xl font-bold text-card-sec-subtext mb-2">100+</h3>
                            <p className="text-card-main-text">Delicious Recipes</p>
                        </div>
                        <div className="bg-card-background border border-card-stroke rounded-lg p-6 shadow-md">
                            <h3 className="text-3xl font-bold text-card-sec-subtext mb-2">50+</h3>
                            <p className="text-card-main-text">Food Categories</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={galleryImages.map((image) => ({
                    src: image.src,
                    alt: image.alt,
                    title: image.title,
                }))}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                }}
                render={{
                    buttonPrev: galleryImages.length <= 1 ? () => null : undefined,
                    buttonNext: galleryImages.length <= 1 ? () => null : undefined,
                }}
            />
        </div>
    );
};

export default Gallery;
