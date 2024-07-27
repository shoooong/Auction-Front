import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getRequests } from "api/admin/requestApi";
import { Outlet, useNavigate } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";

const ApproveCell = ({ productStatus }) => (
  <Button variant="contained" color="primary" size="small">
    {productStatus === "REQUEST" ? "요청" : "승인"}
  </Button>
);

const AdminRequest = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { exceptionHandler } = useCustomLogin();

  // 페이지 상태를 관리하기 위한 useState 훅
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0, // page 값을 0부터 시작하도록 설정
    pageSize: 10, // 초기 pageSize 값이 rowsPerPageOptions에 포함되도록 설정
  });

  const fetchRequests = useCallback(async () => {
    setPageState((old) => ({ ...old, isLoading: true }));
    try {
      const data = await getRequests(pageState.page, pageState.pageSize);
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: data.products || [],
        total: data.totalElements,
        page: data.number, // 서버에서 받은 현재 페이지 번호
      }));
      console.log(data);
    } catch (error) {
      exceptionHandler(error);
      setPageState((old) => ({ ...old, isLoading: false }));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [pageState.page, pageState.pageSize, exceptionHandler]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // page와 pageSize가 변경될 때마다 로그를 출력하는 useEffect
  useEffect(() => {
    console.log(
      `Current page: ${pageState.page}, Page size: ${pageState.pageSize}`
    );
  }, [pageState.page, pageState.pageSize]);

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
      align: "center",
      flex: 1,
    },
    {
      field: "productBrand",
      headerName: "브랜드",
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

  const rows = Array.isArray(pageState.data)
    ? pageState.data.map((product, index) => ({
        id: product.productId,
        indexId: index + 1 + pageState.page * pageState.pageSize,
        productName: product.productName,
        productBrand: product.productBrand,
        productStatus: product.productStatus,
      }))
    : [];
  // 동적으로 pageSizeOptions 설정
  const pageSizeOptions = useMemo(() => {
    return pageState.data.length === 0 ? [0] : [10, 30, 50, 70, 100];
  }, [pageState.data.length]);

  const handleRowClick = useCallback(
    (row) => {
      navigate(`/admin/request/${row.id}`);
    },
    [navigate]
  );

  const handlePaginationModelChange = (model) => {
    console.log(
      `Pagination model changed to: ${model.page}, ${model.pageSize}`
    ); // 디버깅 로그 추가
    setPageState((old) => ({
      ...old,
      page: model.page,
      pageSize: model.pageSize,
    }));
  };

  useEffect(() => {
    fetchRequests();
  }, [pageState.page, pageState.pageSize]);

  if (pageState.isLoading || loading) {
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

  return (
    <Box className="column-direction admin-content-container">
      <div className="admin-title-box">
        <p className="admin-main-title">요청 상품 관리</p>
      </div>
      <DataGrid
        autoHeight
        rows={rows}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={pageSizeOptions} // 동적으로 설정된 pageSizeOptions 사용
        pageSizeOptions={pageSizeOptions}
        pagination
        paginationMode="server"
        paginationModel={{
          page: pageState.page,
          pageSize: pageState.pageSize,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        columns={columns}
        onRowClick={handleRowClick}
      />
      <Outlet context={{ fetchRequests }} />
    </Box>
  );
};

export default AdminRequest;
