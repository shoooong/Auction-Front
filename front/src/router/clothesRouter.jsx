import SubClothes from "pages/product/SubClothes";
import ProductDetail from "pages/product/ProductDetail";
import ProductBid from "pages/product/ProductBid";

export default function clothesRouter() {
    return [
        {
            path: "top",
            element: (
                <>
                    <SubClothes />
                </>
            )
        },
        {
            path: "bottom",
            element: (
                <>
                    <SubClothes />
                </>
            ),
        },
        {
            path: "outer",
            element: (
                <>
                    <SubClothes />
                </>
            ),
        },
        {
            path: "shoes",
            element: (
                <>
                    <SubClothes />
                </>
            ),
        },
        {
            path: "inner",
            element: (
                <>
                    <SubClothes />
                </>
            ),
        },
        {
            path: "details/:modelNum",
            element: <ProductDetail />
        },
        {
            path: "details/:modelNum/bid",
            element: <ProductBid />
        },
    ];
}
