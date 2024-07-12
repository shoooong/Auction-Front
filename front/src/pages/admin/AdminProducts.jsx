import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { getCookie } from "pages/user/cookieUtil";

const departments = {
  의류: ["상의", "하의", "아우터", "신발", "이너웨어"],
  라이프: ["인테리어", "키친", "뷰티"],
  테크: [],
};

const DepartmentTabs = React.memo(({ mainDepartment, handleTabChange }) => (
  <Tabs
    value={Object.keys(departments).indexOf(mainDepartment)}
    onChange={handleTabChange}
    variant="fullWidth"
    indicatorColor="primary"
    textColor="primary"
  >
    {Object.keys(departments).map((dept, index) => (
      <Tab key={dept} label={dept} value={index} />
    ))}
  </Tabs>
));

const SubDepartmentSelect = React.memo(
  ({ mainDepartment, subDepartment, handleSubDepartmentChange }) => (
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
        {departments[mainDepartment]?.map((subDep, index) => (
          <MenuItem key={`subDep-${index}`} value={subDep}>
            {subDep}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AdminProducts = () => {
  const { mainDepartment: initialMainDepartment } = useParams();
  const navigate = useNavigate();
  const [mainDepartment, setMainDepartment] = useState(initialMainDepartment);
  const [subDepartment, setSubDepartment] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(
    Object.keys(departments).indexOf(initialMainDepartment)
  );

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

  const fetchProducts = useCallback(async (department) => {
    setLoading(true);
    try {
      const data = await getProductsByDepartment(department);
      setAllProducts(data.products || []);
      setSubDepartment(""); // 대분류 변경 시 소분류를 초기화
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(mainDepartment);
  }, [mainDepartment, fetchProducts]);

  useEffect(() => {
    if (subDepartment) {
      const filteredProducts = allProducts.filter(
        (product) => product.subDepartment === subDepartment
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [subDepartment, allProducts]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      const selectedDepartment = Object.keys(departments)[newValue];
      setMainDepartment(selectedDepartment);
      setTabValue(newValue);
      navigate(`/admin/products/${selectedDepartment}`, { replace: true });
    },
    [navigate]
  );

  const handleRowClick = useCallback(
    (row) => {
      const modelNum = row.modelNum;
      navigate(`/admin/product/${modelNum}`);
    },
    [navigate]
  );

  const handleSubDepartmentChange = useCallback((event) => {
    setSubDepartment(event.target.value);
  }, []);

  const columns = useMemo(
    () => [
      { field: "indexId", headerName: "ID", width: 90 },
      { field: "productName", headerName: "상품명", width: 150 },
      { field: "modelNum", headerName: "모델번호", width: 150 },
      { field: "productBrand", headerName: "브랜드", width: 150 },
      { field: "productSize", headerName: "사이즈", width: 150 },
      { field: "mainDepartment", headerName: "대분류", width: 150 },
      { field: "subDepartment", headerName: "소분류", width: 150 },
    ],
    []
  );

  const rows = useMemo(
    () =>
      filteredProducts.map((product, index) => ({
        id: product.productId,
        indexId: index + 1,
        productName: product.productName,
        modelNum: product.modelNum,
        productBrand: product.productBrand,
        productSize: product.productSize,
        mainDepartment: product.mainDepartment,
        subDepartment: product.subDepartment,
      })),
    [filteredProducts]
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
    <Box sx={{ padding: "32px" }}>
      <Typography variant="h6" gutterBottom>
        {mainDepartment} {subDepartment && `> ${subDepartment}`} 상품 목록
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
        <DepartmentTabs
          mainDepartment={mainDepartment}
          handleTabChange={handleTabChange}
        />
      </Box>
      <SubDepartmentSelect
        mainDepartment={mainDepartment}
        subDepartment={subDepartment}
        handleSubDepartmentChange={handleSubDepartmentChange}
      />
      <TabPanel value={tabValue} index={tabValue}>
        <CommonList rows={rows} columns={columns} onRowClick={handleRowClick} />
      </TabPanel>
    </Box>
  );
};

export default AdminProducts;
