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
                        <Navbar />
                        <main className="bg-background-primary">
                            <Outlet />
                        </main>
                    </div>
                    <footer className="bg-background-primary border-t border-card-stroke">
                        <Footer />
                    </footer>
                </>
            ) : (
                <>
                    <Navbar />
                    <main className="bg-background-primary">
                        <Outlet />
                    </main>
                    <footer className="bg-background-primary border-t border-card-stroke">
                        <Footer />
                    </footer>
                </>
            )}
        </div>
    );
};

export default MainLayout;
