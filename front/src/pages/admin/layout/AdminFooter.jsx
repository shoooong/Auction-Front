import React from "react";
import { Box, Typography } from "@mui/material";

// 관리자 푸터 컴포넌트
const AdminFooter = () => (
  <Box className="footer">
    <Box className="footer-content">
      <div className="justify-center">
        {" "}
        {/* 첫 번째 자식 요소 */}
        <span className="footer-span">
          © 2024 관리자 페이지. All rights reserved.
        </span>
      </div>
    </Box>
  </Box>
);

export default AdminFooter;
