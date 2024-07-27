import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from "../../api/serverApi";

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/products/";

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
        console.log('Fetched products:', JSON.stringify(response.data, null, 2));
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
  const departmentNames = {
    'clothes': '의류',
    'life': '라이프',
    'tech': '테크'
  };

  return (
    <div className="product-ranking">
      <div className="sub-nav container">
        <Link to="/">의류</Link>
        <Link to="/life">라이프</Link>
        <Link to="/tech">테크</Link>
        <Link to="/rank">랭킹</Link>
        <Link to="/luckydraw">드로우</Link>
        <Link to="/event">이벤트</Link>
      </div>
      
      {departments.map(department => {
        const departmentProducts = getFilteredProducts(department);
        if (departmentProducts.length === 0) return null;
        
        return (
          <div key={department} className={`department-section ${department}`}>
            <h1>{departmentNames[department]} - 좋아요순 상품 랭킹</h1>
            <div className="product-list">
              {departmentProducts.map(product => (
                <div key={product.productId} className="product-item">
                  <Link to={`/clothes/details/${product.modelNum}`}>
                    <img
                      src={`${CLOUD_STORAGE_BASE_URL}${product.productImg}`}
                      alt={product.productName}
                    />
                    <h3>{product.productName}</h3>
                    <p>브랜드: {product.productBrand}</p>
                    <p>모델번호: {product.modelNum}</p>
                    <p>좋아요: {product.productLike}</p>
                    <p>최저 구매 입찰가: {
                      product.biddingPrice
                        ? `${Number(product.biddingPrice).toLocaleString()} 원`
                        : "정보 없음"
                    }</p>
                    <p>등록일: {new Date(product.registerDate).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}</p>
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