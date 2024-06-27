import { Suspense, lazy } from "react";
import LogoutPage from "../pages/user/LogoutPage";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/user/LoginPage"));
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage"));
const UserModify = lazy(() => import("../pages/user/ModifyPage"));

const userRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><LogoutPage /></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect /></Suspense>
        },
        {
            path: "mypage/modify",
            element: <Suspense fallback={Loading}><UserModify /></Suspense>
        }
    ];
};

export default userRouter;