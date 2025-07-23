import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const themes = ["light", "dark"];

    const handleThemeChange = () => {
        const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(newTheme);
    };
    return (
        <button
            className="cursor-pointer bg-red-base hover:bg-red-dark w-fit rounded-full flex justify-center items-center m-2 p-2  transition-colors duration-500 ease-in-out"
            onClick={handleThemeChange}>
            {theme === "dark" && (
                <h1>
                    <Moon className="text-white-base"></Moon>
                </h1>
            )}
            {theme === "light" && (
                <h1>
                    <Sun className="text-white-base"></Sun>
                </h1>
            )}
        </button>
    );
};

export default ThemeToggle;
