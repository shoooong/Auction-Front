import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getUserWithAccessToken } from "../../api/user/kakaoApi";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

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