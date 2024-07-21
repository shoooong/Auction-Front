import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Modal,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";
import { acceptRequest, getRequest } from "api/admin/requestApi";

const initialState = {
  productId: 0,
  productName: "",
  productBrand: "",
  productImg: "",
  modelNum: "",
  originalPrice: 0,
  productSize: "",
};

const AdminRequestDetailed = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetchRequests } = useOutletContext();
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalError, setApprovalError] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const fetchProduct = async () => {
    try {
      const data = await getRequest(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleApprove = async () => {
    setApprovalLoading(true);
    setApprovalError(null);
    try {
      await acceptRequest(productId);
      setProduct({ ...product, productStatus: "APPROVED" });
      setDialogMessage("승인이 정상적으로 처리되었습니다.");
    } catch (error) {
      console.error("Error approving request", error);
      setApprovalError(error);
      if (error.response && error.response.status === 400) {
        setDialogMessage(error.response.data);
      } else {
        setDialogMessage("승인 중 오류가 발생했습니다.");
      }
    } finally {
      setApprovalLoading(false);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = async () => {
    setDialogOpen(false);
    await fetchRequests(); // 리스트 데이터를 다시 로드합니다.
    handleClose(); // 모달창을 닫습니다.
  };

  if (loading) {
    return (
      <Modal open={true} onClose={handleClose}>
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
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal open={true} onClose={handleClose}>
        <Box sx={{ padding: "16px" }}>
          <Typography variant="h6" color="error">
            상품 정보를 불러오는 중 오류가 발생했습니다.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            닫기
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <>
      <Modal open={true} onClose={handleClose}>
        <Zoom
          in={true}
          timeout={{ enter: 500, exit: 500 }}
          easing="ease-in-out"
        >
          <Box className="admin-detailed-container w33p">
            <div className="column-direction">
              <Button
                className="admin-close-btn"
                onClick={() => handleClose()}
              ></Button>
              <div className="admin-detailed-content">
                <div>
                  <div className="admin-image">
                    <img
                      src={product.productImg}
                      alt={product.productName}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="column-direction admin-info">
                    <span alt="모델번호">{product.modelNum}</span>
                    <span alt="상품명">상품명: {product.productName}</span>
                    <span alt="브랜드">{product.productBrand}</span>

                    <span>원가: {product.originalPrice}</span>
                    <span>{product.productSize}</span>
                    <span>{product.productStatus}</span>
                    {approvalError && <span>승인 중 오류가 발생했습니다.</span>}
                  </div>
                </div>
              </div>
              <div className="justify-center admin-container-bottom">
                <Button
                  onClick={handleApprove}
                  className="confirm-btn"
                  variant="contained"
                  disabled={approvalLoading}
                >
                  {approvalLoading ? <CircularProgress size={24} /> : "승인"}
                </Button>
                <Button
                  onClick={handleClose}
                  className="confirm-btn"
                  variant="contained"
                >
                  거절
                </Button>
              </div>
            </div>
          </Box>
        </Zoom>
      </Modal>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">알림</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminRequestDetailed;
