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
import techRouter from "./techRouter"; // 추가

import Style from "pages/style/Style";
import Shop from "pages/shop/Shop";
import Search from "pages/shop/Search";
import LuckyDraw from "pages/draw/LuckyDraw";
import StyleRegistration from "pages/style/StyleRegistration";
import FeedBookmark from "pages/style/FeedBookmark";
import StyleRanking from "pages/Rank/StyleRanking";
import FeedDetailTop from "pages/style/FeedDetailTop";
import Event from "pages/event/Event";
import Buy from "pages/ordres/Buy";
import Sell from "pages/ordres/Sell";

import Sample from "pages/Sample";
import SuccessPage from "pages/payment/Success";
import ProductRanking from "pages/product/ProductRanking";

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
                    children: techRouter(), // 추가
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
                    path: "event",
                    element: <Event />,
                },
            ],
        },
        {
            path: "search",
            element: <Search />,
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
            path: "style/rank",
            element: <StyleRanking />,
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
        {
            path: "rank",
            element: <ProductRanking />,
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
        {
            path: "success",
            element: <SuccessPage />,
        },
    ];
};

export default mainRouter;
