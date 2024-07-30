import React, { useState } from 'react';

import { findEmail } from 'api/user/userApi';

import FindEmailResult from './FindEmailResult';
import SocialLogin from 'components/SocialLogin';

import { TextField, Button } from "@mui/material";

import Logo from "assets/images/logo.svg";


const FindEmail = () => {
    const [nickname, setNickname] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        const userFindEmailReqDto = {
            nickname: nickname,
            phoneNum: phoneNum
        };

        try {
            const response = await findEmail(userFindEmailReqDto);
            if (response.email) {
                setEmail(response.email);
            } else {
                setError('이메일을 찾을 수 없습니다.');
            }
        } catch (error) {
            setError('이메일 찾기 중 오류가 발생했습니다.');
        }
    };

    if (email) {
        return <FindEmailResult email={email} />;
    }

    return (
        <div className="container">
            <div className="sub-nav"></div>

            <div className="flex justify-center">
                <div className="input-form">
                    <div className="text-center">
                        <img src={Logo} alt="push" />
                    </div>

                    <div className="input-box">
                        <p>닉네임</p>
                        <TextField
                            variant="standard"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <p>휴대폰번호</p>
                        <TextField
                            variant="standard"
                            name="phoneNum"
                            value={phoneNum}
                            placeholder="예) 01012345678"
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </div>
                    <Button
                        className="full-btn align-center login-btn"
                        onClick={handleSubmit}
                        style={{ marginBottom: '20px' }}
                    >
                        이메일 찾기
                    </Button>
                    
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}

                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default FindEmail;