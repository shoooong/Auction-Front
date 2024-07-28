import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getProductsByDepartment } from "api/admin/productApi";

import {
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import useCustomLogin from "hooks/useCustomLogin";

const departments = {
  clothes: ["all", "top", "bottom", "outer", "shoes", "inner"],
  life: ["all", "interior", "kitchen", "beauty"],
  tech: ["tech"],
};

const AdminProducts = () => {
  const [main, setMain] = useState("clothes");
  const [sub, setSub] = useState("");
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

  //상품 리스트 다운
  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true }));

    try {
      const data = await getProductsByDepartment(
        main,
        sub === "all" ? "" : sub,
        pageState.page,
        pageState.pageSize
      );
      console.log("Fetched data:", data); // 디버깅 로그 추가

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: data.products || [],
        total: data.totalElements,
        page: data.number, // 서버에서 받은 현재 페이지 번호
      }));
    } catch (error) {
      exceptionHandler(error);
      setPageState((old) => ({ ...old, isLoading: false }));
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [main, sub, pageState.page, pageState.pageSize, navigate]);

  const changeMain = (event, newValue) => {
    setMain(newValue);
    setSub(""); // 새로운 main을 선택할 때 sub를 기본값으로 설정
  };

  const handleChange = (event) => {
    setSub(event.target.value);
  };

  const columns = [
    {
      field: "indexId",
      headerName: "ID",
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
      field: "modelNum",
      headerName: "모델번호",
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
      field: "mainDepartment",
      headerName: "대분류",
      width: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "subDepartment",
      headerName: "소분류",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  // products 데이터를 rows 형식으로 변환
  const rows = Array.isArray(pageState.data)
    ? pageState.data.map((product, index) => ({
        id: product.productId,
        indexId: index + 1,
        productName: product.productName,
        modelNum: product.modelNum,
        productBrand: product.productBrand,
        mainDepartment: product.mainDepartment,
        subDepartment: product.subDepartment,
      }))
    : [];

  // 동적으로 pageSizeOptions 설정
  const pageSizeOptions = useMemo(() => {
    const options = [10, 30, 50, 70, 100];
    if (!options.includes(pageState.pageSize)) {
      options.push(pageState.pageSize);
    }
    return options;
  }, [pageState.pageSize]);

  // 해당 row 의 모델 번호를 parameter로 AdminProductDetailed에 전달
  const handleRowClick = (params) => {
    navigate(`/admin/product/${params.row.modelNum}`);
    console.log(params.row.modelNum);
  };

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

  return (
    <div className="column-direction h100p">
      <BottomNavigation showLabels value={main} onChange={changeMain}>
        <BottomNavigationAction
          label="clothes"
          icon={<CheckroomOutlinedIcon />}
          value="clothes"
        />
        <BottomNavigationAction
          label="life"
          icon={<OtherHousesOutlinedIcon />}
          value="life"
        />
        <BottomNavigationAction
          label="tech"
          icon={<LaptopMacOutlinedIcon />}
          value="tech"
        />
      </BottomNavigation>
      <div className="flex-start">
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sub}
            displayEmpty
            onChange={handleChange}
            sx={{
              width: "80px",
              height: "40px",
              fontSize: "0.75rem",
              marginTop: "10px",
              "& .MuiSelect-select": {
                padding: "8px",
              },
            }}
          >
            {departments[main].map((sub, index) => (
              <MenuItem key={index} value={sub}>
                {sub === "all" ? "all" : sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <DataGrid
        autoHeight
        rows={rows}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={pageSizeOptions}
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
    </div>
  );
};

export default AdminProducts;
