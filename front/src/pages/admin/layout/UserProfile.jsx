import { Box, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import selkiAvatar from "assets/images/selkiAvatar.svg";
import bumsu from "assets/images/bumsu.svg"; // 기본 아바타 이미지
import useCustomLogin from "hooks/useCustomLogin";

const UserProfile = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout } = useCustomLogin();

  const isLoggedIn = !!loginState.email;

  return (
    <Box className="row-direction admin-profile-container">
      <Avatar
        alt={isLoggedIn ? loginState.nickname : "not defined"}
        src={isLoggedIn ? selkiAvatar : bumsu}
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
          <Link to="/admin/login" className="login-link">
            로그인
          </Link>
        ) : (
          <Link to="/admin/login" onClick={doLogout} className="login-link">
            로그아웃
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
