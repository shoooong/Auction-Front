import { Suspense, lazy } from "react";

const Notice = lazy(() => import("pages/serviceCenter/notice/Notice"));
const NoticeDetail = lazy(() =>
    import("pages/serviceCenter/notice/NoticeDetail")
);
const Inquiry = lazy(() => import("pages/serviceCenter/inquiry/InquiryPage"));
const InquiryRegistration = lazy(() =>
    import("pages/serviceCenter/inquiry/InquiryRegistration")
);
const InquiryDetail = lazy(() =>
    import("pages/serviceCenter/inquiry/InquiryDetailTop")
);
const NoticeRegister = lazy(() =>
    import("pages/serviceCenter/notice/NoticeRegistration")
);
const RequestProductList = lazy(() =>
    import("pages/requestproduct/RequestProductList")
);
const RequestProductDetail = lazy(() =>
    import("pages/requestproduct/productRequestDetail")
);
const RequestProductRegister = lazy(() =>
    import("pages/requestproduct/RequestProduct")
);
const LuckyDrawDetailPage = lazy(() =>
    import("pages/serviceCenter/notice/LuckyDrawDetailPage")
);
const Loading = <div>Loading...</div>;

export default function clothesRouter() {
    return [
        {
            path: "notice",
            element: (
                <Suspense fallback={Loading}>
                    <Notice />
                </Suspense>
            ),
        },
        {
            path: "adminnotice/create",
            element: (
                <Suspense fallback={Loading}>
                    <NoticeRegister />
                </Suspense>
            ),
        },
        {
            path: "inquiry",
            element: (
                <Suspense fallback={Loading}>
                    <Inquiry />
                </Suspense>
            ),
        },
        {
            path: "request",
            element: (
                <Suspense fallback={Loading}>
                <RequestProductList />
                </Suspense>

            ),
        },
        {
            path: "request/:productId",
            element: (
                <Suspense fallback={Loading}>
                <RequestProductDetail />
                </Suspense>

            ),
        },
        {
            path: "request/register",
            element: (
                <Suspense fallback={Loading}>
                <RequestProductRegister />
                </Suspense>

            ),
        },
        {
            path: "inquiryRegistration",
            element: (
                <Suspense fallback={Loading}>
                    <InquiryRegistration />
                </Suspense>
            ),
        },
        {
            path: "notice/notice/:noticeId",
            element: (
                <Suspense fallback={Loading}>
                    <NoticeDetail />
                </Suspense>
            ),
        },
        {
            path: "notice/event/:luckyAnnouncementId",
            element: (
                <Suspense fallback={Loading}>
                    <LuckyDrawDetailPage />
                </Suspense>
            ),
        },
        {
            path: "inquiry/:inquiryId",
            element: (
                <Suspense fallback={Loading}>
                    <InquiryDetail />
                </Suspense>
            ),
        },
    ];
}
