import LoginComponent from "components/user/LoginComponent";
import Header from "layout/Header";

import "styles/style.css";

const LoginPage = () => {
    return (
        <div>
            <Header />

            <div>
                <div>
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
