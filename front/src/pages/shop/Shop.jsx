import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getSub, getAll } from "api/shopApi";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

import { Box, IconButton } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const LABEL_DATA = [
    { id: "top", label: "상의" },
    { id: "bottom", label: "하의" },
    { id: "outer", label: "아우터" },
    { id: "shoes", label: "신발" },
    { id: "inner", label: "이너웨어" },
    { id: "interior", label: "인테리어" },
    { id: "kitcken", label: "키친" },
    { id: "beauty", label: "뷰티" },
    { id: "tech", label: "테크" },
];

export default function Shop() {
    const [like, setLike] = useState(false);

    // 상품 불러오기
    const [allProduct, setAllProduct] = useState([]);
    const [subProduct, setSubProduct] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    // 선택된 필터
    const [selected, setSelected] = useState([]);

    // 무한스크롤
    const [pageNum, setPageNum] = useState(0);
    const [hasNext, setHasNext] = useState(true);

    const lastElementRef = useRef(null);

    const fetchAllData = async (pageNum) => {
        try {
            const allProducts = await getAll(pageNum);
            setAllProduct((prev) => [...prev, ...allProducts.data.content]);
            setHasNext(!allProducts.last);
        } catch (error) {
            console.error("Error fetching products: ", error);
            setHasNext(false);
        }
    };

    const fetchSubData = async (pageNum, selected) => {
        try {
            const products = await getSub(pageNum, selected);
            setSubProduct((prev) => [...prev, ...products.data.content]);
            setHasNext(!products.last);
        } catch (error) {
            console.error("Error fetching products:", error);
            setHasNext(false);
        }
    };

    useEffect(() => {
        if (selected.length > 0) {
            fetchSubData(pageNum, selected);
        } else {
            fetchAllData(pageNum);
        }
    }, [pageNum, selected, hasNext]);

    useEffect(() => {
        if (selected.length > 0) {
            setDisplayProducts(subProduct);
        } else {
            setDisplayProducts(allProduct);
        }
    }, [allProduct, subProduct, selected]);

    const changeFilter = (e, items) => {
        setSelected(items);
        setPageNum(0);
        setAllProduct([]);
        setSubProduct([]);
    };

    const resetFilters = () => {
        setSelected([]);
        setPageNum(0);
        setAllProduct([]);
        setSubProduct([]);
    };

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
            <div className="sub-nav"></div>
            <Box className="flex">
                <div className="w20p">
                    <div className="tree-view pos-sticky">
                        <b>
                            필터
                            <span onClick={resetFilters}>초기화</span>
                        </b>
                        <Box>
                            <RichTreeView
                                items={LABEL_DATA}
                                multiSelect
                                checkboxSelection
                                onSelectedItemsChange={changeFilter}
                                selectedItems={selected}
                            ></RichTreeView>
                        </Box>
                    </div>
                </div>
                <div className="w80p">
                    <Box className="box">
                        <Box
                            className="product-wrap grid grid-gap-x30 grid-column-4"
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
