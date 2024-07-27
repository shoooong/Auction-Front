import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBuyHistoryComplete } from "api/user/mypageApi";
import { formatPrice, getStatusText } from "pages/user/mypageUtil";

import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

export default function BuyHistoryComplete() {
    const [buyHistory, setBuyHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBuyHistoryComplete();
                setBuyHistory(response);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div className="full-container">
           {buyHistory.length > 0 ? (
                buyHistory.map((buy, index) => (
                    <div className="buy-item" key={index}>
                        <img src={`${CLOUD_STORAGE_BASE_URL}/products/${buy.productImg}`} alt={buy.productName} />
                        <div>
                            <p>{buy.productName}</p>
                            <p>{buy.productSize}</p>
                        </div>
                        <p>{formatPrice(buy.orderPrice)}원</p>
                        <p>{getStatusText(buy.biddingStatus)}</p>
                    </div>
                ))
            ) : (
                <p className="non-history">구매 내역이 없습니다.</p>
            )}
        </div>
    );
}