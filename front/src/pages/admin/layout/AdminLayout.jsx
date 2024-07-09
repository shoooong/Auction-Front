import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => (
  <Box sx={{ display: "flex", height: "100vh" }}>
    <AdminSideBar />
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, ml: "240px" }}
    >
      {" "}
      {/* 사이드바 너비만큼 마진 설정 */}
      <AdminHeader />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, padding: "16px", overflowY: "auto" }}>
          <Outlet />
        </Box>
        <AdminFooter />
      </Box>
    </Box>
  </Box>
);

export default AdminLayout;
