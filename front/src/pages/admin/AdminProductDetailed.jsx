import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Tabs,
  Tab,
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

const AdminProductDetailed = () => {
  const { modelNum } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRowClick = (row) => {
    //판매탭, 검수중인 상품 row 클릭시 이벤트 발생
    if (selectedTab === 1 && row.salesStatus === "INSPECTION") {
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
    selectedProductDetail.buyingBiddingDtoList?.map((bid, idx) => ({
      id: `buying-${idx}`,
      ...bid,
      buyingBiddingPrice: `${bid.buyingBiddingPrice}원`,
      buyer: `${bid.buyer.nickname} (${bid.buyer.email})`,
    })) || [];

  const rowsSelling = filteredSalesBidding(
    selectedProductDetail.salesBiddingDtoList || []
  ).map((bid, idx) => ({
    id: `sales-${idx}`,
    ...bid,
    salesBiddingPrice: `${bid.salesBiddingPrice}원`,
    seller: `${bid.seller.nickname} (${bid.seller.email})`,
  }));

  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      <Box sx={{ flex: 1, marginRight: "20px" }}>
        {productDetails[0] && (
          <>
            <img
              src={productDetails[0].adminProductDetailDto.productImg}
              alt={productDetails[0].adminProductDetailDto.productName}
              style={{ width: "100%", height: "auto", maxWidth: "400px" }}
            />
            <Typography variant="h5" gutterBottom>
              {productDetails[0].adminProductDetailDto.productName}
            </Typography>
            <Typography variant="h6">
              즉시 구매가:{" "}
              {filteredProductDetail?.adminProductDetailDto.originalPrice}원
            </Typography>
            <Typography variant="body1">
              재고:{" "}
              {filteredProductDetail?.adminProductDetailDto.productQuantity}개
            </Typography>
            <FormControl fullWidth>
              <InputLabel>사이즈</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                sx={{ width: "100px", marginTop: "10px" }}
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
          </>
        )}
      </Box>
      <Box sx={{ flex: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="구매" />
          <Tab label="판매" />
        </Tabs>
        {selectedTab === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              구매 입찰 리스트
            </Typography>
            <CommonList
              rows={rowsBuying}
              columns={columnsBuying}
              onRowClick={() => {}}
            />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                판매 입찰 리스트
              </Typography>
              <FormControl sx={{ width: "150px" }}>
                <InputLabel>상태 필터</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="상태 필터"
                >
                  <MenuItem value="">
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value="PROCESS">PROCESS</MenuItem>
                  <MenuItem value="INSPECTION">INSPECTION</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <CommonList
              rows={rowsSelling}
              columns={columnsSelling}
              onRowClick={handleRowClick}
            />
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
