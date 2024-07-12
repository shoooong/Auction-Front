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

export const getBookmarkProducts = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage/bookmark/product`);
        return res.data;
    } catch (error) {
        console.error('getBookmarkProducts error...', error);
        throw error;
    }
}

export const getDrawHistory = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage/drawHistory`);
        return res.data;
    } catch (error) {
        console.error('getDrawHistory error...', error);
        throw error;
    }
}

export const getAccount = async () => {
    try {
        const res = await jwtAxios.get(`${SERVER_URL}/mypage/account`);
        return res.data;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

export const registerOrModifyAccount = async (account) => {
    try {
        const res = await jwtAxios.post(`${SERVER_URL}/mypage/account`, account);
        return res.data;
    } catch (error) {
        console.error('Error registering or modifying account:', error);
        throw error;
    }
};


export const getAddress = async () => {
    try {
        const response = await jwtAxios.get(`${SERVER_URL}/mypage/address`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address data:', error);
        throw error;
    }
};

export const addAddress = async (addressData) => {
    try {
        const response = await jwtAxios.post(`${SERVER_URL}/mypage/address`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error adding address data:', error);
        throw error;
    }
};

export const modifyAddress = async (addressData, addressId) => {
    try {
        const response = await jwtAxios.put(`${SERVER_URL}/mypage/address?addressId=${addressId}`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error modifying address data:', error);
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const response = await jwtAxios.delete(`${SERVER_URL}/mypage/address?addressId=${addressId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting address data:', error);
        throw error;
    }
};