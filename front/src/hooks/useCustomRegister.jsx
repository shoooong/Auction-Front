import { useNavigate } from "react-router-dom";
import { registerUser, registerAdmin, loginPost } from "api/user/userApi";

import { setCookie } from "pages/user/cookieUtil";

const useCustomRegister = () => {
  const navigate = useNavigate();

  const doRegister = async (registerParam, file) => {
    try {
      // const registerData = await registerUser(registerParam);
      // isAdmin 플래그에 따라 registerUser 또는 registerAdmin 호출
      const registerData = registerParam.isAdmin
        ? await registerAdmin(registerParam)
        : await registerUser(registerParam, file);

      if (!registerData.error) {
        const loginParam = {
          email: registerParam.email,
          password: registerParam.password,
        };
        const loginData = await loginPost(loginParam);

        if (loginData.token) {
          setCookie(
            "user",
            JSON.stringify({
              accessToken: loginData.token,
              refreshToken: loginData.refreshToken,
            }),
            1
          );
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
