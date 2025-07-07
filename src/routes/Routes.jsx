import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main/MainLayout";
import Home from "../layouts/Home Layout/Home";
import Error from "../components/Error";
import AuthLayout from "../layouts/Authentication/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";

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
                path: "/add-food",
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-foods",
                element: (
                    <PrivateRoute>
                        <MyFoods />
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
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/registration",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "/*",
        element: <Error />,
    },
]);

export default router;
