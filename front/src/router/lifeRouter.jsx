export default function lifeRouter() {
    return [
        {
            path: "interior",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>인테리어</div>
                    </div>
                </>
            ),
        },
        {
            path: "kichen",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>키친</div>
                    </div>
                </>
            ),
        },
        {
            path: "beauty",
            element: (
                <>
                    <div className="container">
                        <div className="sub-nav"></div>
                        <div>뷰티</div>
                    </div>
                </>
            ),
        },
    ];
}
