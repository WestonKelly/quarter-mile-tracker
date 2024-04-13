import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Cars from "./pages/Cars";
import { userConfirmation } from "./utilities";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader: userConfirmation,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/signup/",
                element: <SignUp />
            },
            {
                path: "/login/",
                element: <LogIn />
            },
            {
                path: "/cars/",
                element: <Cars />
            }
        ]
    }
]);

export default router;