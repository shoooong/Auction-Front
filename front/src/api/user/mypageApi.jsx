import { SERVER_URL } from "../serverApi";
import jwtAxios from "pages/user/jwtUtil";

export const getMypageData = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage`);
        return res.data;
    } catch (error) {
        console.error('getMypageData error...', error);
        throw error;
    }
};

export const getBuyHistory = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage/buyHistory`);
        return res.data;
    } catch (error) {
        console.error('getBuyHistory error...', error);
        throw error;
    }
};

export const getSaleHistory = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage/saleHistory`);
        return res.data;
    } catch (error) {
        console.error('getSaleHistory error...', error);
        throw error;
    }
};