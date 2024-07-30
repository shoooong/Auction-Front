import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";
import { getSaleHistory, cancelSalesBidding } from "api/user/mypageApi";

import { getCookie } from "utils/cookieUtil";
import { formatPrice, getStatusText } from "utils/mypageUtil";

import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";
import { Button } from "@mui/material";

export default function SaleHistory() {
    const [saleHistory, setSaleHistory] = useState(null);
    const [snackbar, setSnackbar] = useState(false);
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

    useEffect(() => {
        let timer;
        if (snackbar) {
            timer = setTimeout(() => {
                setSnackbar(false);
                window.location.reload()
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [snackbar, navigate]);

    const cancelBidding = async (salesBiddingId) => {
        try {
            await cancelSalesBidding(salesBiddingId);
            setSaleHistory(prevHistory => ({
                ...prevHistory,
                saleDetails: prevHistory.saleDetails.map(sale => 
                    sale.salesBiddingId === salesBiddingId ? { ...sale, salesStatus: 'CANCEL' } : sale
                )
            }));
            setSnackbar(true);
        } catch (error) {
            console.error('Failed to cancel bidding', error);
            alert('입찰 취소에 실패했습니다.');
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    

    const getStatusCount = (status) => {
        const statusCount = saleHistory.salesStatusCounts.find(count => count.salesStatus === status);
        return statusCount ? statusCount.count : 0;
    };

    const filterSaleDetailsByStatus = (status) => {
        return saleHistory.saleDetails.filter(sale => sale.salesStatus === status);
    };

    const renderSaleDetails = (saleDetails, showCancelButton = false) => {
        return saleDetails.length > 0 ? (
            saleDetails.map((sale, index) => (
                <div className="sale-item" key={index}>
                    <img src={`${CLOUD_STORAGE_BASE_URL}/products/${sale.productImg}`} alt={sale.productName} />
                    <div>
                        <p>{sale.productName}</p>
                        <p>{sale.productSize}</p>
                    </div>
                    <p>{formatPrice(sale.saleBiddingPrice)}원</p>
                    <p>{getStatusText(sale.salesStatus)}</p>
                    {showCancelButton && (
                        <button className="bidding-cancel-btn" onClick={() => cancelBidding(sale.salesBiddingId)}>입찰 취소</button>
                    )}
                </div>
            ))
        ) : (
            <p className="non-history">판매 내역이 없습니다.</p>
        );
    };

    



    return (
        <div className="full-container">
            <div className="detail-history-title">
                <h2 className="title">판매 내역</h2>
            </div>

            <div className="mypage-tab buying">
                <Tabs defaultValue={1}>
                    <TabsList>
                        <Tab value={1}>
                            <span>{saleHistory.allCount}</span>
                            <b>전체</b>
                        </Tab>
                        <Tab value={2}>
                            <span>{getStatusCount('INSPECTION')}</span>
                            <b>검수 중</b>
                        </Tab>
                        <Tab value={3}>
                            <span>{getStatusCount('PROCESS')}</span>
                            <b>입찰 중</b>
                        </Tab>
                        <Tab value={4}>
                            <span>{getStatusCount('COMPLETE')}</span>
                            <b>종료</b>
                        </Tab>
                    </TabsList>
                    <TabPanel value={1}>{renderSaleDetails(saleHistory.saleDetails)}</TabPanel>
                    <TabPanel value={2}>{renderSaleDetails(filterSaleDetailsByStatus('INSPECTION'))}</TabPanel>
                    <TabPanel value={3}>{renderSaleDetails(filterSaleDetailsByStatus('PROCESS'), true)}</TabPanel>
                    <TabPanel value={4}>{renderSaleDetails(filterSaleDetailsByStatus('COMPLETE'))}</TabPanel>
                </Tabs>
            </div>

            {snackbar && (
                <div className="snackbar">
                    <div className="space-between">
                        <div className="align-center">
                            <span>판매 입찰이 취소되었습니다.</span>
                        </div>
                        <Button onClick={() => {
                           window.location.reload()
                        }}>확인</Button>
                    </div>
                </div>
            )}
        </div>
    );
}