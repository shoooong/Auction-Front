import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";
import { getCookie } from "pages/user/cookieUtil";
import { useNavigate } from "react-router-dom";
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
                const response = await axios.get(`${SERVER_URL}/mypage/saleHistory`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    }
                });
                setSaleHistory(response.data);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
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
                <p>판매 내역</p>
            </div>
            <div>
                <div className="sale-summary">
                    <div>전체 <span>{saleHistory.allCount}</span></div>
                    <div>검수 중 <span>{saleHistory.inspectionCount}</span></div>
                    <div>진행 중 <span>{saleHistory.processCount}</span></div>
                    <div>종료 <span>{saleHistory.completeCount}</span></div>
                </div>
                {saleHistory.saleDetails.length > 0 ? (
                    saleHistory.saleDetails.map(sale => (
                        <div className="sale-item" key={sale.productId}>
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