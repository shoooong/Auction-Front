import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";
import { getSaleHistory } from "api/user/mypageApi";
import { getCookie } from "pages/user/cookieUtil";
import { formatPrice, getStatusText } from "pages/user/mypageUtil";

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

    

    const getStatusCount = (status) => {
        const statusCount = saleHistory.salesStatusCounts.find(count => count.salesStatus === status);
        return statusCount ? statusCount.count : 0;
    };

    const filterSaleDetailsByStatus = (status) => {
        return saleHistory.saleDetails.filter(sale => sale.salesStatus === status);
    };

    const renderSaleDetails = (saleDetails) => {
        return saleDetails.length > 0 ? (
            saleDetails.map((sale, index) => (
                <div className="sale-item" key={index}>
                    {/* <img src={sale.productImg} alt={sale.productName} /> */}
                    <img src={photo} alt="이앤톤" />
                    <div>
                        <p>{sale.productName}</p>
                        <p>{sale.productSize}</p>
                    </div>
                    <p>{formatPrice(sale.saleBiddingPrice)}원</p>
                    <p>{getStatusText(sale.salesStatus)}</p>
                </div>
            ))
        ) : (
            <p className="non-history">판매 내역이 없습니다.</p>
        );
    };

    



    return (
        <div>
            <div className="history-title">
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
                    <TabPanel value={3}>{renderSaleDetails(filterSaleDetailsByStatus('PROCESS'))}</TabPanel>
                    <TabPanel value={4}>{renderSaleDetails(filterSaleDetailsByStatus('COMPLETE'))}</TabPanel>
                </Tabs>
            </div>
        </div>
    );
}