import MypageMain from "pages/user/mypage/MypageMain";
import BuyHistory from "pages/user/mypage/BuyHistory";
import SaleHistory from "pages/user/mypage/SaleHistory";
import MypageBookmark from "components/mypage/MypageBookmark";

import { Suspense, lazy } from "react";
import DrawHistory from "pages/user/mypage/DrawHistory";

const Loading = <div>Loading...</div>;
const UserModify = lazy(() => import("pages/user/mypage/Modify"));

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
            element: <DrawHistory />,
        },
        {
            path: "bookmark",
            element: <MypageBookmark />
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
            path: "account",
            element: (
                <>
                    <div>마이페이지 - 계좌관리</div>
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
