import { useState, useEffect } from "react";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

const useCouponEvent = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrawItems = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/coupon/time-attack`
                );
                const data = response.data;

                console.log(data);

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

export default useCouponEvent;
