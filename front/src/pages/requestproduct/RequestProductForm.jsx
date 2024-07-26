import React, { useState } from "react";
import jwtAxios from "pages/user/jwtUtil";
import { SERVER_URL } from "../../api/serverApi";
import { Link } from "react-router-dom";

const RequestProductForm = ({ onSuccess }) => {
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [mainDepartment, setMainDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [productSize, setProductSize] = useState("");
  const [modelNum, setModelNum] = useState("");
  const [files, setFiles] = useState(null);

  const handleImageChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productBrand", productBrand);
    formData.append("productName", productName);
    formData.append("originalPrice", originalPrice);
    formData.append("mainDepartment", mainDepartment);
    formData.append("subDepartment", subDepartment);
    formData.append("productSize", productSize);
    formData.append("modelNum", modelNum);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      const response = await jwtAxios.post(`${SERVER_URL}/product/request`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product request submitted successfully:", response.data);
      onSuccess();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="container request-product-form">
      <form onSubmit={handleSubmit}>
        <h2>미등록 상품 등록 요청</h2>
        <div className="form-group">
          <label htmlFor="productBrand">제품 브랜드:</label>
          <input
            type="text"
            id="productBrand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
            placeholder="제품 브랜드를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName">제품 이름:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="제품 이름을 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="originalPrice">희망가격:</label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
            placeholder="희망가격를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mainDepartment">상품 대분류:</label>
          <input
            type="text"
            id="mainDepartment"
            value={mainDepartment}
            onChange={(e) => setMainDepartment(e.target.value)}
            required
            placeholder="상품 대분류를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subDepartment">상품 소분류:</label>
          <input
            type="text"
            id="subDepartment"
            value={subDepartment}
            onChange={(e) => setSubDepartment(e.target.value)}
            required
            placeholder="상품 소분류를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productSize">제품 사이즈:</label>
          <input
            type="text"
            id="productSize"
            value={productSize}
            onChange={(e) => setProductSize(e.target.value)}
            required
            placeholder="제품 사이즈를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelNum">모델 번호:</label>
          <input
            type="text"
            id="modelNum"
            value={modelNum}
            onChange={(e) => setModelNum(e.target.value)}
            required
            placeholder="모델 번호를 입력해주세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="files">제품 이미지:</label>
          <input
            type="file"
            id="files"
            onChange={handleImageChange}
            multiple
            required
            placeholder="파일을 선택해주세요"
          />
        </div>
        <div className="text-center" style={{ marginBottom: "80px" }}>
          <button type="submit" className="small-btn">
            등록
          </button>
          <Link to="/product">
            <button className="small-btn">목록으로</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RequestProductForm;
