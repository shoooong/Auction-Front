import SubLife from "pages/product/SubLife";
import ProductDetail from "../pages/product/ProductDetail";

export default function lifeRouter() {
    return [
        {
            path: "interior",
            element: (
                <>
                    <SubLife />
                </>
            ),
        },
        {
            path: "kitchen",
            element: (
                <>
                    <SubLife />
                </>
            ),
        },
        {
            path: "beauty",
            element: (
                <>
                    <SubLife />
                </>
            ),
        },
        {
            path: "details/:modelNum", // 상세 페이지 경로 추가
            element: (
                <>
                    <ProductDetail />
                </>
            ),
        },
    ];
}
