import MypageMain from "pages/user/mypage/MypageMain";
import BuyHistory from "pages/user/mypage/BuyHistory";
import SaleHistory from "pages/user/mypage/SaleHistory";
import MypageBookmark from "components/mypage/MypageBookmark";
import DrawHistory from "pages/user/mypage/DrawHistory";
import Account from "pages/user/mypage/Account";
import Address from "pages/user/mypage/Address";
import Coupon from "pages/user/mypage/coupon";

import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const UserModify = lazy(() => import("pages/user/mypage/Modify"));

const mypageRouter = () => {
    return [
        {
            path: "",
            element: <MypageMain />,
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
            element: <MypageBookmark />,
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
            element: <Address />,
        },
        {
            path: "account",
            element: <Account />,
        },
        {
            path: "coupon",
            element: <Coupon />,
        },
    ];
};

export default mypageRouter;
