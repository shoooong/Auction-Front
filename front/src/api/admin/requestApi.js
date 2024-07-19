import { SERVER_URL } from "api/serverApi";
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
