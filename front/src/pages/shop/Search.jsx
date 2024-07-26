import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearch } from "api/shopApi";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

import { Box, IconButton } from "@mui/material";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

export default function Shop() {
    // 북마크 훅
    const [like, setLike] = useState(false);

    // 검색조건
    const [keyword, setKeyword] = useState("");

    // 상품 불러오기
    const [searchProduct, setSearchProduct] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    // 무한스크롤
    const [pageNum, setPageNum] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const lastElementRef = useRef(null);

    const fetchSearchData = async (pageNum, keyword) => {
        try {
            const searchProducts = await getSearch(pageNum, keyword);
            if (pageNum === 0) {
                setSearchProduct(searchProducts.data.content);
            } else {
                setSearchProduct((prev) => [
                    ...prev,
                    ...searchProducts.data.content,
                ]);
            }
            setHasNext(!searchProducts.last);
        } catch (error) {
            console.error("Error fetching products: ", error);
            setHasNext(false);
        }
    };

    const handleChange = (e) => {
        setKeyword(e.target.value);
        setPageNum(0);
        setSearchProduct([]);
    };

    const handleSearchClick = () => {
        setPageNum(0);
        setSearchProduct([]);
        fetchSearchData(0, keyword);
    };

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    useEffect(() => {
        if (keyword) {
            fetchSearchData(0, keyword);
        }
    }, [keyword]);

    useEffect(() => {
        if (pageNum > 0) {
            fetchSearchData(pageNum, keyword);
        }
    }, [pageNum]);

    useEffect(() => {
        setDisplayProducts(searchProduct);
    }, [searchProduct]);

    const loadMore = useCallback(() => {
        if (hasNext) {
            setPageNum((prev) => prev + 1);
        }
    }, [hasNext]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNext) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        if (lastElementRef.current) {
            observer.observe(lastElementRef.current);
        }
        return () => {
            if (lastElementRef.current) {
                observer.unobserve(lastElementRef.current);
            }
        };
    }, [lastElementRef, loadMore, hasNext]);

    // 해당 상품으로 경로 이동
    const navigate = useNavigate();
    const location = useLocation();
    const handleProductClick = (modelNum, displayProducts) => {
        const category =
            location.pathname.split("/")[0] || displayProducts.mainDepartment;
        navigate(`/${category}/details/${modelNum}`);
    };

    return (
        <div className="container">
            <Box className="flex">
                <Box className="search-box">
                    <input
                        type="text"
                        value={keyword}
                        onChange={handleChange}
                        onKeyDown={activeEnter}
                    />
                    <button onClick={handleSearchClick}>찾기</button>
                </Box>
                <div className="w100p">
                    <Box className="box">
                        <Box
                            className="product-wrap grid grid-gap-x30 grid-column-5"
                            style={{ marginBottom: "80px" }}
                        >
                            {displayProducts.map((list, index) => (
                                <div
                                    className="product"
                                    key={index}
                                    onClick={() =>
                                        handleProductClick(list.modelNum, list)
                                    }
                                >
                                    <div>
                                        <div className="product-img-230">
                                            <img
                                                src={`${CLOUD_STORAGE_BASE_URL}/products/${list.productImg}`}
                                                alt="이미지"
                                            />
                                        </div>
                                        <IconButton
                                            onClick={() =>
                                                setLike((like) => !like)
                                            }
                                        >
                                            {like ? (
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
                                    <div>
                                        <p className="semibold-black">
                                            {list.productBrand}
                                        </p>
                                        <p className="light-black">
                                            {list.productName}
                                        </p>
                                        <span className="red-bullet">
                                            {list.modelNum}
                                        </span>
                                        {list.buyingBiddingPrice === null ? (
                                            <></>
                                        ) : (
                                            <>
                                                <span className="semibold-black">
                                                    {list.buyingBiddingPrice}
                                                    <span className="light-black">
                                                        원
                                                    </span>
                                                </span>
                                                <span className="light-grey">
                                                    즉시 구매가
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div ref={lastElementRef}></div>
                        </Box>
                    </Box>
                </div>
            </Box>
        </div>
    );
}
