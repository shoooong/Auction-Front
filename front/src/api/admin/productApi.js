import jwtAxios from "utils/jwtUtil";

export const CLOUD_STORAGE_BASE_URL =
  "https://kr.object.ncloudstorage.com/push/shooong/products/";

// 상품 대분류 및 소분류별 조회
export const getProductsByDepartment = async (
  mainDepartment,
  subDepartment = null,
  page,
  pageSize
) => {
  // 페이지네이션 및 소분류 파라미터를 설정
  const params = {
    page,
    size: pageSize,
  };

  // 소분류가 있을 경우 파라미터에 추가
  if (subDepartment) {
    params.subDepartment = subDepartment;
  }

  // 디버깅 로그
  console.log(mainDepartment, subDepartment);

  // 요청 전송
  const res = await jwtAxios.get(`/admin/products/${mainDepartment}`, {
    params,
  });

  // 결과 반환
  return res.data;
};
// 상품 상세 조회
export const getProduct = async (modelNum, productSize = null) => {
  const params = productSize ? { productSize } : {};
  const res = await jwtAxios.get(`/admin/products/detailed/${modelNum}`, {
    params,
  });
  console.log("Product detail API response:", res.data); // 디버깅 로그 추가

  console.log(res.data);

  return res.data;
};

// 검수 상품 승인
export const acceptProduct = async (salesBiddingId) => {
  try {
    const res = await jwtAxios.post(`/admin/sales/${salesBiddingId}/approve`);
    return res.data;
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;
  }
};
