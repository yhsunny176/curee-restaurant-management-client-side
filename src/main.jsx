import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import { ScrollProvider } from "./providers/ScrollProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <ScrollProvider>
                    <AuthProvider>
                        <RouterProvider router={router}></RouterProvider>
                    </AuthProvider>
                </ScrollProvider>
            </QueryClientProvider>
        </ThemeProvider>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            toastClassName={() =>
                "relative w-[95%] sm:w-full sm:max-w-md mx-auto bg-white text-black shadow-lg rounded-lg p-4 mt-15"
            }
            bodyClassName={() => "text-sm sm:text-base font-medium"}
        />
    </StrictMode>
);
