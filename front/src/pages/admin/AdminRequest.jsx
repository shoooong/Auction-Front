import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RequestModal from "./layout/RequestModal";
import { SERVER_URL, ACCESS_TOKEN } from "api/serverApi";

const AdminRequest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/admin/requests`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setProducts(response.data.products || []);
        console.log("API Response:", response.data.products);
      } catch (error) {
        console.error("Error fetching data", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/admin/requests/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product details", error);
      setError(error);
    }
  };

  const columns = [
    {
      field: "id",
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
      renderCell: (params) => (
        <span style={{ color: params.value === "REQUEST" ? "blue" : "green" }}>
          {params.value === "REQUEST" ? "요청" : "승인"}
        </span>
      ),
    },
    {
      field: "approve",
      headerName: "승인여부",
      flex: 1, // 여백 문제를 해결하기 위해 flex 사용
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small">
          {params.row.productStatus === "REQUEST" ? "요청" : "승인"}
        </Button>
      ),
    },
  ];

  const rows = products.map((product) => ({
    id: product.productId,
    productName: product.productName,
    productBrand: product.productBrand,
    productStatus: product.productStatus,
  }));

  const handleRowClick = async (params) => {
    const productDetails = await fetchProduct(params.id);
    setSelectedProduct(productDetails);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
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
        {selectedProduct && (
          <RequestModal
            product={selectedProduct}
            open={modalOpen}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminRequest;
