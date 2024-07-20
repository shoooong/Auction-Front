import { Link, Outlet } from "react-router-dom";

export default function MypageCategory() {
    return (
        <div className="container">
            <div className="sub-nav"></div>

            <div className="flex">
                <div className="w20p">
                    <div
                        className="mypage-nav pos-sticky"
                        style={{ paddingBottom: "150px" }}
                    >
                        <h2>고객센터</h2>

                        <div>
                            <h3>문의</h3>
                            <Link to="/service/notice">공지사항</Link>
                            <Link to="/service/inquiry">1:1 문의</Link>
                            <Link to="/service/request">
                                미등록 상품 등록 요청
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w80p">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
