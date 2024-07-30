import jwtAxios from "utils/jwtUtil";

//사용자 판매정산 내역 조회
export const getSales = async (page) => {
  const sort = "orderDate,asc";
  const res = await jwtAxios.get(
    `/mypage/account/sales/user?page=${page}&size=4&sort=${sort}`
  );
  return res.data;
};
