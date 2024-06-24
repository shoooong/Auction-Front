import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutComponent = () => {

    const {doLogout, moveToPath} = useCustomLogin();

    const handleClickLogout = () => {
        doLogout();
        // TODO: 로그인 성공 시 이동 경로 설정
        // moveToPath("/");
    };

    return (
        <div>
            <div>
                <div>
                    LogOutComponent
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <button onClick={handleClickLogout}>
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutComponent;
