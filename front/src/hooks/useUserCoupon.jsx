import { useState, useEffect } from "react";
import { SERVER_URL } from "api/serverApi";
import jwtAxios from "pages/user/jwtUtil";
import { getCookie } from "pages/user/cookieUtil";
import { useNavigate } from "react-router-dom";

const useUserCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrawItems = async () => {
            const userInfo = getCookie("user");

            if (!userInfo || !userInfo.accessToken) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/user/login");
                return;
            }

            const { accessToken } = userInfo;

            try {
                const response = await jwtAxios.get(
                    `${SERVER_URL}/coupon/user`
                );

                // const response = await axios.get(`${SERVER_URL}/coupon/user`);
                const data = response.data;

                // console.log(data);

                if (Array.isArray(data)) {
                    setCoupons(data);
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDrawItems();
    }, []);

    return { coupons, loading, error };
};

export default useUserCoupon;
