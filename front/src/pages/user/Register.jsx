import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import Logo from "assets/images/logo.svg";
import defaultProfileImg from "assets/images/WelshCorgi.jpeg";
import useCustomRegister from "hooks/useCustomRegister";
import { getKaKaoLoginLink } from "../../api/user/kakaoApi";
import { emailRegExp, passwordRegExp, phoneNumRegExp } from "./mypageUtil";

const initState = {
    email: "",
    password: "",
    nickname: "",
    phoneNum: "",
};

const RegisterPage = () => {
    const [registerParam, setRegisterParam] = useState({ ...initState });
    const [file, setFile] = useState(null);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneNumError, setPhoneNumError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);

    const { doRegister, moveToPath } = useCustomRegister();

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
        switch (name) {
            case "email":
                setEmailError(!emailRegExp.test(value));
                break;
            case "password":
                setPasswordError(!passwordRegExp.test(value));
                break;
            case "nickname":
                setNicknameError(value.length > 10);
                break;
            case "phoneNum":
                setPhoneNumError(!phoneNumRegExp.test(value));
                break;
            default:
                break;
        }
    
        setRegisterParam((prev) => ({ ...prev, [name]: value }));
    };


    const handleClickRegister = async (e) => {
        if (emailError || passwordError || phoneNumError || nicknameError) {
            alert("입력한 정보에 오류가 있습니다. 다시 입력해 주세요.");
            return;
        }

        try {
            const { registerData } = await doRegister(registerParam, file);

            if (registerData.error) {
                alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
            } else {
                alert("회원 가입에 성공했습니다. 로그인 페이지로 이동합니다.");
                moveToPath('/user/login');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "회원 가입 오류입니다. 다시 시도해주세요.";
            alert(errorMessage);
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
                                helperText={emailError ? "유효하지 않은 이메일 형식입니다." : ""}
                                FormHelperTextProps={{
                                    style: { color: 'var(--primary)' }
                                }}
                            />
                            <p>비밀번호</p>
                            <TextField
                                variant="standard"
                                name="password"
                                type={"password"}
                                value={registerParam.password}
                                onChange={handleChange}
                                helperText={passwordError ? "비밀번호는 영문, 숫자, 특수 문자를 포함하여 8자 이상이어야 합니다." : ""}
                                FormHelperTextProps={{
                                    style: { color: 'var(--primary)' }
                                }}
                            />
                            <p>닉네임</p>
                            <TextField
                                variant="standard"
                                name="nickname"
                                value={registerParam.nickname}
                                onChange={handleChange}
                                helperText={nicknameError ? "닉네임은 10자 이내로 입력해야 합니다." : ""}
                                FormHelperTextProps={{
                                    style: { color: 'var(--primary)' }
                                }}
                            />
                            <p>휴대폰번호</p>
                            <TextField
                                variant="standard"
                                name="phoneNum"
                                value={registerParam.phoneNum}
                                placeholder="예) 01012345678"
                                onChange={handleChange}
                                helperText={phoneNumError ? "휴대폰 번호는 11자리 숫자만 입력 가능합니다." : ""}
                                FormHelperTextProps={{
                                    style: { color: 'var(--primary)' }
                                }}
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