import axios from "axios";
import { SERVER_URL } from "api/serverApi";
export const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRydmIueUhxakJEaEFTd3IwaHFBNTV1R1VFQzZ5Z1JidkRWUzZUekVGaFZWaGZUT2ZjMGhxSyIsInJvbGUiOnRydWUsInNvY2lhbCI6ZmFsc2UsImdyYWRlIjowLCJ1c2VySWQiOjEsImVtYWlsIjoic3VlQG5hdmVyLmNvbSIsImlhdCI6MTcyMDU5NDE0NywiZXhwIjoxNzIwNTk1OTQ3fQ.JEu4qkxe4rWko1fq3Yu8Co5HWd63ExF1ipFF1PbmUac";

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/admin`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// 관리자 페이지 요청상품 전체 조회
export const getLuckys = async (luckyProcessStatus) => {
  const params = luckyProcessStatus ? { luckyProcessStatus } : {};

  const res = await axiosInstance.get("/luckyList", { params });
  return res.data;
};

// 관리자 페이지 럭키 드로우 상품폼등록
export const createLucky = async (newLuckyDraw) => {
  const response = await axiosInstance.post("/luckydraw/insert", newLuckyDraw);
  return response.data;
};
