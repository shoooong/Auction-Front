import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import { Box, IconButton, Button } from "@mui/material";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

import '../../styles/product.css';

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/products/";

const SubLife = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const loadMoreRef = useRef(null);

    const getTitle = () => {
        const category = location.pathname.split("/")[2];
        switch (category) {
            case "beauty":
                return "뷰티";
            case "kitchen":
                return "주방";
            case "interior":
                return "인테리어";
            default:
                return "라이프스타일";
        }
    };

    useEffect(() => {
        const category = location.pathname.split("/")[2] || "life";
        const fetchProducts = async (page) => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/products/sub/${category}?page=${page}`
                );
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...response.data.content,
                ]);
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

    const handleProductClick = (modelNum) => {
        const category = location.pathname.split("/")[1] || "life";
        navigate(`/${category}/details/${modelNum}`);
    };

    return (
        <div className="container">
            <div className="sub-nav"></div>

            <h2 className="title">{getTitle()}</h2>

            <main className="product-content" style={{ marginBottom: "80px" }}>
                <Box className="box">
                    <Box className="product-wrap inline-flex">
                        {products.map((product, index) => (
                            <div className="product" key={index}
                                onClick={() => handleProductClick(product.modelNum)}>
                                <div>
                                    <div className="image-container">
                                        <img
                                            src={`${CLOUD_STORAGE_BASE_URL}${product.productImg}`}
                                            alt={product.productName}
                                            className="post-image"
                                        />
                                    </div>

                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLikeToggle(index);
                                        }}
                                        className="icon-button"
                                    >
                                        {product.liked ? (
                                            <span>
                                                <img
                                                    src={BookmarkOn}
                                                    alt="BookmarkOn"
                                                />
                                            </span>
                                        ) : (
                                            <span>
                                                <img
                                                    src={BookmarkOff}
                                                    alt="BookmarkOff"
                                                />
                                            </span>
                                        )}
                                    </IconButton>
                                </div>
                                <div className="product-details">
                                    <p className="semibold-black">
                                        {product.productBrand}
                                    </p>
                                    <p className="light-black">
                                        {product.productName}
                                    </p>
                                    <span className="red-bullet">
                                        {product.modelNum}
                                    </span>
                                    <span className="semibold-black">
                                        {parseInt(product.biddingPrice).toLocaleString()}
                                        <span className="light-black">원</span>
                                    </span>
                                    <span className="light-grey">
                                        즉시 구매가
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Box>

                    {hasNext && (
                        <div className="text-center" ref={loadMoreRef}>
                            <Button className="add-btn">더보기</Button>
                        </div>
                    )}
                </Box>
            </main>
        </div>
    );
};

export default SubLife;
