import MainCategory from "layout/MainCategory";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";
import MypageCategory from "layout/MypageCategory";
import ServiceCategory from "layout/ServiceCategory";

import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";
import serviceRouter from "./serviceRouter";
import clothesRouter from "./clothesRouter";
import luckyDrawRouter from "./luckyDrawRouter";


import Style from "pages/style/Style";
import Shop from "pages/shop/Shop";
import LuckyDraw from "pages/draw/LuckyDraw";
import StyleRegistration from "pages/style/StyleRegistration";
import FeedBookmark from "pages/style/FeedBookmark";
import StyleRanking from "pages/Rank/StyleRanking";
import FeedDetailTop from "pages/style/FeedDetailTop";
import Event from "pages/event/Event";
import Buy from "pages/ordres/Buy";
import Sell from "pages/ordres/Sell";

import TechMain from "pages/tech/TechMain";

import Sample from "pages/Sample";

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
                    path: "tech",
                    element: <TechMain />,
                },
                {
                    path: "rank",
                    element: <StyleRanking />,
                },
                {
                    path: "luckydraw",
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
        // 정식이 라우터
        {
            path: "style",
            element: <Style />,
        },
        {
            path: "style/register",
            element: <StyleRegistration />,
        },
        {
            path: "style/styledetail/:id",
            element: <FeedDetailTop />,
        },
        {
            path: "feedbookmark",
            element: <FeedBookmark />,
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

        // 종욱이거?
        {
            path: "buy",
            element: <Buy />,
        },
        {
            path: "sell",
            element: <Sell />,
        },
    ];
};

export default mainRouter;
