import { Link, Outlet } from "react-router-dom";

export default function ClothesCategory() {
    return (
        <>
            <Link to="top">상의</Link>
            <Link to="bottom">하의</Link>
            <Link to="outer">아우터</Link>
            <Link to="shoes">신발</Link>
            <Link to="inner">이너웨어</Link>
            <Outlet />
        </>
    );
}
