import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "layout/Header";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";
import mainRouter from "./mainRouter";

const root = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: mainRouter(),
    },
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
