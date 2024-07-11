import axios from "axios";
import { SERVER_URL } from "./serverApi";
import jwtAxios from "pages/user/jwtUtil";

export const getLuckyDraw = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/luckydraw`);
        return res.data;
    } catch (error) {
        throw new Error("Unexpected response format");
    }
};

export const getLuckyDrawDetail = async (luckyId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/luckydraw/${luckyId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch lucky draw detail: ${error.message}`);
    }
};

export const enterLuckyDraw = async (luckyId) => {
    try {
        const response = await jwtAxios.post(`${SERVER_URL}/luckydraw/${luckyId}/enter`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error);
    }
};


