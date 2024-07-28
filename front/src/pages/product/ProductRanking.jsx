import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';  // Import Link from react-router-dom

import axios from 'axios';
import { SERVER_URL } from 'api/serverApi';

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/dummy/";

const ProductRanking = () => {
  const { mainDepartment } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByLikes = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/all_product_likes`, {
          params: { mainDepartment }
        });
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by likes:', error);
        setError('상품 정보를 불러오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByLikes();
  }, [mainDepartment]);

  const getFilteredProducts = (departmentName) => {
    return products.filter(product => product.mainDepartment === departmentName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const departments = ['clothes', 'life', 'tech'];

  return (
    <div className="product-ranking">
      {departments.map(department => {
        const departmentProducts = getFilteredProducts(department);
        if (departmentProducts.length === 0) return null; 

        return (
          <div key={department} className={`department-section ${department}`}>
            <h1>
              {department === 'clothes' ? '의류' : department === 'life' ? '라이프' : '테크'} - 좋아요순 상품 랭킹
            </h1>
            <div className="product-list">
              {departmentProducts.map(product => (
                <div key={product.productId} className="product-item">
                  <Link to={`/clothes/details/${product.modelNum}`}>  {/* Add Link here */}
                    <img 
                      src={`${CLOUD_STORAGE_BASE_URL}products${product.productImg}`} 
                      alt={product.productName} 
                    />
                    <h3>{product.productName}</h3>
                    <p>{product.productBrand}</p>
                    <p>Model: {product.modelNum}</p>
                    <p>Likes: {product.productLike}</p>
                    <p>최저 구매 입찰가: {product.buyingBiddingPrice ? `${product.buyingBiddingPrice} 원` : "정보 없음"}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductRanking;
