import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtAxios from "pages/user/jwtUtil";
import { SERVER_URL } from "api/serverApi";

export default function useOrder() {
    // 상태 정의

    const [buyingBidding, setBuyingBidding] = useState(null);
    const [addressInfo, setAddressInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect 훅을 사용해 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 상품 정보와 배송지 정보 가져오기
                const buyingBiddingResponse = await jwtAxios.get(
                    `${SERVER_URL}/order/buy`,
                    {
                        params: {
                            buyingBiddingId: 1,
                        },
                    }
                );

                const addressInfoResponse = await jwtAxios.get(
                    `${SERVER_URL}/order/addr`
                );

                setBuyingBidding(buyingBiddingResponse.data);
                setAddressInfo(addressInfoResponse.data);

                console.log(buyingBidding);
                console.log(addressInfo);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // 로딩 상태 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러 처리
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return { buyingBidding, addressInfo };
}
