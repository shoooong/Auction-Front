import MainCategory from "layout/MainCategory";
import StyleCategory from "layout/StyleCategory";
import ClothesCategory from "layout/ClothesCategory";
import LifeCategory from "layout/LifeCategory";
import MypageCategory from "layout/MypageCategory";

import clothesRouter from "./clothesRouter";
import lifeRouter from "./lifeRouter";
import userRouter from "./userRouter";
import mypageRouter from "./mypageRouter";

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
                    element: (
                        <>
                            <ClothesCategory />
                        </>
                    ),
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
            path: "clothes",
            children: clothesRouter(),
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
            path: "service",
            element: <div>고객센터</div>,
            children: userRouter(),
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
