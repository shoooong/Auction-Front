import ProductDetail from "pages/product/ProductDetail";
import bidRouter from "./bidRouter";

export default function detailRouter() {
    return [
        {
            path: ":modelNum", // 상세 페이지 경로 추가
            element: (
                <>
                    <ProductDetail />
                </>
            ),
        },
        {
            path: ":modelNum/bid",
            children: bidRouter()
        }
    ];
}
