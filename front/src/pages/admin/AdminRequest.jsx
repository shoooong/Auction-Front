import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getRequests } from "api/admin/requestApi";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "pages/user/cookieUtil";

const AdminRequest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = getCookie("user");

      if (!userInfo || !userInfo.accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/admin");
        return;
      }
      try {
      } catch (error) {}
    };
    fetchData();
  }, [navigate]);

  const fetchRequests = async () => {
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
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderStatusCell = (params) => (
    <span style={{ color: params.value === "REQUEST" ? "blue" : "green" }}>
      {params.value === "REQUEST" ? "요청" : "승인"}
    </span>
  );

  const renderApproveCell = (params) => (
    <Button variant="contained" color="primary" size="small">
      {params.row.productStatus === "REQUEST" ? "요청" : "승인"}
    </Button>
  );

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
      headerName: "제목",
      width: 150,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "productBrand",
      headerName: "브랜드",
      width: 150,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "productStatus",
      headerName: "상태",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: renderStatusCell,
    },
    {
      field: "approve",
      headerName: "승인여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: renderApproveCell,
    },
  ];

  const rows = products.map((product, index) => ({
    id: product.productId,
    indexId: index + 1,
    productName: product.productName,
    productBrand: product.productBrand,
    productStatus: product.productStatus,
  }));

  const handleRowClick = (params) => {
    navigate(`/admin/request/${params.id}`);
  };

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
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        요청 상품 관리
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnMenu
          onRowClick={handleRowClick}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f2f2f2",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
          }}
        />
        <Outlet context={{ fetchRequests }} />
      </Box>
    </Box>
  );
};

export default AdminRequest;
