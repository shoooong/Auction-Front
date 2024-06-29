import { NavLink, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import logo from "assets/images/logo.svg";
import Search from "assets/images/search.svg";
import useCustomLogin from "hooks/useCustomLogin";

export default function Header() {
    const loginState = useSelector((state) => state.loginSlice);

    const { doLogout } = useCustomLogin();

    return (
        <>
            <div className="container">
                <Box className="flex space-between align-center header">
                    <h1 className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </h1>
                    <div className="flex column-direction h100p w70p align-end">
                        <Box className="aside">
                            <Link to="/service">고객센터</Link>
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/mypage/bookmark">관심</Link>
                            <Link>알림</Link>
                            {!loginState.email ? (
                                <Link to="/user/login">로그인</Link>
                            ) : (
                                <Link to="/" onClick={doLogout}>로그아웃</Link>

                            )}
                        </Box>
                        <Box className="nav">
                            <NavLink to="/" activeclassname="active">
                                HOME
                            </NavLink>
                            <NavLink to="/shop">SHOP</NavLink>
                            <NavLink to="/style">STYLE</NavLink>
                            <Link to="/search">
                                <img src={Search} alt="Search" />
                            </Link>
                        </Box>
                    </div>
                </Box>
            </div>

            <Outlet />
        </>
    );
}
