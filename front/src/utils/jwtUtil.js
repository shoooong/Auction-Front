import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { SERVER_URL } from "api/serverApi";

const jwtAxios = axios.create({
    baseURL: `${SERVER_URL}/api`,
    withCredentials: true,
});

const refresh = async (accessToken, refreshToken) => {
    console.log("calling refresh...");

    const header = {headers: {"Authorization": `Bearer ${accessToken}`}};

    try {
        const res = await axios.post(`${SERVER_URL}/user/refresh`, { refreshToken }, header);
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

        return Promise.reject({response: {data: {error:"REQUIRE_LOGIN"} } });
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

    return res;
};

// 응답 실패 시
const responseFail = async (err) => {
    console.log("response fail error...");

    if (err.response && err.response.status === 401 && err.response.data.error === 'ERROR_ACCESS_TOKEN') {
        const userInfo = getCookie("user");

        if (userInfo) {
            const { accessToken, refreshToken } = userInfo;

            try {
                const newTokens = await refresh(accessToken, refreshToken);
                userInfo.accessToken = newTokens.accessToken;
                userInfo.refreshToken = newTokens.refreshToken;
                setCookie("user", JSON.stringify(userInfo), 60 * 3);

                const originalRequest = { ...err.config };
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                throw refreshError;
            }
        }
    }
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


