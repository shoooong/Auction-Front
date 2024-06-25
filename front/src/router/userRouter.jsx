import { Suspense, lazy } from "react";
import LogoutPage from "../pages/user/LogoutPage";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/user/LoginPage"));
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage"));

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
        }
    ];
};

export default userRouter;