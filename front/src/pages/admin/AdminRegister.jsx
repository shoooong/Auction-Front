import { useState } from "react";

import { TextField, Button } from "@mui/material";

import useCustomRegister from "hooks/useCustomRegister";

const initState = {
  email: "",
  password: "",
  nickname: "",
  phoneNum: "",
  isAdmin: true, // 관리자 등록이므로 기본값을 true로 설정
};

const AdminRegister = () => {
  const [registerParam, setRegisterParam] = useState({ ...initState });

  const { doRegister, moveToPath } = useCustomRegister();

  const handleChange = ({ target: { name, value } }) => {
    setRegisterParam((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickRegister = async (e) => {
    try {
      const { registerData } = await doRegister(registerParam);

      if (registerData.error) {
        alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
      } else {
        alert("회원 가입에 성공했습니다. 로그인 페이지로 이동합니다.");
        moveToPath("/admin/login");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      alert("회원 가입 오류입니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-center">
          <div className="input-form">
            <div className="input-box">
              <p>이메일 주소</p>
              <TextField
                variant="standard"
                name="email"
                value={registerParam.email}
                placeholder="예) push@push.co.kr"
                onChange={handleChange}
              />
              <p>비밀번호</p>
              <TextField
                variant="standard"
                name="password"
                type={"password"}
                value={registerParam.password}
                onChange={handleChange}
              />
              <p>이름</p>
              <TextField
                variant="standard"
                name="nickname"
                value={registerParam.nickname}
                onChange={handleChange}
              />
              <p>휴대폰번호</p>
              <TextField
                variant="standard"
                name="phoneNum"
                value={registerParam.phoneNum}
                placeholder="예) 01012345678"
                onChange={handleChange}
              />
            </div>
            <Button
              className="full-btn align-center login-btn"
              onClick={handleClickRegister}
              style={{ marginBottom: "20px" }}
            >
              회원 가입
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminRegister;
