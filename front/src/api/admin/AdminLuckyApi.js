import { SERVER_URL } from "api/serverApi";
import jwtAxios from "pages/user/jwtUtil";

const CLOUD_STORAGE_BASE_URL =
  "https://kr.object.ncloudstorage.com/push/shooong/luckydraw";

// 관리자 페이지 요청상품 전체 조회
export const getLuckys = async (luckyProcessStatus) => {
  const params = luckyProcessStatus ? { luckyProcessStatus } : {};

  const res = await jwtAxios.get(`${SERVER_URL}/admin/luckyList`, { params });
  return res.data;
};

// 관리자 페이지 럭키 드로우 상품폼등록
export const createLucky = async (newLuckyDraw) => {
  const response = await jwtAxios.post(
    `${SERVER_URL}/admin/luckydraw/insert`,
    newLuckyDraw,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
