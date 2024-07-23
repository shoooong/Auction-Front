import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import Logo from "assets/images/logo.svg";
import defaultProfileImg from "assets/images/WelshCorgi.jpeg";
import useCustomRegister from "hooks/useCustomRegister";
import { getKaKaoLoginLink } from "../../api/user/kakaoApi";

const initState = {
    email: "",
    password: "",
    name: "",
    phoneNum: "",
};

const RegisterPage = () => {
    const [registerParam, setRegisterParam] = useState({ ...initState });
    const { doRegister, moveToPath } = useCustomRegister();
    const [file, setFile] = useState(null);


    useEffect(() => {
        fetch(defaultProfileImg)
            .then(response => response.blob())
            .then(blob => {
                const defaultFile = new File([blob], "WelshCorgi.jpeg", { type: "image/jpeg" });
                setFile(defaultFile);
                setRegisterParam(prev => ({ ...prev, profileImg: URL.createObjectURL(defaultFile) }));
            })
            .catch(error => console.error('Error fetching default profile image:', error));
    }, []);


    const handleChange = ({ target: { name, value } }) => {
        setRegisterParam((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickRegister = async (e) => {
        e.preventDefault();

        try {
            const { registerData } = await doRegister(registerParam, file);

            if (registerData.error) {
                alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
            } else {
                alert("회원 가입에 성공했습니다. 로그인 페이지로 이동합니다.");
                moveToPath('/user/login');
            }
        } catch (error) {
            console.error("Registration failed: ", error);
            alert("회원 가입 오류입니다. 다시 시도해주세요.");
        }
    };

    // 카카오
    const link = getKaKaoLoginLink();

    return (
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
                                name="name"
                                value={registerParam.name}
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
                            style={{ marginBottom: '20px' }}
                        >
                            회원 가입
                        </Button>

                        <div className="btn full-btn border-btn align-center justify-center">
                            <span></span>
                            <Link to={link}>네이버로 로그인</Link>
                        </div>
                        <div className="btn full-btn border-btn align-center justify-center">
                            <span></span>
                            <Link to={link}>카카오톡으로 로그인</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;