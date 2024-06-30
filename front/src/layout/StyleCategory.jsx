import { Link, Outlet } from "react-router-dom";

export default function Style() {
    return (
        <>
            <div className="container">
                <div className="sub-nav">
                    <Link to="/style">피드</Link>
                    <Link to="/style/rank">랭킹</Link>
                </div>
            </div>

            <Outlet />
        </>
    );
}
