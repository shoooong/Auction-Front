import jwtAxios from "pages/user/jwtUtil";

export const getMypageData = async () => {
    try {
        const res = await jwtAxios.get('/mypage');
        return res.data;
    } catch (error) {
        console.error('getMypageData error...', error);
        throw error;
    }
};

export const getAllBuyHistory = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/buyHistory`);
        return res.data;
    } catch (error) {
        console.error('getBuyHistory error...', error);
        throw error;
    }
};
export const getBuyHistoryProcess = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/buyHistory/process`);
        return res.data;
    } catch (error) {
        console.error('getBuyHistory error...', error);
        throw error;
    }
};
export const getBuyHistoryComplete = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/buyHistory/complete`);
        return res.data;
    } catch (error) {
        console.error('getBuyHistory error...', error);
        throw error;
    }
};
export const cancelBuyingBidding = async (buyingBiddingId) => {
    try {
        const res = await jwtAxios.put(`/mypage/buyHistory/process?buyingBiddingId=${buyingBiddingId}`);
        return res.data;
    } catch (error) {
        console.error('cancelBuyingBidding error...', error);
        throw error;
    }
}

export const getSaleHistory = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/saleHistory`);
        return res.data;
    } catch (error) {
        console.error('getSaleHistory error...', error);
        throw error;
    }
};
export const cancelSalesBidding = async (salesBiddingId) => {
    try {
        const res = await jwtAxios.put(`/mypage/saleHistory?salesBiddingId=${salesBiddingId}`);
        return res.data;
    } catch (error) {
        console.error('cancelSalesBidding error...', error);
        throw error;
    }
}

export const getBookmarkProducts = async () => {
    try {
        const res = await jwtAxios.get("/mypage/bookmark/product");
        return res.data;
    } catch (error) {
        console.error('getBookmarkProducts error...', error);
        throw error;
    }
}

export const getDrawHistory = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/drawHistory`);
        return res.data;
    } catch (error) {
        console.error('getDrawHistory error...', error);
        throw error;
    }
}

export const getAccount = async () => {
    try {
        const res = await jwtAxios.get(`/mypage/account`);
        return res.data;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

export const registerOrModifyAccount = async (account) => {
    try {
        const res = await jwtAxios.post(`/mypage/account`, account);
        return res.data;
    } catch (error) {
        console.error('Error registering or modifying account:', error);
        throw error;
    }
};


export const getAddress = async () => {
    try {
        const response = await jwtAxios.get(`/mypage/address`);
        return response.data;
    } catch (error) {
        console.error('Error fetching address data:', error);
        throw error;
    }
};

export const addAddress = async (addressData) => {
    try {
        const response = await jwtAxios.post(`/mypage/address`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error adding address data:', error);
        throw error;
    }
};

export const modifyAddress = async (addressData, addressId) => {
    try {
        const response = await jwtAxios.put(`/mypage/address?addressId=${addressId}`, addressData);
        return response.data;
    } catch (error) {
        console.error('Error modifying address data:', error);
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const response = await jwtAxios.delete(`/mypage/address?addressId=${addressId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting address data:', error);
        throw error;
    }
};