export default function clothesRouter() {
    return [
        {
            path: "top",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>상의</div>
                    </div>
                </>
            ),
        },
        {
            path: "bottom",
            element: <div>하의</div>,
        },
        {
            path: "outer",
            element: <div>아우터</div>,
        },
        {
            path: "shoes",
            element: <div>신발</div>,
        },
        {
            path: "inner",
            element: <div>이너웨어</div>,
        },
    ];
}
