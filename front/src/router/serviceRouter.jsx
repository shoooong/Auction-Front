import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../pages/serviceCenter/notice/Notice"));
const NoticeDetail = lazy(() => import("../pages/serviceCenter/notice/NoticeDetail"));
const Inquiry = lazy(() => import("../pages/serviceCenter/inquiry/InquiryPage"));
const InquiryRegistration = lazy(() => import("../pages/serviceCenter/inquiry/InquiryRegistration"));
const AdminInquiryDetail = lazy(() => import("../pages/serviceCenter/inquiry/AdminInquiryDetailTop"));
const NoticeRegister = lazy(() => import("../pages/serviceCenter/notice/NoticeRegistration"));

export default function clothesRouter() {
    return [
        {
            path: "notice",
            element: (
                <Suspense fallback={Loading}>
                <Notice />
                </Suspense>
            )
        },
        {
            path: "adminnotice/create",
            element: (
                <Suspense fallback={Loading}>
                <NoticeRegister />
                </Suspense>
            )
        },
        {
            path: "inquiry",
            element: (
                <Suspense fallback={Loading}>
                    <Inquiry />
                </Suspense>
            )
        },
        {
            path: "request",
            element: <div>미등록 상품 등록요청</div>,
        },
        {
            path: "inquiryRegistration",
            element: <Suspense fallback={Loading}>
                <InquiryRegistration />
            </Suspense>
        },
        {
            path: "notice/:noticeId",
            element: <Suspense fallback={Loading}>
                <NoticeDetail />
            </Suspense>
        },
        {
            path: "admininquiry/:inquiryId",
            element: (
              <Suspense fallback={Loading}>
                <AdminInquiryDetail />
              </Suspense>
            ),
          },
    ];
}
