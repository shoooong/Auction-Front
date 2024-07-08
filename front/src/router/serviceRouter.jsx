export default function clothesRouter() {
    return [
        {
            path: "info",
            element: <div>공지사항</div>,
        },
        {
            path: "personalQuestion",
            element: <div>1:1 문의</div>,
        },
        {
            path: "request",
            element: <div>미등록 상품 등록요청</div>,
        },
    ];
}
