import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "layout/Header";
import Footer from "layout/Footer";

import userRouter from "./userRouter";
import mainRouter from "./mainRouter";
import AdminRouter from "./AdminRouter";
import AdminLayout from "pages/admin/layout/AdminLayout";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: AdminRouter(),
  },
]);

const Root = () => <RouterProvider router={root} />;

export default Root;
