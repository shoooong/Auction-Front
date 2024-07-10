import MypageMain from "pages/user/mypage/MypageMain";
import BuyHistory from "pages/user/mypage/BuyHistory";
import SaleHistory from "pages/user/mypage/SaleHistory";

import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const UserModify = lazy(() => import("../pages/user/Modify"));

const mypageRouter = () => {
    return [
        {
            path: "",
            element: <MypageMain />
        },
        {
            path: "buyingHistory",
            element: <BuyHistory />,
        },
        {
            path: "salesHistory",
            element: <SaleHistory />,
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
