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
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>하의</div>
                    </div>
                </>
            ),
        },
        {
            path: "outer",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>아우터</div>
                    </div>
                </>
            ),
        },
        {
            path: "shoes",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>신발</div>
                    </div>
                </>
            ),
        },
        {
            path: "inner",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>이너웨어</div>
                    </div>
                </>
            ),
        },
    ];
}
