import MainCategory from "layout/MainCategory";
import StyleCategory from "layout/StyleCategory";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";

import clothesRouter from "./clothesRouter";
import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";

const mainRouter = () => {
    return [
        {
            path: "/",
            element: <MainCategory />,
            children: [
                {
                    path: "/",
                    element: <ClothesCategory />,
                    children: clothesRouter(),
                },
                {
                    path: "life",
                    element: <LifeCategory />,
                    children: lifeRouter(),
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
            path: "shop",
            element: (
                <>
                    <div className="sub-nav"></div>
                    <div>SHOP 페이지</div>
                </>
            ),
        },
        {
            path: "style",
            element: <StyleCategory />,
            children: [
                {
                    path: "feed",
                    element: <div>피드</div>,
                },
                {
                    path: "rank",
                    element: <div>랭킹</div>,
                },
            ],
        },
        {
            path: "serviceCenter",
            element: <div>고객센터</div>,
            children: userRouter(),
        },
    ];
};

export default mainRouter;
