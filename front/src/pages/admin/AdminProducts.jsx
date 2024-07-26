import { useEffect, useState } from "react";
import { getProductsByDepartment } from "../../api/admin/productApi";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CommonList from "./layout/CommonList";
import { useNavigate } from "react-router-dom";

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
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { exceptionHandler } = useCustomLogin();

  //상품 리스트 다운
  const fetchData = async () => {
    try {
      const data = await getProductsByDepartment(
        main,
        sub === "all" ? "" : sub
      );
      const products = data.products;
      setProducts(products); // 상태 업데이트
      console.log(products);
    } catch (error) {
      exceptionHandler(error);
      console.error("Error fetching products:", error);
      setProducts([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      await fetchData();
    };
    checkLoginAndFetchData();
  }, [main, sub, navigate]);
  // useEffect(() => {}, [main, sub]);

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
  const rows = products.map((product, index) => ({
    id: product.productId,
    indexId: index + 1,
    productName: product.productName,
    modelNum: product.modelNum,
    productBrand: product.productBrand,

    mainDepartment: product.mainDepartment,
    subDepartment: product.subDepartment,
  }));

  //해당 row 의 모델 번호를 parameter로 AdminProductDetailed에 전달
  const handleRowClick = (row) => {
    alert("상품상세정보 페이지로 이동");
    navigate(`/admin/product/${row.modelNum}`);
    console.log(row.modelNum);
  };

  console.log(sub);
  console.log(departments[main][0]);

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
      <div className="flex-start ">
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sub}
            defaultValue={departments[main][0]}
            // defaultValue="all"
            // defaultValue={departments[main][0]}
            displayEmpty
            onChange={handleChange}
            sx={{
              width: "80px",
              height: "40px",
              fontSize: "0.75rem",
              marginTop: "10px",
              "& .MuiSelect-select": {
                padding: "8px", // Select 내부 padding 조정
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
      <CommonList columns={columns} rows={rows} onRowClick={handleRowClick} />
    </div>
  );
};

export default AdminProducts;
