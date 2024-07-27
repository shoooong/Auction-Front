import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";
import { Box, IconButton, Button } from "@mui/material";
import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";
import '../../styles/product.css';

const SubClothes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const loadMoreRef = useRef(null);

    const getTitle = () => {
        const category = location.pathname.split("/")[2];
        switch (category) {
            case "top":
                return "상의";
            case "bottom":
                return "하의";
            case "outer":
                return "아우터";
            case "shoes":
                return "신발";
            case "inner":
                return "이너웨어";
            default:
                return "제품";
        }
    };

    useEffect(() => {
        const category = location.pathname.split("/")[2] || "clothes";
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

    const handleLikeToggle = (index, e) => {
        e.stopPropagation(); // 아이콘 버튼 클릭 시 부모 div의 클릭 이벤트가 발생하지 않도록 방지합니다
        const newProducts = [...products];
        newProducts[index].liked = !newProducts[index].liked;
        setProducts(newProducts);
    };

    const handleCategoryChange = (modelNum) => {
        const category = location.pathname.split("/")[1] || "clothes"; // 현재 카테고리를 가져옵니다
        navigate(`/${category}/details/${modelNum}`); // 현재 카테고리와 모델 번호를 사용하여 상세 페이지 경로를 설정합니다
    };

    return (
        <div className="container">
            <div className="sub-nav"></div>
            <h2 className="title">{getTitle()}</h2>
            <main className="product-content" style={{ marginBottom: "80px" }}>
                <Box className="box">
                    <Box className="product-wrap inline-flex">
                        {products.map((product, index) => (
                            <div className="product" key={index} onClick={() => handleCategoryChange(product.modelNum)}>
                                <div>
                                    <div className="image-container">
                                        <img
                                            src={`${CLOUD_STORAGE_BASE_URL}/products/${product.productImg}`}
                                            alt={product.productName}
                                            className="post-image"
                                        />
                                    </div>
                                    <IconButton
                                        onClick={(e) => handleLikeToggle(index, e)}
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

export default SubClothes;
