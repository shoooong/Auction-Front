import axios from "axios";

export const SERVER_URL = "http://localhost:8080";
export const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRPaC9WLjI1YUZ4QjZVYUhKdmdMNE11TGNjbmpab1ZmYXhGYVo1VDdBbkw1U0poNWtHSFV3bSIsInJvbGUiOnRydWUsInNvY2lhbCI6ZmFsc2UsImdyYWRlIjowLCJ1c2VySWQiOjcsImVtYWlsIjoic3VlQG5hdmVyLmNvbSIsImlhdCI6MTcyMDUxMjg5MywiZXhwIjoxNzIwNTE0NjkzfQ.Rm_1K6ozZpnVDbCSCb1s96_OosshL2s_x_dQ2JP9IVE";

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
