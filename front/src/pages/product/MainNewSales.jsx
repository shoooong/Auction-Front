import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 훅을 import 합니다
import { SERVER_URL } from "api/serverApi";
import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/products/";

const MainNewSales = () => {
    const location = useLocation(); // 현재 경로를 가져옵니다
    const navigate = useNavigate(); // 네비게이트 훅을 가져옵니다
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(5);

    useEffect(() => {
        const category = location.pathname.split("/")[1] || "clothes"; // 경로의 첫 번째 부분을 카테고리로 사용하고, 기본값은 'clothes'로 설정합니다
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/products/${category}/all_product_newSalesBid`
                );
                const data = response.data.map((product, index) => ({
                    productId: product.productId,
                    productImg: `${CLOUD_STORAGE_BASE_URL}${product.productImg}`,
                    productBrand: product.productBrand,
                    productName: product.productName,
                    modelNum: product.modelNum,
                    biddingPrice: product.biddingPrice ? product.biddingPrice.toLocaleString() : '-',
                    liked: false, // 초기 좋아요 상태
                    rank: index + 1, // 순위 추가
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
        setVisibleProducts(10); // 한번만 클릭하면 10개로 늘어납니다
    };

    const handleProductClick = (modelNum) => {
        const category = location.pathname.split("/")[1] || "clothes"; // 현재 카테고리를 추출합니다
        navigate(`/${category}/details/${modelNum}`); // 클릭된 상품의 상세 페이지로 이동합니다
    };

    return (
        <div>
            <Box className="box line">
                <Box className="product-title-box">
                    <h2 className="product-title">New Highest Bids</h2>
                    <h3 className="product-sub-title">새로운 즉시 판매가</h3>
                </Box>
                <Box className="product-wrap grid grid-column-5 grid-gap-x30">
                    {products
                        .slice(0, visibleProducts)
                        .map((product, index) => (
                            <div className="product" key={index} onClick={() => handleProductClick(product.modelNum)}>
                                <div>
                                    <span className="rank">{product.rank}</span>{" "}
                                    <div className="image-container">
                                        <img
                                            src={product.productImg}
                                            alt={product.productName}
                                            className="post-image"
                                        />
                                    </div>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation(); // 아이콘 버튼 클릭 시 부모 div의 클릭 이벤트가 발생하지 않도록 방지합니다
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
                                        {product.biddingPrice}
                                        <span className="light-black">원</span>
                                    </span>
                                    <span className="light-grey">
                                        즉시 구매가
                                    </span>
                                </div>
                            </div>
                        ))}
                </Box>

                {visibleProducts < products.length && visibleProducts < 10 && (
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
