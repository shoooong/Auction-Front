import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getProduct, acceptProduct } from "api/admin/productApi";
import CommonList from "./layout/CommonList";
import { CLOUD_STORAGE_BASE_URL } from "api/admin/productApi";

const AdminProductDetailed = () => {
  const { modelNum } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [filteredProductDetail, setFilteredProductDetail] = useState(null);

  //첫번째 데이터 로딩
  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProduct(modelNum);
      setProductDetails(data.detailedProducts);
      //배열의 첫번째 사이즈 디폴트값 설정
      setSelectedSize(
        data.detailedProducts[0].adminProductDetailDto.productSize
      ); // Default size selection
    };

    fetchProductDetails();
  }, [modelNum]);

  //사이즈 변경시 데이터 로딩
  useEffect(() => {
    if (selectedSize) {
      const selectedProductDetail = productDetails.find(
        (detail) => detail.adminProductDetailDto.productSize === selectedSize
      );
      setFilteredProductDetail(selectedProductDetail);
    }
  }, [selectedSize, productDetails]);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const handleRowClick = (row) => {
    //판매탭, 검수중인 상품 row 클릭시 이벤트 발생
    if (selectedButton === 1 && row.salesStatus === "INSPECTION") {
      setSelectedRow(row);
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleApprove = async () => {
    if (selectedRow && selectedRow.salesStatus === "INSPECTION") {
      try {
        await acceptProduct(selectedRow.salesBiddingId);
        // Update the UI to reflect the change
        setProductDetails((prevDetails) =>
          prevDetails.map((detail) => ({
            ...detail,
            salesBiddingDtoList: detail.salesBiddingDtoList.map((bid) =>
              bid.salesBiddingId === selectedRow.salesBiddingId
                ? { ...bid, salesStatus: "PROCESS" }
                : bid
            ),
          }))
        );
      } catch (error) {
        console.error("Failed to approve product:", error);
      }
    }
    setOpenDialog(false);
  };

  const filteredSalesBidding = (biddingList) =>
    biddingList.filter((bid) =>
      filterStatus ? bid.salesStatus === filterStatus : true
    );

  const columnsBuying = [
    { field: "id", headerName: "번호", width: 70 },
    { field: "buyer", headerName: "입찰자", width: 150 },
    { field: "buyingBiddingPrice", headerName: "입찰가", width: 150 },
  ];

  const columnsSelling = [
    { field: "id", headerName: "번호", width: 70 },
    { field: "seller", headerName: "판매자", width: 150 },
    { field: "salesBiddingPrice", headerName: "판매가", width: 150 },
    { field: "salesStatus", headerName: "상태", width: 150 },
  ];

  const selectedProductDetail =
    productDetails.find(
      (detail) => detail.adminProductDetailDto.productSize === selectedSize
    ) || {};

  const rowsBuying =
    selectedProductDetail.buyingBiddingDtoList?.map((bid, index) => ({
      id: index + 1,
      ...bid,
      buyingBiddingPrice: `${bid.buyingBiddingPrice}원`,
      buyer: `${bid.buyer.nickname} (${bid.buyer.email})`,
    })) || [];

  const rowsSelling = filteredSalesBidding(
    selectedProductDetail.salesBiddingDtoList || []
  ).map((bid, index) => ({
    id: index + 1,
    ...bid,
    salesBiddingPrice: `${bid.salesBiddingPrice}원`,
    seller: `${bid.seller.nickname} (${bid.seller.email})`,
  }));

  return (
    <Box className="column-direction">
      <div className="row-direction">
        {productDetails[0] && (
          <div className="row-direction">
            <div className="admin-image">
              <img
                // src={productDetails[0].adminProductDetailDto.productImg}
                src={
                  CLOUD_STORAGE_BASE_URL +
                  productDetails[0].adminProductDetailDto.productImg
                }
                alt={productDetails[0].adminProductDetailDto.productName}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
            <div className="admin-info">
              <div className="column-direction admin-product-info">
                <span>
                  {productDetails[0].adminProductDetailDto.productName}
                </span>
                <span>
                  원가:{" "}
                  {filteredProductDetail?.adminProductDetailDto.originalPrice}원
                </span>
                <span>
                  재고:{" "}
                  {filteredProductDetail?.adminProductDetailDto.productQuantity}
                  개
                </span>
              </div>
              <FormControl style={{ minWidth: 100 }}>
                <InputLabel>사이즈</InputLabel>
                <Select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
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
                  {productDetails.map((detail, index) => (
                    <MenuItem
                      key={`size-${index}`}
                      value={detail.adminProductDetailDto.productSize}
                    >
                      {detail.adminProductDetailDto.productSize}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}

        <div className="column-direction admin-btn-container">
          <div className="">
            <Button
              variant="outlined"
              className={`button ${
                selectedButton === 0 ? "button-selected" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
              구매
            </Button>
            <Button
              variant="outlined"
              className={`button ${
                selectedButton === 1 ? "button-selected" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              판매
            </Button>
          </div>
        </div>
      </div>
      {selectedButton === 0 && (
        <div style={{ marginTop: "20px" }}>
          <p className="admin-main-title">구매 입찰</p>
          <div style={{ height: "400px" }}>
            <CommonList
              rows={rowsBuying}
              columns={columnsBuying}
              onRowClick={() => {}}
            />
          </div>
        </div>
      )}
      <hr />
      <Box sx={{ flex: 2, marginTop: "20px" }}>
        {selectedButton === 1 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="admin-main-title">판매 입찰</p>
              <FormControl sx={{ width: "150px" }}>
                <InputLabel>상품 상태</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{
                    width: "100px",
                    height: "px",
                    fontSize: "0.75rem",
                    marginTop: "10px",
                    "& .MuiSelect-select": {
                      padding: "8px", // Select 내부 padding 조정
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value="PROCESS">PROCESS</MenuItem>
                  <MenuItem value="INSPECTION">INSPECTION</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div style={{ height: "400px" }}>
              <CommonList
                rows={rowsSelling}
                columns={columnsSelling}
                onRowClick={handleRowClick}
              />
            </div>
          </>
        )}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>상품 검수 승인</DialogTitle>
          <DialogContent>해당 상품을 검수 승인하시겠습니까?</DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>취소</Button>
            <Button onClick={handleApprove} color="primary">
              승인
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminProductDetailed;
