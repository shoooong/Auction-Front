import { SERVER_URL } from "api/serverApi";
import jwtAxios from "pages/user/jwtUtil";

// 상품 대분류 및 소분류별 조회
export const getProductsByDepartment = async (
  mainDepartment,
  subDepartment = null
) => {
  const params = subDepartment ? { subDepartment } : {};
  console.log(mainDepartment, subDepartment);
  const res = await jwtAxios.get(
    `${SERVER_URL}/admin/products/${mainDepartment}`,
    {
      params,
    }
  );
  return res.data;
};

// 상품 상세 조회
export const getProduct = async (modelNum, productSize = null) => {
  const params = productSize ? { productSize } : {};
  const res = await jwtAxios.get(
    `${SERVER_URL}/admin/products/detailed/${modelNum}`,
    {
      params,
    }
  );
  console.log(res.data);

  return res.data;
};

// 검수 상품 승인
export const acceptProduct = async (salesBiddingId) => {
  try {
    const res = await jwtAxios.post(
      `${SERVER_URL}/admin/sales/${salesBiddingId}/approve`
    );
    return res.data;
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;
  }
};
