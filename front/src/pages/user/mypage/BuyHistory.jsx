import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBuyHistory } from "api/user/mypageApi";
import { getCookie } from "pages/user/cookieUtil";

import photo from "assets/images/myson.jpg";

export default function BuyHistory() {
    const [buyHistory, setBuyHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = getCookie("user");

            if (!userInfo || !userInfo.accessToken) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            try {
                const response = await getBuyHistory();
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    return (
        <div className="data-container">
            <div className="history-title">
                <p>구매 내역</p>
            </div>
            <div>
                <div className="buy-summary">
                    <div>전체 <span>{buyHistory.allCount}</span></div>
                    <div>입찰 중 <span>{buyHistory.processCount}</span></div>
                    <div>종료 <span>{buyHistory.completeCount}</span></div>
                </div>
                {buyHistory.orderDetails.length > 0 ? (
                    buyHistory.orderDetails.map(order => (
                        <div className="buy-item" key={order.productId}>
                            <img src={photo} alt="이앤톤" />
                            <div>
                                <p>{order.productName}</p>
                                <p>{order.productSize}</p>
                            </div>
                            <p>{formatPrice(order.orderPrice)}원</p>
                            <p>{order.orderStatus}</p>
                        </div>
                    ))
                ) : (
                    <p className="non-history">구매 내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
}