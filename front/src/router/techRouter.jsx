import TechMain from "pages/tech/TechMain";
import ProductDetail from "pages/product/ProductDetail";
import bidRouter from "./bidRouter"; // 입찰 관련 라우터

export default function techRouter() {
    return [
        {
            path: "",
            element: <TechMain />, // 메인 페이지
        },
        {
            path: "details/:modelNum", // 상세 페이지 경로
            element: <ProductDetail />,
            children: [
                {
                    path: "bid",
                    children: bidRouter(), // 입찰 관련 라우터
                },
            ],
        },
    ];
}
