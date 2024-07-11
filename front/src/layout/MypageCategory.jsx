import { Link, Outlet } from "react-router-dom";

export default function MypageCategory() {
    return (
        <div className="container">
            <div className="sub-nav"></div>

            <div className="flex">
                <div className="w20p">
                    <div className="mypage-nav pos-sticky">
                        <h2>마이페이지</h2>

                        <div>
                            <h3>쇼핑 정보</h3>
                            <Link to="/mypage/buyingHistory">구매내역</Link>
                            <Link to="/mypage/salesHistory">판매내역</Link>
                            <Link to="/mypage/applyHistory">응모내역</Link>
                            <Link to="/mypage/bookmark">관심</Link>
                        </div>
                        <div>
                            <h3>내 정보</h3>
                            <Link to="/mypage/modify">프로필 관리</Link>
                            <Link to="/mypage/delivery">배송지 관리</Link>
                            <Link to="/mypage/account">계좌 관리</Link>
                            <Link to="/mypage/coupon">쿠폰</Link>
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
