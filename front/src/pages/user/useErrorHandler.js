// import { useNavigate } from "react-router-dom";
// import { useCallback } from 'react';

// export const useErrorHandler = () => {
//     const navigate = useNavigate();

//     const handleError = useCallback((error) => {
        
//         // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어난 경우
//         if (error.response) {
//             const { status, data } = error.response;
//             if (status === 401 && data.error === 'REQUIRE_LOGIN') {
//                 alert('로그인이 필요한 서비스 입니다.');
//                 navigate('/user/login');
//             } else {
//                 const {status, data} = error.response;
//                 const message = getErrorMsg(status);
//                 console.error(`Error ${status}: ${message}`);
//                 console.error("Response data:", data);
//             } 
//         }
//         // 요청이 만들어졌지만 응답을 받지 못한 경우
//         else if (error.request) {
//             console.error("Network Error: No response received from the server");
//             console.error("Request data:", error.request);
//         }
//         // 요청을 설정하는 중에 발생하는 오류
//         console.error("Error: ", error.message);
//     }, [navigate]);
//     return handleError;
// };

// const getErrorMsg = (status) => {
//     const statusMsg = {
//         400: "Bad Request: The request was invalid or cannot be otherwise served",
//         401: "Unauthorized: Invalid refresh token or session expired",
//         403: "Forbidden: You don't have permission to access this resource",
//         500: "Internal Server Error: An error occurred on the server",
//         default: "An unexpected error occurred"
//     };
    
//     return statusMsg[status] || statusMsg.default;
// };
