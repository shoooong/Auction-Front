import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSaleHistory } from "api/user/mypageApi";
import { getCookie } from "pages/user/cookieUtil";

import photo from "assets/images/myson.jpg";

export default function SaleHistory() {
    const [saleHistory, setSaleHistory] = useState(null);
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
                const response = await getSaleHistory();
                setSaleHistory(response);
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
        <div>
            <div className="history-title">
                <h2 className="title">판매 내역</h2>
            </div>
            <div>
                <div className="sale-summary">
                    <div>전체 <span>{saleHistory.allCount}</span></div>
                    <div>검수 중 <span>{saleHistory.inspectionCount}</span></div>
                    <div>진행 중 <span>{saleHistory.processCount}</span></div>
                    <div>종료 <span>{saleHistory.completeCount}</span></div>
                </div>
                {saleHistory.saleDetails.length > 0 ? (
                    saleHistory.saleDetails.map((sale, index) => (
                        <div className="sale-item" key={index}>
                            <img src={photo} alt="이앤톤" />
                            <div>
                                <p>{sale.productName}</p>
                                <p>{sale.productSize}</p>
                            </div>
                            <p>{formatPrice(sale.saleBiddingPrice)}원</p>
                            <p>{sale.salesStatus}</p>
                        </div>
                    ))
                ) : (
                    <p className="non-history">판매 내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
}