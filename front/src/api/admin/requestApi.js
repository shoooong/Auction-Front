import axios from "axios";
import { SERVER_URL } from "api/serverApi";
export const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRydmIueUhxakJEaEFTd3IwaHFBNTV1R1VFQzZ5Z1JidkRWUzZUekVGaFZWaGZUT2ZjMGhxSyIsInJvbGUiOnRydWUsInNvY2lhbCI6ZmFsc2UsImdyYWRlIjowLCJ1c2VySWQiOjEsImVtYWlsIjoic3VlQG5hdmVyLmNvbSIsImlhdCI6MTcyMDU5NDE0NywiZXhwIjoxNzIwNTk1OTQ3fQ.JEu4qkxe4rWko1fq3Yu8Co5HWd63ExF1ipFF1PbmUac";

const prefix = `${SERVER_URL}/admin`;

const axiosInstance = axios.create({
  baseURL: prefix,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// 관리자 페이지 요청상품 전체 조회
export const getRequests = async () => {
  const res = await axiosInstance.get("/requests");
  return res.data;
};

// 관리자 페이지 요청상품 상세 조회
export const getRequest = async (productId) => {
  const res = await axiosInstance.get(`/requests/${productId}`);
  return res.data;
};

//관리자 페이지 요청상품 판매 승인으로 변경
//요청상품 판매상품으로 등록
export const acceptRequest = async (productId) => {
  const res = await axiosInstance.put(`/requests/${productId}`);
  return res.data;
};
