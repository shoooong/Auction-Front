import React from "react";
import { Link } from "react-router-dom";

import { Box, List, ListItemText } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import UserProfile from "./UserProfile"; // UserProfile 컴포넌트 경로에 맞게 수정하세요.

import "styles/admin.css";

const mainDepartments = ["의류", "라이프", "테크"]; // 대분류 항목을 배열로 관리

const Nav = () => {
  return (
    <Box className="w20p pdx20 column-direction admin-nav">
      <UserProfile name="안슬기 님" accountType="관리자 계정" />
      <List>
        <NavLink to="/admin/request">
          <span className="icon">
            <AddShoppingCartIcon />
          </span>
          <ListItemText primary="요청 상품 관리" />
        </NavLink>
        <NavLink to="/admin/products/{main}">
          <span className="icon">
            <AppsOutlinedIcon />
          </span>
          <ListItemText primary="입고 상품 관리" />
        </NavLink>
        <NavLink to="/admin/luckydraws">
          <span className="icon">
            <SentimentVerySatisfiedOutlinedIcon />
          </span>
          <ListItemText primary="행운의 추첨 관리" />
        </NavLink>
        <NavLink to="/admin/notice">
          <span className="icon">
            <CampaignOutlinedIcon />
          </span>
          <ListItemText primary="공지사항 관리" />
        </NavLink>
        <NavLink to="/admin/inquiry">
          <ListItemText primary="1:1 문의 관리" />
        </NavLink>
      </List>
    </Box>
  );
};

const NavLink = ({ to, children }) => (
  <Box component={Link} to={to} sx={{}} className="admin-navlink">
    {children}
  </Box>
);

export default Nav;
