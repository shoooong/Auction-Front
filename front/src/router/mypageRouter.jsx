import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const UserModify = lazy(() => import("../pages/user/ModifyPage"));

const mypageRouter = () => {
    return [
        {
            path: "modify",
            element: <Suspense fallback={Loading}><UserModify /></Suspense>
        }
    ];
};

export default mypageRouter;