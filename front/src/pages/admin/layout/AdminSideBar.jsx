import React from "react";
import { Box, List, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile"; // UserProfile 컴포넌트 경로에 맞게 수정하세요.

const Nav = () => {
  return (
    <Box
      sx={{
        width: "240px",
        backgroundColor: "#1976d2",
        color: "#fff",
        height: "100vh",
        padding: "16px",
        position: "fixed", // 사이드바를 고정
        top: 0, // 상단에서 0으로 고정
        left: 0, // 왼쪽에서 0으로 고정
      }}
    >
      <UserProfile name="안슬기 님" accountType="관리자 계정" />
      <List>
        <NavLink to="/admin/request">
          <ListItemText primary="요청 상품 관리" />
        </NavLink>
        <NavLink to="/admin/products">
          <ListItemText primary="입고 상품 관리" />
        </NavLink>
        <NavLink to="/admin/lucky-draw-management">
          <ListItemText primary="행운의 추첨 관리" />
        </NavLink>
        <NavLink to="/admin/notice-management">
          <ListItemText primary="공지사항 관리" />
        </NavLink>
      </List>
    </Box>
  );
};

const NavLink = ({ to, children }) => (
  <Box
    component={Link}
    to={to}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    }}
  >
    {children}
  </Box>
);

export default Nav;
