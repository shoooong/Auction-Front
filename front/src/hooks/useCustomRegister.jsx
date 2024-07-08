import { useNavigate } from 'react-router-dom';
import { registerUser, loginPost } from "api/user/userApi";

import { setCookie } from 'pages/user/cookieUtil';

const useCustomRegister = () => {
    const navigate = useNavigate();
  
    const doRegister = async (registerParam) => {
      try {
        const registerData = await registerUser(registerParam);

        if (!registerData.error) {
            const loginParam = {
                email: registerParam.email,
                password: registerParam.password,
            };
            const loginData = await loginPost(loginParam);

            if (loginData.token) {
                setCookie("user", JSON.stringify({ accessToken: loginData.token, refreshToken: loginData.refreshToken }), 1);
            }

            return { registerData, loginData };
        }
        return { registerData, loginData: null };
    } catch (error) {
        console.error("Registration failed: ", error);
        throw error;
      }
    };
  
    const moveToPath = (path) => {
      navigate(path);
    };
  
    return { doRegister, moveToPath };
  };
  
  export default useCustomRegister;