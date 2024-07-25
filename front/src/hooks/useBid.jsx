import React, { useState, useEffect } from "react";
import jwtAxios from "pages/user/jwtUtil";
import { SERVER_URL } from "api/serverApi";

// 입찰 -> 주문페이지(productId,)
export default function useBid(data) {
    // 상태 정의

    const [product, setProduct] = useState(null);
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
                const productResponse = await jwtAxios.get(
                    `/order/productOne`,
                    {
                        params: {
                            productId: data?.productId,
                        },
                    }
                );

                const addressInfoResponse = await jwtAxios.get(`/order/addr`);

                setProduct(productResponse.data);
                setAddressInfo(addressInfoResponse.data);

                console.log(product);
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

    return { product, addressInfo };
}
