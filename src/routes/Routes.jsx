import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main/MainLayout";
import Home from "../layouts/Home Layout/Home";
import Error from "../components/Error";
import AuthLayout from "../layouts/Authentication/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import AllFoods from "../pages/AllFoods";
import Gallery from "../pages/Gallery";
import SingleFood from "@/pages/SingleFood";
import PurchaseFood from "@/pages/PurchaseFood";
import MyOrders from "@/pages/MyOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "all-foods",
                element: <AllFoods />,
            },
            {
                path: "gallery",
                element: <Gallery />,
            },
            {
                path: "add-food",
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-foods/:email",
                element: (
                    <PrivateRoute>
                        <MyFoods />
                    </PrivateRoute>
                ),
            },
            {
                path: "/food-detail/:id",
                element: <SingleFood />,
            },
            {
                path: "/purchase-food/:id",
                element: (
                    <PrivateRoute>
                        <PurchaseFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-orders/:email",
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "registration",
                element: <Register></Register>,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>,
            },
        ],
    },
    {
        path: "/*",
        element: <Error />,
    },
]);

export default router;
