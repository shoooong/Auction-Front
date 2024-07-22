import SubClothes from "pages/product/SubClothes";

import detailRouter from "router/detailRouter";

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
            path: ":modelNum",
            children: detailRouter(),
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
        
    ];
}
