import React, { useState } from 'react';
import jwtAxios from 'pages/user/jwtUtil';
import { SERVER_URL } from '../../api/serverApi';

const RequestProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    productImg: null,
    productBrand: '',
    productName: '',
    originalPrice: '',
    mainDepartment: '',
    subDepartment: '',
    productSize: '',
    modelNum: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImg: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'productImg') {
        for (let i = 0; i < formData[key].length; i++) {
          formDataToSend.append(key, formData[key][i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await jwtAxios.post(`${SERVER_URL}/product/request`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSuccess();
    } catch (error) {
      console.error('등록 오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-product-form">
      <label>
        Product Image:
        <input type="file" name="productImg" onChange={handleFileChange} multiple required />
      </label>
      <label>
        Product Brand:
        <input type="text" name="productBrand" value={formData.productBrand} onChange={handleChange} required />
      </label>
      <label>
        Product Name:
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
      </label>
      <label>
        Original Price:
        <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required />
      </label>
      <label>
        Main Department:
        <input type="text" name="mainDepartment" value={formData.mainDepartment} onChange={handleChange} required />
      </label>
      <label>
        Sub Department:
        <input type="text" name="subDepartment" value={formData.subDepartment} onChange={handleChange} required />
      </label>
      <label>
        Product Size:
        <input type="text" name="productSize" value={formData.productSize} onChange={handleChange} required />
      </label>
      <label>
        Model Number:
        <input type="text" name="modelNum" value={formData.modelNum} onChange={handleChange} required />
      </label>
      <button type="submit">Register Product</button>
    </form>
  );
};

export default RequestProductForm;
