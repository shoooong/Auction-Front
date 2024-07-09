import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "assets/images/logo.svg";

const AdminHeader = () => (
  <Box
    sx={{
      p: 2,
      background: "#FFFFF",
      color: "#fff",
      textAlign: "center",
      width: "100%",
    }}
  >
    {/* <Typography variant="h6">관리자 페이지</Typography> */}
    <h1 className="logo">
      <Link to="/admin">
        <img src={logo} alt="logo" />
      </Link>
    </h1>
  </Box>
);

export default AdminHeader;
