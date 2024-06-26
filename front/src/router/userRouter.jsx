import { Suspense, lazy } from "react";
import Logout from "pages/user/Logout";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("pages/user/Login"));
const KakaoRedirect = lazy(() => import("pages/user/KakaoRedirect"));

const userRouter = () => {
    return [
        {
            path: "login",
            element: (
                <Suspense fallback={Loading}>
                    <Login />
                </Suspense>
            ),
        },
        {
            path: "logout",
            element: (
                <Suspense fallback={Loading}>
                    <Logout />
                </Suspense>
            ),
        },
        {
            path: "kakao",
            element: (
                <Suspense fallback={Loading}>
                    <KakaoRedirect />
                </Suspense>
            ),
        },
    ];
};

export default userRouter;
