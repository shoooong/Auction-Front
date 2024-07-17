import axios from "axios";
import { SERVER_URL } from '../../api/serverApi';

export const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRydmIueUhxakJEaEFTd3IwaHFBNTV1R1VFQzZ5Z1JidkRWUzZUekVGaFZWaGZUT2ZjMGhxSyIsInJvbGUiOnRydWUsInNvY2lhbCI6ZmFsc2UsImdyYWRlIjowLCJ1c2VySWQiOjEsImVtYWlsIjoic3VlQG5hdmVyLmNvbSIsImlhdCI6MTcyMDU5NDE0NywiZXhwIjoxNzIwNTk1OTQ3fQ.JEu4qkxe4rWko1fq3Yu8Co5HWd63ExF1ipFF1PbmUac";

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/admin`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// 상품 대분류 및 소분류별 조회
export const getProductsByDepartment = async (
  mainDepartment,
  subDepartment = null
) => {
  const params = subDepartment ? { subDepartment } : {};
  const res = await axiosInstance.get(`/products/${mainDepartment}`, {
    params,
  });
  return res.data;
};

// 상품 상세 조회
export const getProduct = async (modelNum, productSize = null) => {
  const params = productSize ? { productSize } : {};
  const res = await axiosInstance.get(`/products/detailed/${modelNum}`, {
    params,
  });
  console.log(res.data);

  return res.data;
};

// 검수 상품 승인
export const acceptProduct = async (salesBiddingId) => {
  try {
    const res = await axiosInstance.post(`/sales/${salesBiddingId}/approve`);
    return res.data;
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;
  }
};
