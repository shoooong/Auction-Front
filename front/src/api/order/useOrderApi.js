import jwtAxios from "utils/jwtUtil";

export const Product = async (data) => {
    const res = await jwtAxios.get("/order/productOne", {
        params: {
            produdctId: data.produdctId, // 쿼리 파라미터 추가
        },
    });
    return res.data;
};

export const Order = async (orderId) => {
    const res = await jwtAxios.get("/order/orderOne", {
        params: {
            orderId: orderId, // 쿼리 파라미터 추가
        },
    });
    return res.data;
};

export const BuyingBidding = async (data) => {
    const res = await jwtAxios.get("/order/buy", {
        params: {
            buyingBiddingId: data.buyingBiddingId, // 쿼리 파라미터 추가
        },
    });
    return res.data;
};

export const SalesBidding = async (data) => {
    const res = await jwtAxios.get("/order/sales", {
        params: {
            SalesBiddingId: data.SalesBiddingId, // 쿼리 파라미터 추가
        },
    });
    return res.data;
};

export const DefaultAddress = async (data) => {
    const res = await jwtAxios.get(`/order/addr`);
    return res.data;
};

export const AcoountAddress = async (data) => {
    const res = await jwtAxios.get(`/mypage/account`);
    return res.data;
};
