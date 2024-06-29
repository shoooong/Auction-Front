import { Suspense, lazy } from "react";

import MypageCategory from "layout/MypageCategory";

const Loading = <div>Loading...</div>;
const UserModify = lazy(() => import("../pages/user/Modify"));

const mypageRouter = () => {
    return [
        {
            path: "",
            element: <div>마이페이지 메인</div>,
        },
        {
            path: "buyingHistory",
            element: <div>마이페이지 구매내역</div>,
        },
        {
            path: "salesHistory",
            element: <div>마이페이지 판매내역</div>,
        },
        {
            path: "applyHistory",
            element: <div>마이페이지 응모내역</div>,
        },
        {
            path: "bookmark",
            element: (
                <>
                    <div>마이페이지의 관심 - 북마크</div>
                </>
            ),
        },
        {
            path: "modify",
            element: (
                <Suspense fallback={Loading}>
                    <div className="sub-nav"></div>
                    <UserModify />
                </Suspense>
            ),
        },
        {
            path: "delivery",
            element: (
                <>
                    <div>마이페이지 - 배송지관리</div>
                </>
            ),
        },
        {
            path: "coupon",
            element: (
                <>
                    <div>마이페이지 - 쿠폰</div>
                </>
            ),
        },
    ];
};

export default mypageRouter;
