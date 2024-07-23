import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";

const ProductBid = () => {
    const { modelNum } = useParams();
    const location = useLocation();
    const data = location.state;

    if (!data) {
        return <div>데이터를 불러올 수 없습니다.</div>;
    }

    return (
        <Box className="product-bid-page">
            <Typography variant="h4">{data.productName}</Typography>
            <img src={data.productImg} alt={data.productName} />
            <Typography>모델 번호: {modelNum}</Typography>
            <Typography>사이즈: {data.productSize}</Typography>
            <Typography>가격: {data.biddingPrice} 원</Typography>
            <Typography>사용자 ID: {data.userId}</Typography>

            <Button variant="contained" color="primary" onClick={() => alert(`구매 또는 판매를 진행합니다. 탭: ${data.currentTab}`)}>
                {data.currentTab === 'buy' ? '구매하기' : '판매하기'}
            </Button>
        </Box>
    );
};

export default ProductBid;
