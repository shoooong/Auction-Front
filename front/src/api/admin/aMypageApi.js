import { SERVER_URL } from "api/serverApi";
import axios from "axios";
import jwtAxios from "pages/user/jwtUtil";

//사용자 판매정산 내역 조회
export const getSales = async (page) => {
  const res = await jwtAxios.get(
    `${SERVER_URL}/mypage/account/sales/user?page=${page}&size=4&sort=orderDate,desc`
  );
  return res.data;
};
