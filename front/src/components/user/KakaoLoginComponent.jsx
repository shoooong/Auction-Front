import { Link } from "react-router-dom";

import { getKaKaoLoginLink } from "api/user/kakaoApi";

const KakaoLoginComponent = () => {
    
    const link = getKaKaoLoginLink();

    return (
        <div>
            <div>
                로그인시에 자동 가입처리
            </div>
            <div>
                <div>
                    <Link to={link}>KAKAO LOGIN</Link>
                </div>
            </div>
        </div>
    );
};

export default KakaoLoginComponent;