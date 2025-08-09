import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollContainer from "../../components/ScrollContainer";

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div>
            <Navbar />
            <ScrollContainer>
                {isHomePage ? (
                    <>
                        <main className="bg-background-primary">
                            <Outlet />
                        </main>
                        <footer className="bg-background-primary border-t border-card-stroke">
                            <Footer />
                        </footer>
                    </>
                ) : (
                    <>
                        <main className="bg-background-primary">
                            <Outlet />
                        </main>
                        <footer className="bg-background-primary border-t border-card-stroke">
                            <Footer />
                        </footer>
                    </>
                )}
            </ScrollContainer>
        </div>
    );
};

export default MainLayout;
