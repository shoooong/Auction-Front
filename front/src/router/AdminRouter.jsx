import AdminProducts from "pages/admin/AdminProducts";
import AdminRequest from "pages/admin/AdminRequest";
import AdminProductDetailed from "pages/admin/AdminProductDetailed";
import AdminRequestDetailed from "pages/admin/AdminRequestDetailed";
import AdminLuckdraws from "pages/admin/AdminLuckydraws";
import AdminMain from "pages/admin/AdminMain";
import AdminRegister from "pages/admin/AdminRegister";
import AdminNotice from "pages/serviceCenter/notice/AdminNotice";
import AdminNoticeDetail from "pages/serviceCenter/notice/AdminNoticeDetail";
import AdminInquiry from "pages/serviceCenter/inquiry/AdminInquiryPage";
import AdminInquiryDetail from "pages/serviceCenter/inquiry/AdminInquiryDetailTop";
import NoticeRegistration from "pages/serviceCenter/notice/NoticeRegistration";
import AdminLuckyDetail from "pages/serviceCenter/notice/AdminLuckyDrawDetailPage";
import LuckyDrawRegister from "pages/serviceCenter/notice/LuckyDrawRegister";

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
      path: "products/:main",
      element: <AdminProducts />,
    },
    {
      //판매상품관리 (판매입찰 + 구매입찰 조회)
      path: "product/:modelNum",
      element: <AdminProductDetailed />,
    },
    {
      //관리자 럭키드로우 상품 조회
      path: "notice/event/:luckyAnnouncementId",
      element: <AdminLuckyDetail />,
    },
    {
      // 공지사항
      path: "notice",
      element: <AdminNotice />, //정식님이 만드신 관리자 공지사항
    },
    // 일반 공지사항 상세
    {
      path: "notice/notice/:noticeId",
      element: <AdminNoticeDetail />,
    },
        // 공지사항 상세
    {
      path: "notice/notice/:noticeId",
      element: <AdminNoticeDetail />,
    },
       // 일반 공지사항 상세
    {
      path: "notice/notice/:noticeId",
      element: <AdminNoticeDetail />,
    },
    // 이벤트 공지사항 상세
    {
      path: "notice/notice/:noticeId",
      element: <AdminLuckdraws />,
    },
    // 일반 공지사항 등록
    {
      path: "notice/register",
      element: <NoticeRegistration />,
    },
    // 이벤트 공지사항 등록
    {
      path: "notice/eventregister",
      element: <LuckyDrawRegister />,
    },
    {
      // 1:1문의
      path: "inquiry",
      element: <AdminInquiry />,
    },
    // 1:1문의 상세
    {
      path: "inquiry/:inquiryId",
      element: <AdminInquiryDetail />,
    },
  ];
};
export default AdminRouter;
