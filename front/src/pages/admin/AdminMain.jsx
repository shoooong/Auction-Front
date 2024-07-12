import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useCustomLogin from "hooks/useCustomLogin";

import { TextField, Button } from "@mui/material";

const initState = {
  email: "",
  password: "",
};

const AdminMain = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = async (e) => {
    try {
      const data = await doLogin(loginParam);
      console.log(data);

      if (data.error) {
        alert("이메일과 패스워드가 일치하지 않습니다");
      } else {
        if (data.role === true) {
          moveToPath("/admin/request");
        } else {
          moveToPath("/admin/login");
          alert("관리자 권한이 없습니다.");
        }
      }
    } catch (error) {
      console.error("Login failed: ", error);
      alert("로그인 오류입니다. 다시 시도해주세요.");
    }
  };

  return (
    // <LoginComponent />
    <>
      <div className="container">
        <div className="flex justify-center">
          <div className="input-form">
            <div className="input-box">
              <p>이메일 주소</p>
              <TextField
                variant="standard"
                name="email"
                value={loginParam.email}
                placeholder="예) push@push.co.kr"
                onChange={handleChange}
              />
              <p>비밀번호</p>
              <TextField
                variant="standard"
                name="password"
                type={"password"}
                value={loginParam.password}
                onChange={handleChange}
              />
            </div>
            <Button
              className="full-btn align-center login-btn"
              onClick={handleClickLogin}
            >
              로그인
            </Button>

            <ul className="flex">
              <li className="flex-grow text-center">
                <Link to="/admin/register">이메일 가입</Link>
              </li>
              <li className="flex-grow text-center">
                <Link to="/user/register">이메일 찾기</Link>
              </li>
              <li className="flex-grow text-center">
                <Link to="/user/register">비밀번호 찾기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMain;
