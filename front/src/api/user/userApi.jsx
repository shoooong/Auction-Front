import axios from "axios";
import { SERVER_URL } from "../serverApi";

const host = `${SERVER_URL}/user`;

export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "x-www-form-urlencoded"}};

    const form = new FormData();
    form.append('username', loginParam.email);
    form.append('password', loginParam.password);

    const res = await axios.post(`${host}/login`, form, header);

    return res.data;
};