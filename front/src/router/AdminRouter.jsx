import AdminProducts from "pages/admin/AdminProducts";
import AdminRequest from "pages/admin/AdminRequest";
import AdminProductDetailed from "pages/admin/AdminProductDetailed";
import AdminRequestDetailed from "pages/admin/AdminRequestDetailed";

const AdminRouter = () => {
  return [
    {
      //요청 상품
      path: "request",
      element: <AdminRequest />,
      children: [
        {
          //요청상품 상세
          path: ":productId",
          element: <AdminRequestDetailed />,
        },
      ],
    },
    {
      //판매상품관리 (대분류 + 소분류 조회)
      path: "products/:mainDepartment",
      element: <AdminProducts />,
    },
    {
      //판매상품관리 (판매입찰 + 구매입찰 조회)
      path: "product/:modelNum",
      element: <AdminProductDetailed />,
    },
  ];
};
export default AdminRouter;
