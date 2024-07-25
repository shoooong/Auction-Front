import { PanoramaSharp } from "@mui/icons-material";
import { SERVER_URL } from "api/serverApi";
import axios from "axios";
import jwtAxios from "pages/user/jwtUtil";

// 관리자 페이지 요청상품 전체 조회
export const getRequests = async (page, size) => {
  const res = await jwtAxios.get(`/admin/requests`, {
    params: {
      page,
      size,
    },
  });
  return res.data;
};

// 관리자 페이지 요청상품 상세 조회
export const getRequest = async (productId) => {
  const res = await jwtAxios.get(`/admin/requests/${productId}`);
  return res.data;
};

//관리자 페이지 요청상품 판매 승인으로 변경
//요청상품 판매상품으로 등록
export const acceptRequest = async (productId, formData) => {
  try {
    const res = await jwtAxios.put(`/admin/requests/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(
      "Error modifying request:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 요청상품 기존상품에 등록되어 있을시 삭제
export const rejectRequest = async (productId) => {
  const res = await jwtAxios.post(`/admin/requests/${productId}`);
  return res.data;
};
