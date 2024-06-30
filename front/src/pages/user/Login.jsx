import { useState } from "react";
import { Link } from "react-router-dom";

import useCustomLogin from "../../hooks/useCustomLogin";
import { getKaKaoLoginLink } from "../../api/user/kakaoApi";
// import KakaoLoginComponent from "components/user/KakaoLoginComponent";

import { TextField, Button } from "@mui/material";

import Logo from "assets/images/logo.svg";

const initState = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const [loginParam, setLoginParam] = useState({ ...initState });

    const { doLogin, moveToPath } = useCustomLogin();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;

        setLoginParam({ ...loginParam });
    };

    const handleClickLogin = (e) => {
        // loginSlice 비동기 호출
        doLogin(loginParam)
            .then((data) => {
                console.log(data);

                if (data.error) {
                    alert("이메일과 패스워드가 일치하지 않습니다");
                } else {
                    // TODO: 로그인 성공 시 이동 경로 설정
                    // moveToPath('/');
                    // 1) 로그인 성공 시 '/'로 이동, 2) 뒤로 가기 했을 때 로그인 화면 볼 수 없게
                }
            })
            .catch((error) => {
                console.error("Login failed: ", error);
                alert("로그인 오류입니다. 다시 시도해주세요.");
            });
    };

    // 카카오
    const link = getKaKaoLoginLink();

    return (
        // <LoginComponent />
        <>
            <div className="container">
                <div className="sub-nav"></div>

                <div className="flex justify-center">
                    <div className="input-form">
                        <div className="text-center">
                            <img src={Logo} alt="push" />
                        </div>

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
                                <Link to="/user/register">이메일 가입</Link>
                            </li>
                            <li className="flex-grow text-center">
                                <Link to="/user/register">이메일 찾기</Link>
                            </li>
                            <li className="flex-grow text-center">
                                <Link to="/user/register">비밀번호 찾기</Link>
                            </li>
                        </ul>

                        {/* <KakaoLoginComponent /> */}
                        <div className="full-btn align-center justify-center">
                            <span></span>
                            <Link to={link}>네이버로 로그인</Link>
                        </div>
                        <div className="full-btn align-center justify-center">
                            <span></span>
                            <Link to={link}>카카오톡으로 로그인</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
