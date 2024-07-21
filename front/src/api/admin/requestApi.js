import { SERVER_URL } from "api/serverApi";
import axios from "axios";
import jwtAxios from "pages/user/jwtUtil";

// 관리자 페이지 요청상품 전체 조회
export const getRequests = async () => {
  const res = await jwtAxios.get(`${SERVER_URL}/admin/requests`);
  return res.data;
};

// 관리자 페이지 요청상품 상세 조회
export const getRequest = async (productId) => {
  const res = await jwtAxios.get(`${SERVER_URL}/admin/requests/${productId}`);
  return res.data;
};

//관리자 페이지 요청상품 판매 승인으로 변경
//요청상품 판매상품으로 등록
export const acceptRequest = async (productId) => {
  const res = await jwtAxios.put(`${SERVER_URL}/admin/requests/${productId}`);
  return res.data;
};

// 요청상품 기존상품에 등록되어 있을시 삭제
export const rejectRequest = async (productId) => {
  const res = await axios.delete(`${SERVER_URL}/admin/requests/${productId}`);
  return res.data;
};
