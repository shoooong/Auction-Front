import MainCategory from "layout/MainCategory";
import StyleCategory from "layout/StyleCategory";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";
import MypageCategory from "layout/MypageCategory";
import ServiceCategory from "layout/ServiceCategory";

import clothesRouter from "./clothesRouter";
import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";
import serviceRouter from "./serviceRouter";

import Sample from "pages/Sample";
import AdminSample from "pages/admin/AdminExample";
import Shop from "pages/shop/Shop";

const mainRouter = () => {
    return [
        {
            path: "sample",
            element: <Sample />,
        },
        {
            path: "admin",
            element: <AdminSample />,
        },
        {
            path: "/",
            element: <MainCategory />,
            children: [
                {
                    path: "/",
                    element: <ClothesCategory />,
                },
                {
                    path: "life",
                    element: <LifeCategory />,
                },
                {
                    path: "/tech",
                    element: <div>테크</div>,
                },
                {
                    path: "/rank",
                    element: <div>랭킹</div>,
                },
                {
                    path: "/draw",
                    element: <div>럭키드로우</div>,
                },
                {
                    path: "/event",
                    element: <div>쿠폰 이벤트~!</div>,
                },
            ],
        },
        {
            path: "clothes",
            children: clothesRouter(),
        },
        {
            path: "life",
            children: lifeRouter(),
        },
        {
            path: "shop",
            element: <Shop />,
        },
        {
            path: "style",
            element: <StyleCategory />,
            children: [
                {
                    path: "",
                    element: <div>피드</div>,
                },
                {
                    path: "rank",
                    element: <div>랭킹</div>,
                },
            ],
        },
        {
            path: "service",
            element: <ServiceCategory />,
            children: serviceRouter(),
        },
        {
            path: "mypage",
            element: <MypageCategory />,
            children: mypageRouter(),
        },
        {
            path: "user",
            children: userRouter(),
        },
    ];
};

export default mainRouter;
