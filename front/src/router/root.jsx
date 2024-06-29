import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "layout/Header";
import Footer from "layout/Footer";

import userRouter from "./userRouter";
import mainRouter from "./mainRouter";

const root = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Footer />
            </>
        ),
        children: mainRouter(),
    },
]);

const Root = () => <RouterProvider router={root} />;

export default Root;
