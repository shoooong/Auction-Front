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
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        ml: "240px",
        gap: 4,
        mt: 4,
      }}
    >
      <AdminHeader sx={{ mb: 6 }} /> {/* Header와 Outlet 사이 간격 크게 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <Box sx={{ flex: 1, padding: "48px", overflowY: "auto" }}>
          <Outlet />
        </Box>
        <AdminFooter sx={{ mt: 6 }} /> {/* Outlet과 Footer 사이 간격 크게 */}
      </Box>
    </Box>
  </Box>
);

export default AdminLayout;
