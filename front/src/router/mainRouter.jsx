import MainCategory from "layout/MainCategory";
import Style from "pages/style/Style";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";
import MypageCategory from "layout/MypageCategory";
import ServiceCategory from "layout/ServiceCategory";
import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";
import serviceRouter from "./serviceRouter";
import Sample from "pages/Sample";
import Shop from "pages/shop/Shop";
import LuckyDraw from "pages/draw/LuckyDraw";
import luckyDrawRouter from "./luckyDrawRouter";
import StyleRegistration from "pages/style/StyleRegistration";
import FeedBookmark from "pages/style/FeedBookmark";
import StyleRanking from "pages/Rank/StyleRanking";
import FeedDetailTop from "pages/style/FeedDetailTop";
import Event from "pages/event/Event";
import TechMain from "pages/tech/TechMain";
import clothesRouter from "./clothesRouter";

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
                    element: <TechMain />,
                },
                {
                    path: "/rank",
                    element: <div>랭킹</div>,
                },
                {
                    path: "/styleranking",
                    element: <StyleRanking />,
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
            children: [],
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
            path: "clothes",
            children: clothesRouter()
        }
    ];
};

export default mainRouter;
