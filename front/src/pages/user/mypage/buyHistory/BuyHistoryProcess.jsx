import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBuyHistoryProcess, cancelBuyingBidding } from "api/user/mypageApi";
import { formatPrice, getStatusText } from "pages/user/mypageUtil";
import { Button } from "@mui/material";

import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

export default function BuyHistoryProcess() {
    const [buyHistory, setBuyHistory] = useState(null);
    const [snackbar, setSnackbar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBuyHistoryProcess();
                setBuyHistory(response);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    const cancelBidding = async (buyingBiddingId) => {
        try {
            await cancelBuyingBidding(buyingBiddingId);
            setBuyHistory(buyHistory.filter(buy => buy.buyingBiddingId !== buyingBiddingId));
            setSnackbar(true);
            setTimeout(() => setSnackbar(false), 3000);
        } catch (error) {
            console.error('Failed to cancel bidding', error);
            alert('입찰 취소에 실패했습니다.');
        }
    };

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
                        <p>{formatPrice(buy.buyingBiddingPrice)}원</p>
                        <p>{getStatusText(buy.biddingStatus)}</p>
                        <button className="bidding-cancel-btn" onClick={() => cancelBidding(buy.buyingBiddingId)}>입찰 취소</button>
                    </div>
                ))
            ) : (
                <p className="non-history">구매 내역이 없습니다.</p>
            )}

            {snackbar && (
                <div className="snackbar">
                    <div className="space-between">
                        <div className="align-center">
                            <span>구매 입찰이 취소되었습니다.</span>
                        </div>
                        <Button onClick={() => navigate('/mypage/buyingHistory')}>확인</Button>
                    </div>
                </div>
            )}
        </div>
    );
}