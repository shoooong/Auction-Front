import AdminMain from "pages/admin/AdminMain";
import AdminProducts from "pages/admin/AdminProducts";
import AdminRequest from "pages/admin/AdminRequest";

const AdminRouter = () => {
  return [
    {
      path: "request",
      element: <AdminRequest />,
    },
    {
      path: "products",
      element: <AdminProducts />,
    },
  ];
};
export default AdminRouter;
