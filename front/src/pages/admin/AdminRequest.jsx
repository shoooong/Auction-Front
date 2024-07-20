import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { getRequests } from "api/admin/requestApi";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "pages/user/cookieUtil";
import CommonList from "./layout/CommonList";

const ApproveCell = ({ productStatus }) => (
  <Button variant="contained" color="primary" size="small">
    {productStatus === "REQUEST" ? "요청" : "승인"}
  </Button>
);

const AdminRequest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRequests();
      setProducts(data.products || []);
      console.log("API Response:", data.products);
    } catch (error) {
      console.error("Error fetching data", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = getCookie("user");

      if (!userInfo || !userInfo.accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/admin/login");
        return;
      }
      fetchRequests();
    };
    fetchData();
  }, [navigate, fetchRequests]);

  const columns = [
    {
      field: "indexId",
      headerName: "번호",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "상품명",
      width: 150,
      headerAlign: "center",
      align: "left",
      flex: 1,
    },
    {
      field: "productBrand",
      headerName: "브랜드",
      width: 150,
      headerAlign: "center",
      align: "left",
      flex: 1,
    },
    {
      field: "modelNum",
      headerName: "모델명",
      width: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "productStatus",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ApproveCell productStatus={params.row.productStatus} />
      ),
    },
  ];

  const rows = products.map((product, index) => ({
    id: product.productId,
    indexId: index + 1,
    productName: product.productName,
    productBrand: product.productBrand,
    modelNum: product.modelNum,
    productStatus: product.productStatus,
  }));

  const handleRowClick = useCallback(
    (row) => {
      navigate(`/admin/request/${row.id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h6" color="error">
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="column-direction admin-content-container">
      <div className="admin-title-box">
        <p className="admin-main-title">요청 상품 관리</p>
      </div>
      <CommonList rows={rows} columns={columns} onRowClick={handleRowClick} />
      <Outlet context={{ fetchRequests }} />
    </Box>
  );
};

export default AdminRequest;
