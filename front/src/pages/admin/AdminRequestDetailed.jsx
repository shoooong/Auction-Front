import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { acceptRequest, getRequest, rejectRequest } from "api/admin/requestApi";
import { CLOUD_STORAGE_BASE_URL } from "api/admin/productApi";
import {
  Box,
  Modal,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import "styles/admin.css";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [preview, setPreview] = useState(null); // 추가된 부분: 미리보기 상태 추가

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getRequest(productId);
        setProduct(data);
        setPreview(`${CLOUD_STORAGE_BASE_URL}${data.productImg}`); // 추가된 부분: 이미지 미리보기 설정
      } catch (error) {
        console.log("요청 상품 상세정보 로딩중 오류", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [productId]);

  const approveRequest = async () => {
    const formData = new FormData();
    formData.append(
      "productReqDto",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    if (selectedFile) {
      formData.append("productPhoto", selectedFile);
    }

    setApprovalLoading(true);
    try {
      await acceptRequest(productId, formData);
      fetchRequests();
      navigate("/admin/request"); // 승인 후 요청 목록으로 이동
    } catch (error) {
      if (error.response) {
        console.log("요청 상품 승인중 오류", error.response.data);
      } else if (error.request) {
        console.log("요청 상품 승인중 네트워크 오류", error.request);
      } else {
        console.log("요청 상품 승인중 오류", error.message);
      }
    } finally {
      setApprovalLoading(false);
    }
  };

  const deleteRequest = async () => {
    try {
      await rejectRequest(productId);
      fetchRequests();
      navigate("/admin/request"); // 거절 후 요청 목록으로 이동
    } catch (error) {
      console.log("상품 거절중 오류", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 추가된 부분: 파일 선택 시 파일 객체 가져오기
    setSelectedFile(file); // 추가된 부분: 파일 객체 상태 업데이트
    setPreview(URL.createObjectURL(file)); // 추가된 부분: 이미지 미리보기 설정
  };

  const handleApprove = () => {
    approveRequest();
  };

  const handleClose = () => {
    navigate(-1);
  };
  const triggerFileInput = () => {
    document.getElementById("file-input").click(); // 추가된 부분: 파일 입력 요소 클릭 트리거
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
    <Modal open={true} onClose={handleClose}>
      <Box className="admin-detailed-container">
        <div className="admin-image" onClick={triggerFileInput}>
          {preview ? ( // 추가된 부분: 미리보기 이미지가 있으면 해당 이미지 표시
            <img src={preview} alt="이미지 미리보기" />
          ) : (
            <img src="/path/to/default/image.png" alt="파일 선택" /> // 추가된 부분: 기본 이미지 표시
          )}
        </div>
        {/* 추가된 부분: 숨겨진 파일 입력 요소 */}
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div>
          <div>
            <label>Model Number</label>
            <TextField
              name="modelNum"
              type="text"
              value={product.modelNum}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <label>Product Name</label>
            <TextField
              name="productName"
              type="text"
              value={product.productName}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <label>Product Brand</label>
            <TextField
              name="productBrand"
              type="text"
              value={product.productBrand}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <label>Product Size</label>
            <TextField
              name="productSize"
              type="text"
              value={product.productSize}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <label>Original Price</label>
            <TextField
              name="originalPrice"
              type="number"
              value={product.originalPrice}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <input
              type="file"
              name="productPhoto"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div>
          <Button
            onClick={handleApprove}
            variant="contained"
            disabled={approvalLoading}
          >
            {approvalLoading ? <CircularProgress size={24} /> : "승인"}
          </Button>
          <Button onClick={deleteRequest} variant="contained">
            거절
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AdminRequestDetailed;
