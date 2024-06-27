import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { modifyUser } from "api/user/userApi";
import useCustomLogin from "hooks/useCustomLogin";

const initState = {
    email: '',
    password: '',
    nickname: '',
    phone: ''
};

const ModifyPage = () => {
    const [user, setUser] = useState(initState);
    const loginInfo = useSelector(state => state.loginSlice);

    // TODO: 회원 정보 수정 이후 dialog 생성 및 경로 이동
    const {moveToLogin} = useCustomLogin();
    const [result, setResult] = useState();

    useEffect(() => {
        setUser({...loginInfo});
    }, [loginInfo]);

    const handleChange = (e) => {
        user[e.target.name] = e.target.value;

        setUser({...user});
    }

    const handleClickModify = () => {
        modifyUser(user)
        .then(result => {
            setResult('Modified');
        })
        .catch(error => {
            console.error('Modify Error...');
            setResult('Error');
        })
    }

    return (
        <div>
            <div>
                <div>
                    <div>Email</div>
                    {/* TODO: input 컴포넌트로 변경 */}
                    <input name="email" type={'text'} value={user.email} readOnly></input>
                </div>
            </div>

            <div>
                <div>
                    <div>Password</div>
                    <input name="password" type={'password'} value={user.password} onChange={handleChange}></input>
                </div>
            </div>

            <div>
                <div>
                    <div>닉네임</div>
                    <input name="nickname" type={'text'} value={user.nickname} onChange={handleChange}></input>
                </div>
            </div>
            <div>
                <div>
                    <button type="button" onClick={handleClickModify}>수정</button>
                </div>
            </div>
        </div>
    );
}

export default ModifyPage;