import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../pages/serviceCenter/notice/Notice"));
const NoitceDetail = lazy(() => import("../pages/serviceCenter/notice/Notice"));
const Inquiry = lazy(() => import("../pages/serviceCenter/inquiry/InquiryPage"));
const InquiryRegistration = lazy(() => import("../pages/serviceCenter/inquiry/InquiryRegistration"));
const InquiryDetail = lazy(() => import("../pages/serviceCenter/inquiry/InquiryDetailTop"));
const AdminInquiry = lazy(() => import("../pages/serviceCenter/inquiry/AdminInquiryPage"));
const AdminInquiryDetail = lazy(() => import("../pages/serviceCenter/inquiry/AdminInquiryDetailTop"));

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
            path: "inquiry",
            element: (
                <Suspense fallback={Loading}>
                    <Inquiry />
                </Suspense>
            )
        },
        {
            path: "admininquiry",
            element: (
                <Suspense fallback={Loading}>
                    <AdminInquiry />
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
            path: "inquiry/:inquiryId",
            element: <InquiryDetail />,
        },
        {
            path: "noticedetail",
            element: <Suspense fallback={Loading}>
                <NoitceDetail />
            </Suspense>
        },
        {
            path: "noticedetail/:noticeId",
            element: <NoitceDetail />,
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
