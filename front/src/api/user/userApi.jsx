import axios from "axios";
import { SERVER_URL } from "../serverApi";
import jwtAxios from "pages/user/jwtUtil";
import { getCookie } from "pages/user/cookieUtil";


export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  try {
    const res = await axios.post(`${SERVER_URL}/user/login`, form, header);
    return res.data;
  } catch (error) {
    console.error("axios login error...", error);
    throw error;
  }
};

export const logoutPost = async () => {
  const userInfo = getCookie("user");
  const header = { headers: { "Authorization": `Bearer ${userInfo.accessToken}` } };

  try {
    const res = await axios.post(`${SERVER_URL}/user/logout`, null, header);
    console.log("Logout Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("axios logout error...", error);
    throw error;
  }
};

export const unregisterUser = async () => {
  try {
    const res = await jwtAxios.post(`${SERVER_URL}/user/unregister`);
    console.log("Unregister Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("axios unregister error...", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await jwtAxios.get(`/mypage/modify`);
    return res.data;
  } catch (error) {
    console.error("axios getUser error...", error);
    throw error;
  }
};

export const modifyUser = async (user, file) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const formData = new FormData();
  formData.append('userModifyDTO', new Blob([JSON.stringify(user)], {type: "application/json"}));
  formData.append('file', file);

  try {
    const res = await jwtAxios.put(`/mypage/modify`, formData, header);
    return res.data;
  } catch (error) {
    console.error("jwtAxios modify error…", error);
    throw error;
  }
};

export const registerUser = async (userData, file) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const formData = new FormData();
  formData.append('userRegisterDTO', new Blob([JSON.stringify(userData)], {type: "application/json"}));
  formData.append('file', file);

  try {
    const res = await axios.post(`${SERVER_URL}/user/register`, formData, header);
    return res.data;
  } catch (error) {
    console.error("axios register error...", error);
    throw error;
  }
};

export const registerAdmin = async (userData, file) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const formData = new FormData();
  formData.append('userRegisterDTO', new Blob([JSON.stringify(userData)], {type: "application/json"}));
  formData.append('file', file);

  try {
    const res = await axios.post(`${SERVER_URL}/user/register/admin`, formData, header);
    return res.data;
  } catch (error) {
    console.error("axios register error...", error);
    throw error;
  }
};
