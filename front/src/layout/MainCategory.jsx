import { Link, Outlet } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className="sub-nav container">
                <Link to="/">의류</Link>
                <Link to="/life">라이프</Link>
                <Link to="/tech">수현이</Link>
                <Link to="/rank">전용</Link>
                <Link to="/luckydraw">드로우</Link>
                <Link to="/event">이벤트</Link>
            </div>

            <Outlet />
        </>
    );
}
