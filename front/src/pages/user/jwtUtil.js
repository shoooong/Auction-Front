import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { SERVER_URL } from "api/serverApi";

// TODO: JWT를 사용해야 하는 api에서는 기존의 axios 대신 jwtAxios를 사용할 것
const jwtAxios = axios.create();

const refreshToken = async (accessToken, refreshToken) => {
    const host = SERVER_URL;

    const header = {headers: {"Authorization": `Bearer ${accessToken}`}};

    try {
        const res = await axios.post(`${host}/user/refresh`, {refreshToken}, header);

        console.log(res.data);

        return res.data;
    } catch (error) {
                handleError(error);

        throw error;
    };  
};

// 요청 전에
const beforeReq = (config) => {
    console.log("before request...");

    const userInfo = getCookie("user");

    if (!userInfo) {
        console.log("User not found!");

        return Promise.reject(
            {response:
                {data:
                    {error:"REQUIRE_LOGIN"}
                }
            }
        );
    };

    const {accessToken} = userInfo;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};

// 요청 실패 시
const requestFail = (err) => {
    console.log("request error...");

    return Promise.reject(err);
};

// 응답 전에
const beforeRes = async (res) => {
    console.log("before return response...");
    console.log(res);

    const data = res.data;

    if (data && data.error === 'ERROR_ACCESS_TOKEN') {
        const userCookieValue = getCookie("user");

        try {
            const result = await refreshToken(userCookieValue.accessToken, userCookieValue.refreshToken);
            console.log("refreshToken RESULT: ", result);

            userCookieValue.accessToken = result.accessToken;
            userCookieValue.refreshToken = result.refreshToken;

            setCookie("user", JSON.stringify(userCookieValue), 1);

            // 원래 원했던 호출 재시도
            const originalRequest = { ...res.config };

            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

            return jwtAxios(originalRequest);
        } catch (error) {
            console.error("Failed to refresh token during response interception", error);

            return Promise.reject(error);
        }
    };

    return res;
};

// 응답 실패 시
const responseFail = (err) => {
    console.log("response fail error...");

    return Promise.reject(err);
};



/**
 * 에러 핸들링 함수
 */
const handleError = (error) => {
    
    // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어난 경우
    if (error.response) {
        const {status, data} = error.response;
        const message = getErrorMsg(status);
        console.error(`Error ${status}: ${message}`);
        console.error("Response data:", data);
    } 
    // 요청이 만들어졌지만 응답을 받지 못한 경우
    else if (error.request) {
        console.error("Network Error: No response received from the server");
        console.error("Request data:", error.request);
    }
    // 요청을 설정하는 중에 발생하는 오류
    console.error("Error: ", error.message);
};

const getErrorMsg = (status) => {
    const statusMsg = {
        400: "Bad Request: The request was invalid or cannot be otherwise served",
        401: "Unauthorized: Invalid refresh token or session expired",
        403: "Forbidden: You don't have permission to access this resource",
        500: "Internal Server Error: An error occurred on the server",
        default: "An unexpected error occurred"
    };
    
    return statusMsg[status] || statusMsg.default;
};




jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;


