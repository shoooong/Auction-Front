import SubClothes from "pages/product/SubClothes";

export default function clothesRouter() {
    return [
        {
            path: "top",
            element: (
                <>
                    <SubClothes />
                </>
            ),
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
