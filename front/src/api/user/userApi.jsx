import axios from "axios";
import { SERVER_URL } from "../serverApi";
import jwtAxios from "../../pages/user/jwtUtil";

const host = `${SERVER_URL}`;

export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "x-www-form-urlencoded"}};

    const form = new FormData();
    form.append('username', loginParam.email);
    form.append('password', loginParam.password);

    try {
        const res = await axios.post(`${host}/user/login`, form, header);

        return res.data;
    } catch (error) {
        console.error('axios login error...', error)
        
        throw error;
    }
};

export const modifyUser = async (user) => {
    try {
        const res = await jwtAxios.put(`${host}/mypage/modify`, user);
    
        return res.data;
    } catch (error) {
        console.error('jwtAxios modify error...', error)
        
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${host}/user/register`, userData);
        return res.data;
    } catch (error) {
        console.error('axios register error...', error);
        throw error;
    }
};