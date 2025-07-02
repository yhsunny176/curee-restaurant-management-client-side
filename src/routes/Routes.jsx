import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main/MainLayout";
import Home from "../layouts/Home Layout/Home";
import Error from "../components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

export default router;