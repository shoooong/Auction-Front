import AdminProducts from "pages/admin/AdminProducts";
import AdminRequest from "pages/admin/AdminRequest";
import AdminProductDetailed from "pages/admin/AdminProductDetailed";
import AdminRequestDetailed from "pages/admin/AdminRequestDetailed";
import AdminLuckdraws from "pages/admin/AdminLuckydraws";
import AdminNoticeSample from "pages/admin/AdminNoticeSample";

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
    {
      //관리자 럭키드로우 상품 조회
      path: "luckydraw",
      element: <AdminLuckdraws />,
    },
    {
      // 공지사항
      path: "notice",
      element: <AdminNoticeSample />, //정식님이 만드신 관리자 공지사항
    },
  ];
};
export default AdminRouter;
