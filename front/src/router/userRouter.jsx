import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/user/Login"));
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirect"));
const UserModify = lazy(() => import("../pages/user/Modify"));
const Register = lazy(() => import("../pages/user/Register"));

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
            path: "mypage/modify",
            element: (
                <Suspense fallback={Loading}>
                    <UserModify />
                </Suspense>
            ),
        },{
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
