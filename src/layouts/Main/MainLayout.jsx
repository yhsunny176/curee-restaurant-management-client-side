import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div>
            {isHomePage ? (
                <>
                    <div className="relative">
                        <div className="absolute top-0 left-0 right-0 z-50">
                            <Navbar />
                        </div>
                        <main className="bg-background-primary">
                            <Outlet />
                        </main>
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    <div className="sticky top-0 z-50 bg-background-primary border-b border-gray-border-primary shadow-sm">
                        <Navbar />
                    </div>
                    <main className="bg-background-primary">
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default MainLayout;
