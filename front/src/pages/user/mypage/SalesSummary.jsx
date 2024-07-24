import { getSales } from "api/admin/aMypageApi";
import { useEffect, useState } from "react";
import "styles/sales.css";

const SalesSummary = () => {
  const [sales, setSales] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // 상품 리스트 다운
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const data = await getSales(page);
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

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="column-direction">
      <div>
        <div className="purchase-head">
          <div className="head-product">
            <div>Total Sales Price: {totalPrice}</div>
            <div>Total Sales Count: {totalCount}</div>
          </div>
        </div>

        <div className="column-direction">
          {sales.map((item, index) => (
            <div key={index} className="purchase-content">
              <div>{item.productImg}</div>
              <div>
                <div>{item.productName}</div>
                <div>{item.orderPrice}</div>
              </div>
              <div>{new Date(item.orderDate).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            Loading...
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
      {totalPages > 1 && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          Page {page + 1} of {totalPages}
        </div>
      )}
    </div>
  );
};

export default SalesSummary;
