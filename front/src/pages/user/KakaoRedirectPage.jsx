import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken } from "../../api/user/kakaoApi";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const authCode = searchParams.get("code");

    useEffect(() => {
        getAccessToken(authCode)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error access token:', error);
            alert('access token error!');
        });
    }, [authCode]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    );
};

export default KakaoRedirectPage;