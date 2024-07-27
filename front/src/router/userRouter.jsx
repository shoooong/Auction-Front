import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("pages/user/Login"));
const KakaoRedirect = lazy(() => import("pages/user/KakaoRedirect"));
const Register = lazy(() => import("pages/user/Register"));
const FindEmail = lazy(() => import("pages/user/FindEmail"));

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
            path: "kakao",
            element: (
                <Suspense fallback={Loading}>
                    <KakaoRedirect />
                </Suspense>
            ),
        },
        {
            path: "findEmail",
            element: (
                <Suspense fallback={Loading}>
                    <FindEmail />
                </Suspense>
            ),
        },
        {
            path: "register",
            element: (
                <Suspense fallback={Loading}>
                    <Register />
                </Suspense>
            ),
        },
    ];
};

export default userRouter;
