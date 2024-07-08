import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getAccessToken, getUserWithAccessToken } from "../../api/user/kakaoApi";
import { login } from "../../store/slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const {moveToPath} = useCustomLogin();

    const dispatch = useDispatch();

    const authCode = searchParams.get("code");

    useEffect(() => {
        if (authCode) {
            getAccessToken(authCode)
                .then(accessToken => {
                    console.log(accessToken);
                    return getUserWithAccessToken(accessToken);
                })
                .then(userInfo => {
                    console.log(userInfo);

                    dispatch(login(userInfo));

                    if (userInfo && !userInfo.social) {
                        moveToPath("/");
                    } else {
                        moveToPath("/mypage/modify");
                    }
                })
                .catch(error => {
                    console.error('Error access token:', error);
                    alert('access token error!');
                });
        }
    }, [authCode]);


    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>Authorization Code: {authCode}</div>
        </div>
    );
};

export default KakaoRedirectPage;