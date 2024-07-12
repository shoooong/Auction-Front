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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#2C57AC",
        borderRadius: "8px",
        padding: "8px",
        color: "#fff",
        marginBottom: "16px",
      }}
    >
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
        <Box className="aside flex align-center">
          {!loginState.email ? (
            <Link to="/admin/login">로그인</Link>
          ) : (
            <Link to="/admin/login" onClick={doLogout}>
              로그아웃
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
