import React from "react";
import Banner from "../../components/Banner";
import TopFoodItems from "../../components/TopFoodItems";


const Home = () => {
    return (
        <div>
            <div className="w-full h-[700px] lg:h-[900px]">
                <Banner></Banner>
            </div>
            
            <div>
                <TopFoodItems></TopFoodItems>
            </div>

        </div>
    );
};

export default Home;
