import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../store/slices/loginSlice";

const useCustomLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginState = useSelector(state => state.loginSlice);

    const isLogin = loginState.email ? true : false;

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam));
        return action.payload;
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

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn};
}

export default useCustomLogin;