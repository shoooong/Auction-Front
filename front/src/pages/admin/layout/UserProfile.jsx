import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import useCustomLogin from "hooks/useCustomLogin";

import { Box, Typography, Avatar } from "@mui/material";

const UserProfile = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout } = useCustomLogin();

  const isLoggedIn = !!loginState.email;

  const CLOUD_STORAGE_BASE_URL =
    "https://kr.object.ncloudstorage.com/push/shooong";

  return (
    <Box className="row-direction admin-profile-container">
      <Avatar
        alt={isLoggedIn ? loginState.nickname : "not defined"}
        src={`${CLOUD_STORAGE_BASE_URL}/mypage/${loginState.profileImg}`}
        sx={{ width: 48, height: 48, marginRight: "16px" }}
      />
      <Box>
        <Typography variant="body1">
          {isLoggedIn ? loginState.nickname : "로그인해주세요"}
        </Typography>
        <Typography variant="body2">
          {isLoggedIn ? (loginState.role ? "관리자 계정" : "사용자 계정") : ""}
        </Typography>
      </Box>
      <Box className="link-container text-right align-center">
        {!loginState.email ? (
          <Link to="/admin" className="login-link">
            로그인
          </Link>
        ) : (
          <Link to="/admin" onClick={doLogout} className="login-link">
            로그아웃
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
