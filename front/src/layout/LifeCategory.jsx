import { Link, Outlet } from "react-router-dom";

export default function LifeCategory() {
    return (
        <>
            <Link to="interior">인테리어</Link>
            <Link to="kichen">키친</Link>
            <Link to="beauty">뷰티</Link>
            <Outlet />
        </>
    );
}
