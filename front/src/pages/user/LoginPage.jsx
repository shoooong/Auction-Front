import LoginComponent from "../../components/user/LoginComponent";
import Header from "./Header";

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