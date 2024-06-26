import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const loginState = useSelector(state => state.loginSlice);

    return (
        <nav>
            <div>
                { ! loginState.email ?
                <div>
                    <Link to={'/user/login'}>Login</Link>
                </div>
                :

                <div>
                    <Link to={'/user/logout'}>Logout</Link>
                </div>
            }
            </div>
        </nav>
    );
};

export default Header;