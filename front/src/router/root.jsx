import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";


import { RouterProvider } from "react-router-dom";

const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
    {
        path: "user",
        children: userRouter()
    },
    {
        path: "mypage",
        children: mypageRouter()
    }
]);

const Root = () => <RouterProvider router={root} />;

export default Root;