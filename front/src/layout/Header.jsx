import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Alarm from "pages/Alarm";
import logo from "assets/images/logo.svg";
import Search from "assets/images/search.svg";
import useLoginStore from 'store/slices/loginSlice'; 

const Header = () => {
    const { isLogin, checkAuth, logout } = useLoginStore();
    
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // 알람
    const [alarmOpen, setAlarmOpen] = useState(false);

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
                        <Box className="aside flex align-center">
                            <Link to="/service">고객센터</Link>
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/mypage/bookmark">관심</Link>
                            <Button
                                className="alarm-btn"
                                onClick={() => setAlarmOpen(true)}
                            >
                                알림
                            </Button>
                            {!isLogin ? (
                                <Link to="/user/login">로그인</Link>
                            ) : (
                                <Link to="/" onClick={logout}>
                                    로그아웃
                                </Link>
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

            <Alarm open={alarmOpen} close={() => setAlarmOpen(false)} />

            <Outlet />
        </>
    );
};

export default Header;