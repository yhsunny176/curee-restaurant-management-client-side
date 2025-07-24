import React from "react";
import Marquee from "react-fast-marquee";
import reviews from "./Reviews";
import { Star } from "lucide-react";
import { AiFillStar } from "react-icons/ai";

const ReviewSection = () => {
    return (
        <div className="w-full py-12">
            <h2 className="text-4xl font-bold text-center text-red-base mb-2">Customer Reviews</h2>
            <p className="text-center text-lg text-gray-text-base 0 mb-6">
                Hear what our happy customers have to say about their experience!
            </p>
            <div className="w-full max-w-11/12 lg:max-w-10/12 xl:max-w-8/12 mx-auto">
                <Marquee pauseOnHover gradient={false} speed={40}>
                    <div className="py-6 flex">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="mx-4 min-w-[280px] max-w-xs h-72 bg-card-background border border-card-stroke rounded-lg shadow-card-shadow p-4 flex flex-col items-center justify-between overflow-auto">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                />
                                <h3 className="font-semibold text-xl text-black-text-dark">{review.name}</h3>
                                <div className="flex mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={
                                                i < review.rating ? "text-yellow-400" : "text-white-text-primary"
                                            }>
                                            <AiFillStar />
                                        </span>
                                    ))}
                                </div>
                                <p className="text-card-main-text text-center text-md">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default ReviewSection;
