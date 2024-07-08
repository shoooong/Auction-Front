import React from "react";
import { Box, Typography } from "@mui/material";

// 관리자 푸터 컴포넌트
const AdminFooter = () => (
  <Box
    sx={{ p: 2, background: "#fffff", color: "#3F6EC9", textAlign: "center" }}
  >
    <Typography variant="body2">
      © 2024 관리자 페이지. All rights reserved.
    </Typography>
  </Box>
);

export default AdminFooter;
