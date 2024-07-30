import { useEffect, useState } from "react";

import { CLOUD_STORAGE_BASE_URL } from "api/admin/productApi";
import { getSales } from "api/admin/aMypageApi";

import { Pagination } from "@mui/material";

import "styles/sales.css";


const SalesSummary = () => {
  const [sales, setSales] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1); // 페이지 번호를 1로 초기화
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // 상품 리스트 다운
  const fetchData = async (page) => {
    // setLoading(true);
    try {
      const data = await getSales(page - 1); // 페이지 번호를 0부터 시작하는 것으로 맞춤
      const newSales = data.salesSummaryList.content;
      const totalPrice = data.totalSalesPrice;
      const totalCount = data.totalSalesCount;
      setSales(newSales); // 현재 페이지 데이터로 상태 업데이트
      setTotalPrice(totalPrice);
      setTotalCount(totalCount);
      setTotalPages(data.salesSummaryList.page.totalPages); // 전체 페이지 수 설정
    } catch (error) {
      console.error("Error fetching products:", error);
      setSales([]); // 에러 발생 시 빈 배열로 설정
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 번호 업데이트
  };

  return (
    <div className="sales-summary-container">
      <div className="sales-head">
        <div className="head-content">
          <div>총 판매 금액: {totalPrice?.toLocaleString()}원</div>
          <div>총 판매 수량: {totalCount?.toLocaleString()}개</div>
        </div>
      </div>

      <ol className="sales-list-container">
        {sales.map((item, index) => (
          <li key={index} className="sales-content">
            <div className="sales-img-container">
              <img
                src={CLOUD_STORAGE_BASE_URL + item.productImg}
                alt={item.productName}
              />
            </div>
            <div className="sales-info-container">
              <div>{item.productName}</div>
              <div>{item.orderPrice?.toLocaleString()}</div>
            </div>
            <div className="sales-date-container">
              <p>{new Date(item.orderDate).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ol>

      {totalPages >= 0 && (
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
          />
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>Loading...</div>
      )}
    </div>
  );
};

export default SalesSummary;
