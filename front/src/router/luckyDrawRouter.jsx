import LuckyDrawDetail from "pages/draw/LuckyDrawDetail";

export default function luckyDrawRouter() {
    return [
        {
            path: ":luckyId",
            element: <LuckyDrawDetail />,
        },
    ];
}
