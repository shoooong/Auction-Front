import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, createSearchParams } from "react-router-dom";
import { loginPostAsync, logoutPostAsync, unregisterUserAsync } from "../store/slices/loginSlice";

const useCustomLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginState = useSelector(state => state.loginSlice);

    const isLogin = loginState.email ? true : false;
    const isAdmin = window.location.pathname.startsWith('/admin');

    const doLogin = async (loginParam) => {
        try {
            const action = await dispatch(loginPostAsync(loginParam));
            return action.payload;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const doLogout = async () => {
        try {
            await dispatch(logoutPostAsync());
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const doUnregister = async () => {
        try {
            await dispatch(unregisterUserAsync()).unwrap();
            moveToPath('/');
        } catch (error) {
            console.error("Unregister failed:", error);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace:true});
    };

    const moveToLogin = () => {
        navigate({pathname: '/user/login'}, {replace:true});
    };

    const moveToLoginReturn = () => {
        return <Navigate replace to="/user/login" />;
    };

    const exceptionHandler = useCallback((ex) => {
        console.log("----------Exception---------@@@");
        console.log(ex.error);

        const errorMsg = ex.response?.data?.error;
        
        const errorStr = createSearchParams({error: errorMsg}).toString();

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("%로그인이 필요한 서비스 입니다.%");
            
            navigate({
                pathname: isAdmin ? '/admin/login' : '/user/login',
                search: errorStr
            });

            return;
        };

        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 페이지를 이용할 수 있는 권한이 없습니다.");

            navigate({
                pathname: isAdmin ? '/admin/login' : '/user/login',
                search: errorStr
            });

            return;
        };

        alert(errorStr);
    }, [navigate, isAdmin]);

    return {loginState, isLogin, doLogin, doLogout, doUnregister, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandler};
}

export default useCustomLogin;