import axios from "axios";
import { SERVER_URL } from "./serverApi";

import jwtAxios from "utils/jwtUtil";

export const getLuckyDraw = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/luckydraw`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getLuckyDrawDetail = async (luckyId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/luckydraw/${luckyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const enterLuckyDraw = async (luckyId) => {
    try {
        const response = await jwtAxios.post(`/luckydraw/${luckyId}/enter`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


