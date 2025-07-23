import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
