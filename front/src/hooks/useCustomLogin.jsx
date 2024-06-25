import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, createSearchParams } from "react-router-dom";
import { loginPostAsync, logout } from "../store/slices/loginSlice";

const useCustomLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginState = useSelector(state => state.loginSlice);

    const isLogin = loginState.email ? true : false;

    const doLogin = async (loginParam) => {
        try {
            const action = await dispatch(loginPostAsync(loginParam));
            return action.payload;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const doLogout = () => {
        dispatch(logout());
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

    const exceptionHandler = (ex) => {
        console.log("----------Exception---------");
        console.log(ex);

        const errorMsg = ex.response.data.error;
        
        const errorStr = createSearchParams({error: errorMsg}).toString();

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 이후에 이용 가능합니다.");
            
            navigate({pathname:'/user/login', search: errorStr});

            return;
        };

        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 페이지를 이용할 수 있는 권한이 없습니다.");

            navigate({pathname:'/user/login', search: errorStr});

            return;
        };
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandler};
}

export default useCustomLogin;