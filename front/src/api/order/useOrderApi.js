import useOrder from "hooks/useOrder";
import jwtAxios from "pages/user/jwtUtil";

const useOrderApi = (data) => {
    const Product = async () => {
        const res = await jwtAxios.get("/order/productOne", {
            params: {
                produdctId: data.produdctId, // 쿼리 파라미터 추가
            },
        });
        return res.data;
    };

    const Order = async () => {
        const res = await jwtAxios.get("/order/order", {
            params: {
                orderId: data.orderId, // 쿼리 파라미터 추가
            },
        });
        return res.data;
    };

    const BuyingBidding = async () => {
        const res = await jwtAxios.get("/order/buy", {
            params: {
                buyingBiddingId: data.buyingBiddingId, // 쿼리 파라미터 추가
            },
        });
        return res.data;
    };

    const SalesBidding = async (page) => {
        const res = await jwtAxios.get("/order/sales", {
            params: {
                SalesBiddingId: data.SalesBiddingId, // 쿼리 파라미터 추가
            },
        });
        return res.data;
    };

    const DefaultAddress = async (page) => {
        const res = await jwtAxios.get(`/order/addr`);
        return res.data;
    };

    const AcoountAddress = async (page) => {
        const res = await jwtAxios.get(`/mypage/account`);
        return res.data;
    };

    return {
        Product,
        Order,
        BuyingBidding,
        SalesBidding,
        DefaultAddress,
        AcoountAddress,
    };
};

export default useOrderApi;
