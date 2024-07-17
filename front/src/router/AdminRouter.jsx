import AdminProducts from "pages/admin/AdminProducts";
import AdminRequest from "pages/admin/AdminRequest";
import AdminProductDetailed from "pages/admin/AdminProductDetailed";
import AdminRequestDetailed from "pages/admin/AdminRequestDetailed";
import AdminLuckdraws from "pages/admin/AdminLuckydraws";
import AdminMain from "pages/admin/AdminMain";
import AdminRegister from "pages/admin/AdminRegister";
import AdminNotice from "pages/serviceCenter/notice/AdminNotice";
import AdminInquiry from "pages/serviceCenter/inquiry/AdminInquiryPage";
import AdminNoticeDetail from "pages/serviceCenter/notice/AdminNoticeDetail";
import AdminInquiryDetail from "pages/serviceCenter/inquiry/AdminInquiryDetail";

const AdminRouter = () => {
  return [
    {
      path: "login",
      element: <AdminMain />,
    },
    {
      path: "register",
      element: <AdminRegister />,
    },

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
      element: <AdminNotice />, //정식님이 만드신 관리자 공지사항
    },
    // 공지사항 상세
    {
      path: "notice/:noticeId",
      element: <AdminNoticeDetail />,
    },
    {
      path: "notice"
    },
    {
      // 1:1문의
      path: "inquiry",
      element: <AdminInquiry />,
    },
  ];
};
export default AdminRouter;
