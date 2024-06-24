import { Suspense, lazy } from "react";
import userRouter from "./userRouter";
import { RouterProvider } from "react-router-dom";

const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
    {
        path: "user",
        children: userRouter()
    }
]);

const Root = () => <RouterProvider router={root} />;

export default Root;