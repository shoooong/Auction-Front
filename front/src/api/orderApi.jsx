import axios from "axios";
import { SERVER_URL } from "./serverApi";
import jwtAxios from "pages/user/jwtUtil";

export const getAddressInfo = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/api/order/addr`);
        return res.data;
    } catch (error) {
        throw new Error("Unexpected response format");
    }
};

export const getBuyingBidding = async (buyingBiddingId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/order/buy`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed  ${error.message}`);
    }
};

// export const enterLuckyDraw = async (luckyId) => {
//     try {
//         const response = await jwtAxios.post(
//             `${SERVER_URL}/luckydraw/${luckyId}/enter`
//         );
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.error);
//     }
// };
