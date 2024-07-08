import axios from "axios";
import { SERVER_URL } from "../serverApi";

const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const accessToken_uri = `https://kauth.kakao.com/oauth/token`;


export const getKaKaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL;
};

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    };

    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    };

    try {
        const res = await axios.post(accessToken_uri, params, header);

        const accessToken = res.data.access_token;

        return accessToken;
    } catch (error) {
        console.error('Failed to get access token:', error);

        throw error;
    };
};
 
// 액세스 토큰을 사용하여 서버로 요청을 보냅니다.
export const getUserWithAccessToken = async (accessToken) => {
    try {
        const res = await axios.get(`${SERVER_URL}/user/kakao?accessToken=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('Response from server:', res.data);
        return res.data;
    } catch (error) {
        console.error('Failed to get user info:', error);
        throw error;
    }
};