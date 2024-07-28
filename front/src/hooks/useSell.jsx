import React, { useState, useEffect } from "react";

import jwtAxios from "utils/jwtUtil";

export default function useSell() {
    // 상태 정의

    const [salesBidding, setSalesBidding] = useState(null);
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
                const salesBiddingResponse = await jwtAxios.get(
                    `/order/sales`,
                    {
                        params: {
                            salesBiddingId: 180,
                        },
                    }
                );

                const addressInfoResponse = await jwtAxios.get(`/order/addr`);

                setSalesBidding(salesBiddingResponse.data);
                setAddressInfo(addressInfoResponse.data);

                console.log(salesBidding);
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

    return { salesBidding, addressInfo };
}
