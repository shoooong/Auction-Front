import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSub, getAll } from "api/shopApi";

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
    // 북마크 훅
    const [like, setLike] = useState(false);

    // 모든 상품
    const [allProduct, setAllProduct] = useState([]);
    const [subProduct, setSubProduct] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    // 선택된 체크박스
    const [selected, setSelected] = useState([]);

    // 무한스크롤
    const [pageNum, setPageNum] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef(null);
    const lastElementRef = useRef(null);

    // 디테일 상품 이동
    const navigate = useNavigate();

    // 모든 상품
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const allProducts = await getAll(pageNum);
                setAllProduct(allProducts);
                setHasNext(allProducts.data.hasNext);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchAllData();
    }, [pageNum]);

    // 서브 상품
    useEffect(() => {
        const fetchSubData = async () => {
            try {
                const products = await getSub(pageNum, selected);
                setSubProduct(products);
                setHasNext(products.data.hasNext);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (selected.length > 0) {
            fetchSubData();
        }
    }, [pageNum, selected]);

    // 필터 적용
    useEffect(() => {
        if (selected.length > 0) {
            setDisplayProducts(subProduct);
        } else {
            setDisplayProducts(allProduct);
        }
    }, [allProduct, subProduct, selected]);

    // 필터링 적용
    const changeFilter = (e, items) => {
        setSelected(items);
    };

    // 초기화
    const resetFilters = () => {
        setSelected([]);
        setPageNum(0);
    };

    // 무한 스크롤
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNext) {
                setPageNum((prev) => prev + 1);
            }
        });
        if (lastElementRef.current) {
            observerRef.current.observe(lastElementRef.current);
        }
        return () => {
            if (lastElementRef.current) {
                observerRef.current.unobserve(lastElementRef.current);
            }
        };
    }, [lastElementRef.current, hasNext]);

    // 상품 상세 이동
    // const detail = (category) => {
    //     navigate(`/clothes/details/${category}`);
    // };

    return (
        <>
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
                                        key={list.productId}
                                        ref={
                                            displayProducts.length === index + 1
                                                ? lastElementRef
                                                : null
                                        }
                                        // onClick={detail(list.modelNum)}
                                    >
                                        <div>
                                            <div className="product-img">
                                                <img
                                                    src={list.productImg}
                                                    alt="이미지"
                                                />
                                            </div>
                                            <IconButton
                                                onClick={() =>
                                                    setLike((like) => !like)
                                                }
                                                className=""
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
                                            <span className="semibold-black">
                                                {list.buyingBiddingPrice}
                                                <span className="light-black">
                                                    원
                                                </span>
                                            </span>
                                            <span className="light-grey">
                                                즉시 구매가
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    </div>
                </Box>
            </div>
        </>
    );
}
