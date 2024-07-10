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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%", pr: 2 }}>
            <img
              src={product.productImg}
              alt={product.productName}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
          <Box sx={{ width: "50%", pl: 2 }}>
            <Typography variant="h6" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {product.productBrand}
            </Typography>
            <Typography variant="body1" gutterBottom>
              모델 번호: {product.modelNum}
            </Typography>
            <Typography variant="body1" gutterBottom>
              원가: {product.originalPrice}
            </Typography>
            <Typography variant="body1" gutterBottom>
              사이즈: {product.productSize}
            </Typography>
            <Typography variant="body1" gutterBottom>
              상태: {product.productStatus}
            </Typography>
            {approvalError && (
              <Typography variant="body2" color="error">
                승인 중 오류가 발생했습니다.
              </Typography>
            )}
            <Button
              onClick={handleApprove}
              sx={{ mt: 2 }}
              variant="contained"
              disabled={approvalLoading}
            >
              {approvalLoading ? <CircularProgress size={24} /> : "승인"}
            </Button>
            <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
              닫기
            </Button>
          </Box>
        </Box>
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
