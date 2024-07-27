import ProductBid from "pages/product/ProductBid";

export default function bidRouter() {
    return [
        {
            path: "bid", // 이미 /bid까지 왔으므로, 하위 경로는 빈 문자열로 설정
            element: (
                <>
                    <ProductBid />
                </>
            ),
        },
    ];
}
