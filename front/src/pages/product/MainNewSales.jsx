import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom'; // useLocation 훅을 import 합니다
import "../../styles/product.css";
import tempImg from "../../assets/images/feed4.png";
import { SERVER_URL } from '../../api/serverApi';
import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const MainNewSales = () => {
    const location = useLocation(); // 현재 경로를 가져옵니다
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(5);

    useEffect(() => {
        const category = location.pathname.split('/')[1] || 'clothes'; // 경로의 첫 번째 부분을 카테고리로 사용하고, 기본값은 'clothes'로 설정합니다
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/products/${category}/all_product_newSalesBid`
                );
                const data = response.data.map((product, index) => ({
                    productId: product.productId,
                    productImg: tempImg,
                    productBrand: product.productBrand,
                    productName: product.productName,
                    modelNum: product.modelNum,
                    biddingPrice: product.biddingPrice,
                    liked: false, // 초기 좋아요 상태
                    rank: index + 1 // 순위 추가
                }));
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, [location]); // 경로가 변경될 때마다 데이터를 다시 가져옵니다

    const handleLikeToggle = (index) => {
        const newProducts = [...products];
        newProducts[index].liked = !newProducts[index].liked;
        setProducts(newProducts);
    };

    const loadMoreProducts = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
    };

    return (
        <div className="container">
            <Box className="box">
                <Box className="product-title-box">
                    <h2 className="product-title">New Highest Bids</h2>
                    <h3 className="product-sub-title">새로운 즉시 판매가</h3>
                </Box>
                <Box className="product-wrap no-wrap">
                    {products.slice(0, visibleProducts).map((product, index) => (
                        <div className="product" key={index}>
                            <div className="image-container">
                                <img src={product.productImg} alt={product.productName} className="post-image" />
                                <span className="rank">{product.rank}</span> {/* 순위 표시 */}
                                <IconButton
                                    onClick={() => handleLikeToggle(index)}
                                    className="icon-button"
                                >
                                    {product.liked ? (
                                        <span>
                                            <img src={BookmarkOn} alt="BookmarkOn" />
                                        </span>
                                    ) : (
                                        <span>
                                            <img src={BookmarkOff} alt="BookmarkOff" />
                                        </span>
                                    )}
                                </IconButton>
                            </div>
                            <div className="product-details">
                                <p className="semibold-black">{product.productBrand}</p>
                                <p className="light-black">{product.productName}</p>
                                <span className="red-bullet">{product.modelNum}</span>
                                <span className="semibold-black">
                                    {product.biddingPrice}
                                    <span className="light-black">원</span>
                                </span>
                                <span className="light-grey">즉시 구매가</span>
                            </div>
                        </div>
                    ))}
                </Box>

                {visibleProducts < products.length && (
                    <div className="text-center">
                        <Button className="add-btn" onClick={loadMoreProducts}>
                            더보기
                        </Button>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default MainNewSales;
