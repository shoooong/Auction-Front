import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    email: '',
    password: ''
};

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({...initState});

    const {doLogin, moveToPath} = useCustomLogin();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;

        setLoginParam({...loginParam});
    };

    const handleClickLogin = (e) => {
        // 동기화된 호출
        // dispatch(login(loginParam));

        // loginSlice 비동기 호출
        doLogin(loginParam)
        .then(data => {
            console.log(data);

            if (data.error) {
                alert("이메일과 패스워드가 일치하지 않습니다")
            } else {
                // TODO: 로그인 성공 시 이동 경로 설정
                // moveToPath('/');
                // 1) 로그인 성공 시 '/'로 이동, 2) 뒤로 가기 했을 때 로그인 화면 볼 수 없게
            };
        });
    };

    return (
        <div>
            <div>
                <div>LoginComponent</div>
            </div>
            <div>
                <div>
                    <div>Email</div>
                    <input name="email" type={'text'} value={loginParam.email} onChange={handleChange}></input>
                </div>
            </div>
            <div>
                <div>
                    <div>Password</div>
                    <input name="password" type={'password'} value={loginParam.password} onChange={handleChange}></input>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <button onClick={handleClickLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;