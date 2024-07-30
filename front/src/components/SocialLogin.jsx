import React from 'react';
import { Link } from 'react-router-dom';

const SocialLogin = ({ naverLink, kakaoLink }) => {
    return (
        <>
            <div className="btn full-btn border-btn align-center justify-center">
                <span></span>
                <Link to={naverLink}>네이버로 로그인</Link>
            </div>
            <div className="btn full-btn border-btn align-center justify-center">
                <span></span>
                <Link to={kakaoLink}>카카오톡으로 로그인</Link>
            </div>
        </>
    );
};

export default SocialLogin;