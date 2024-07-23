import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwtAxios from '../../pages/user/jwtUtil';
import { SERVER_URL } from '../../api/serverApi';

const ProductRequestDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('Product ID is undefined.');
        return;
      }

      try {
        const response = await jwtAxios.get(`${SERVER_URL}/product/request/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.productName}</h2>
      <p><strong>Brand:</strong> {product.productBrand}</p>
      <p><strong>Price:</strong> {product.originalPrice}</p>
      <p><strong>Size:</strong> {product.productSize}</p>
      <p><strong>Status:</strong> {product.productStatus}</p>
      <p><strong>Model Number:</strong> {product.modelNum}</p>
      <p><strong>Main Department:</strong> {product.mainDepartment}</p>
      <p><strong>Sub Department:</strong> {product.subDepartment}</p>
      <img src={product.productImg} alt={product.productName} />
    </div>
  );
};

export default ProductRequestDetail;
