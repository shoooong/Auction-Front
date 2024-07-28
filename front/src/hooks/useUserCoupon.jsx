import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwtAxios from "utils/jwtUtil";
import { getCookie } from "utils/cookieUtil";


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

            try {
                const response = await jwtAxios.get(`/coupon/user`);

                const data = response.data;

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
