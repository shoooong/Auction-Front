import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../pages/serviceCenter/notice/Notice"));
const NoitceDetail = lazy(() => import("../pages/serviceCenter/notice/NoticeDetail"));
const Inquiry = lazy(() => import("../pages/serviceCenter/inquiry/Inquiry"));
const InquiryRegistration = lazy(() => import("../pages/serviceCenter/inquiry/InquiryRegistration"))

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
            path: "noticedetail",
            element: <Suspense fallback={Loading}>
                <NoitceDetail />
            </Suspense>
        },
    ];
}
