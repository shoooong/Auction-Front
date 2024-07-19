import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, IconButton, Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/product.css";
import { SERVER_URL } from '../../api/serverApi';
import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const SubShoes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        const category = location.pathname.split('/')[2] || 'clothes';
        const fetchProducts = async (page) => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/products/sub/${category}?page=${page}`
                );
                setProducts(prevProducts => [...prevProducts, ...response.data.content]);
                setHasNext(response.data.hasNext);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts(page);
    }, [location, page]);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNext) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNext]);

    const handleLikeToggle = (index) => {
        const newProducts = [...products];
        newProducts[index].liked = !newProducts[index].liked;
        setProducts(newProducts);
    };

    const handleCategoryChange = (category) => {
        setProducts([]);
        setPage(0);
        setHasNext(true);
        navigate(`/clothes/${category}`);
    };

    return (
        <div className="alpha">
            <div className="beta">
                <aside className="sidebar">
                    <h2>필터</h2>
                    <div>
                        <input type="radio" id="top" name="category" onChange={() => handleCategoryChange('top')} defaultChecked={location.pathname.includes('top')} />
                        <label htmlFor="top">상의</label>
                    </div>
                    <div>
                        <input type="radio" id="bottom" name="category" onChange={() => handleCategoryChange('bottom')} defaultChecked={location.pathname.includes('bottom')} />
                        <label htmlFor="bottom">하의</label>
                    </div>
                    <div>
                        <input type="radio" id="outer" name="category" onChange={() => handleCategoryChange('outer')} defaultChecked={location.pathname.includes('outer')} />
                        <label htmlFor="outer">아우터</label>
                    </div>
                    <div>
                        <input type="radio" id="shoes" name="category" onChange={() => handleCategoryChange('shoes')} defaultChecked={location.pathname.includes('shoes')} />
                        <label htmlFor="shoes">신발</label>
                    </div>
                    <div>
                        <input type="radio" id="inner" name="category" onChange={() => handleCategoryChange('inner')} defaultChecked={location.pathname.includes('inner')} />
                        <label htmlFor="inner">이너웨어</label>
                    </div>
                </aside>
            </div>
            
            <div className="gamma">
                <main className="product-content">
                    <Box className="box">
                        <Box className="product-title-box">
                            <h2 className="product-title">Product</h2>
                            <h3 className="product-sub-title">상품</h3>
                        </Box>
                        <Box className="product-wrap no-wrap">
                            {products.map((product, index) => (
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

                        {hasNext && (
                            <div className="text-center" ref={loadMoreRef}>
                                <Button className="add-btn">
                                    더보기
                                </Button>
                            </div>
                        )}
                    </Box>
                </main>
            </div>
        </div>
    );
};

export default SubShoes;
