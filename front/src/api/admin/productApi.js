import axios from "axios";

export const SERVER_URL = "http://localhost:8080";
export const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRPaC9WLjI1YUZ4QjZVYUhKdmdMNE11TGNjbmpab1ZmYXhGYVo1VDdBbkw1U0poNWtHSFV3bSIsInJvbGUiOnRydWUsInNvY2lhbCI6ZmFsc2UsImdyYWRlIjowLCJ1c2VySWQiOjcsImVtYWlsIjoic3VlQG5hdmVyLmNvbSIsImlhdCI6MTcyMDUzMjY2MiwiZXhwIjoxNzIwNTM0NDYyfQ.7KvsW1gLUCVBCNT0sX83csGXhBkcAqODU2wDWf_r4mU";

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
