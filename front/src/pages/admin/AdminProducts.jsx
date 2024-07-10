import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { getProductsByDepartment } from "api/admin/productApi";
import CommonList from "./layout/CommonList";

const departments = {
  의류: ["상의", "하의", "아우터", "신발", "이너웨어"],
  라이프: ["인테리어", "키친", "뷰티"],
  테크: [],
};

const AdminProducts = () => {
  const { mainDepartment } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubDepartment = searchParams.get("subDepartment") || "";
  const [subDepartment, setSubDepartment] = useState(initialSubDepartment);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [department, setDepartment] = useState(mainDepartment);
  const [subDep, setSubDep] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByDepartment(
          mainDepartment,
          subDepartment
        );
        console.log("API Response:", data); // 응답 데이터를 콘솔에 출력
        setProducts(data.products || []);
        setDepartment(data.mainDepartment);
        setSubDep(data.subDepartment);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mainDepartment, subDepartment]);

  const handleSubDepartmentChange = (event) => {
    const newSubDepartment = event.target.value;
    setSubDepartment(newSubDepartment);
    setSearchParams({ subDepartment: newSubDepartment });
  };

  const handleTabChange = (event, newValue) => {
    const selectedDepartment = Object.keys(departments)[newValue];
    navigate(`/admin/products/${selectedDepartment}`);
  };

  const handleRowClick = (row) => {
    console.log("Row clicked:", row); // row 데이터만 출력
    const modelNum = row.modelNum;
    navigate(`/admin/product/${modelNum}`);
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

  const columns = [
    { field: "productId", headerName: "ID", width: 90 },
    { field: "productName", headerName: "상품명", width: 150 },
    { field: "modelNum", headerName: "모델번호", width: 150 },
    { field: "productBrand", headerName: "브랜드", width: 150 },
    { field: "productSize", headerName: "사이즈", width: 150 },
    { field: "mainDepartment", headerName: "대분류", width: 150 },
    { field: "subDepartment", headerName: "소분류", width: 150 },
  ];

  const rows = products.map((product) => ({
    id: product.productId,
    productName: product.productName,
    modelNum: product.modelNum, // 올바르게 매핑된 값
    productBrand: product.productBrand, // 올바르게 매핑된 값
    productSize: product.productSize,
    mainDepartment: product.mainDepartment,
    subDepartment: product.subDepartment,
  }));

  return (
    <Box sx={{ padding: "32px" }}>
      <Typography variant="h6" gutterBottom>
        {department} {subDep && `> ${subDep}`} 상품 목록
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
        <Tabs
          value={Object.keys(departments).indexOf(mainDepartment)}
          onChange={handleTabChange}
          variant="fullWidth" // 탭의 너비를 고르게 분배
          indicatorColor="primary"
          textColor="primary"
        >
          {Object.keys(departments).map((dept, index) => (
            <Tab key={dept} label={dept} value={index} />
          ))}
        </Tabs>
      </Box>
      <FormControl sx={{ minWidth: 120, marginBottom: 3, height: 40 }}>
        <InputLabel id="sub-department-label">소분류</InputLabel>
        <Select
          labelId="sub-department-label"
          value={subDepartment}
          onChange={handleSubDepartmentChange}
          label="소분류"
          sx={{ height: 40 }}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          {departments[mainDepartment]?.map((subDep) => (
            <MenuItem key={subDep} value={subDep}>
              {subDep}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CommonList rows={rows} columns={columns} onRowClick={handleRowClick} />
    </Box>
  );
};

export default AdminProducts;
