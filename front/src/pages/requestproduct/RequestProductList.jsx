import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtAxios from '../../pages/user/jwtUtil';
import './ProductRequestList.css';
import { SERVER_URL } from '../../api/serverApi';

const ProductRequestList = () => {
  const [requestProducts, setRequestProducts] = useState([]);

  useEffect(() => {
    const fetchRequestProducts = async () => {
      try {
        const response = await jwtAxios.get(`${SERVER_URL}/product/requestList`);
        setRequestProducts(response.data);
      } catch (error) {
        console.error('Error fetching request products:', error);
      }
    };

    fetchRequestProducts();
  }, []);

  return (
    <div>
      <h2>Requested Products</h2>
      <Link to="/service/request/register">
        <button>등록하기</button>
      </Link>
      <div className="request-list">
        {requestProducts.map((product) => (
          <Link to={`/service/request/${product.productId}`} key={product.productId}>
            <div className="request-card">
              <h3>{product.productName}</h3>
              <p><strong>Brand:</strong> {product.productBrand}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRequestList;
