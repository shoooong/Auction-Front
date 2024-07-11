import MainCategory from "layout/MainCategory";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";
import MypageCategory from "layout/MypageCategory";
import ServiceCategory from "layout/ServiceCategory";

import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";
import serviceRouter from "./serviceRouter";
import luckyDrawRouter from "./luckyDrawRouter";

import Sample from "pages/Sample";
import Shop from "pages/shop/Shop";
import LuckyDraw from "pages/draw/LuckyDraw";
import Style from "pages/style/Style";
import Event from "pages/event/Event";

const mainRouter = () => {
    return [
        {
            path: "sample",
            element: <Sample />,
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
                    path: "/luckydraw",
                    element: <LuckyDraw />,
                },
                {
                    path: ":luckyId",
                    children: luckyDrawRouter(),
                },
                {
                    path: "/event",
                    element: <Event />,
                },
            ],
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
            element: <Style />,
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
        {
            path: "clothes",
            element: <clothesMain />,
        },
    ];
};

export default mainRouter;
