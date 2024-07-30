import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

import Logo from "assets/images/logo.svg";

import "styles/findEmail.css";

const FindEmailResult = ({ email }) => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="sub-nav"></div>

            <div className="flex justify-center">
                <div className="input-form">
                    <div className="text-center">
                        <img src={Logo} alt="push" />
                    </div>

                    <div className="instruction-container">
                        <h2>이메일 찾기</h2>
                        <p>
                        가입하신 이메일 계정을 찾았습니다.<br/>
                        아래 계정으로 로그인 하세요.
                        </p>
                    </div>

                    <div className="email-result-container">
                        <div className="email-result-header">
                            <span>가입된 계정</span>
                        </div>
                        <div className="email-result-email">
                            <span>이메일: </span>{email}
                        </div>
                    </div>
                    
                    
                    <Button
                        className="full-btn align-center login-btn"
                        onClick={() => navigate('/user/login')}
                        style={{ marginBottom: '20px' }}
                    >
                        로그인하러 가기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FindEmailResult;