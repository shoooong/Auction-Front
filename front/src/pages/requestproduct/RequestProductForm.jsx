import React, { useState } from 'react';
import jwtAxios from 'pages/user/jwtUtil';
import { SERVER_URL } from '../../api/serverApi';

const RequestProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    productImg: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await jwtAxios.post(`${SERVER_URL}/product/request`, formData); 
      onSuccess(); 
    } catch (error) {
      console.error('등록 오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Image URL:
        <input type="text" name="productImg" value={formData.productImg} onChange={handleChange} required />
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
