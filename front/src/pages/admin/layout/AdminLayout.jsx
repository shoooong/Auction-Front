import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => (
  <Box className="admin-container">
    <AdminSideBar className="w20p" />
    <Box className="column-direction w80p pdx20">
      <AdminHeader />
      <Box
        className="column-direction flex-grow"
        // style={{ width: "100%" }}
      >
        <Outlet />
      </Box>
      <AdminFooter />
    </Box>
  </Box>
);

export default AdminLayout;
