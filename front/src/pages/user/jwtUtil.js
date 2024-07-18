import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { SERVER_URL } from "api/serverApi";

// TODO: JWT를 사용해야 하는 api에서는 기존의 axios 대신 jwtAxios를 사용할 것
const jwtAxios = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
});


const refreshToken = async (refreshToken) => {
    try {
        const res = await jwtAxios.post('/user/refresh', {refreshToken});
        console.log(res.data);
        return res.data;
    } catch (error) {
        handleError(error);
        throw error;
    };  
};


// 요청 전에
const beforeReq = async (config) => {
    console.log("before request...");

    let accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    console.log("refreshToken : ", refreshToken);
    
    if (refreshToken === null) {
        console.log("User not found!");
        alert("로그인이 필요한 서비스 입니다.");
        window.location.href = 'http://www.sho0ong.com/user/login';

        return Promise.reject({
            response: {
                status: 401,
                data: { error: "REQUIRE_LOGIN" }
            }
        });
    };

    if (!accessToken) {
        try {
            const data = await refreshToken(refreshToken);
            accessToken = data.accessToken;
            setCookie('accessToken', accessToken, 1/24);
        } catch (error) {
            console.log("Failed to refresh token!");
            alert("로그인이 필요한 서비스 입니다.");
            window.location.href = 'http://www.sho0ong.com/user/login';

            return Promise.reject({
                response: {
                    status: 401,
                    data: { error: "REQUIRE_LOGIN" }
                }
            });
        }
    }


    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};


// 요청 실패 시
const requestFail = (err) => {
    console.log("request error...");

    return Promise.reject(err);
};


// 응답 전에
const beforeRes = (res) => {
    console.log("before return response...");
    console.log(res);

    return res;
};


// 응답 실패 시
// const responseFail = (err) => {
//     console.log("response fail error...");

//     return Promise.reject(err);
// };
const responseFail = async (err) => {
    console.log("response fail error...");

    // const { response } = err;

    // if (response) {
    //     if (response.status === 401 && response.message === "ERROR_ACCESS_TOKEN") {
    //         const refreshToken = getCookie("refreshToken");
            
    //         try {
    //             const result = await refreshToken(refreshToken);
    //             console.log("refreshToken RESULT: ", result);

    //             const newAccessToken = result.accessToken;
    //             // const newRefreshToken = result.refreshToken;

    //             // setCookie("user", JSON.stringify(userinfo), 1);

    //             // 원래 원했던 호출 재시도
    //             const originalRequest = { ...response.config };
    //             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    //             return jwtAxios(originalRequest);
    //         } catch (error) {
    //             console.error("Failed to refresh token during response interception", error);
    //             handleError(error);
    //             return Promise.reject(error);
    //         }
    //     } else {
    //         handleError(err);
    //     }
    // }

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