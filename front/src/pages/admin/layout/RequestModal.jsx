import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const RequestModal = ({ product, open, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          요청 상품 상세
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <img
              src={product.productImg}
              alt={product.productName}
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <TextField
              label="상품명"
              value={product.productName}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="브랜드명"
              value={product.productBrand}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="발매가"
              value={product.originalPrice}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="사이즈"
              value={product.productSize}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="모델 번호"
              value={product.modelNum}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button variant="contained" color="primary">
                승인
              </Button>
              <Button variant="contained" color="secondary">
                거절
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RequestModal;
