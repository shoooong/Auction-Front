import { Link, Outlet } from "react-router-dom";

import Clothes from "pages/clothes/Clothes";

export default function Header() {
    return (
        <>
            <div className="sub-nav">
                <Link to="/">의류</Link>
                <Link to="/life">라이프</Link>
                <Link to="/tech">테크</Link>
                <Link to="/rank">랭킹</Link>
                <Link to="/draw">드로우</Link>
                <Link to="/event">이벤트</Link>
            </div>
            <Outlet />
        </>
    );
}
