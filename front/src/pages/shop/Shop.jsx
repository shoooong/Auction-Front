import { useState, useEffect, useRef, useCallback } from "react";
import { getSub, getAll, getMain } from "api/shopApi";

import { Box, IconButton } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const LABEL_DATA = [
    {
        id: "clothes",
        label: "의류",
        children: [
            { id: "top", label: "상의" },
            { id: "bottom", label: "하의" },
            { id: "outer", label: "아우터" },
            { id: "신발", label: "신발" },
            { id: "이너웨어", label: "이너웨어" },
        ],
    },
    {
        id: "life",
        label: "라이프",
        children: [
            { id: "인테리어", label: "인테리어" },
            { id: "키친", label: "키친" },
            { id: "뷰티", label: "뷰티" },
        ],
    },
    { id: "tech", label: "테크" },
];

export default function Shop() {
    // 북마크 훅
    const [like, setLike] = useState(false);

    // 모든 상품
    const [allProduct, setAllProduct] = useState([]);
    const [mainProduct, setMainProduct] = useState([]);
    const [subProduct, setSubProduct] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    // 선택된 체크박스
    const [main, setMain] = useState([]);
    const [sub, setSub] = useState([]);

    // 무한스크롤
    const [pageNum, setPageNum] = useState(0);
    const [hasNext, setHasNext] = useState(false);

    // 모든 상품
    const fetchAllData = async () => {
        try {
            const allProducts = await getAll(pageNum);
            setAllProduct(allProducts);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };
    useEffect(() => {
        fetchAllData();
    }, [pageNum]);

    // 서브 상품
    const fetchSubData = async () => {
        try {
            const products = await getSub(pageNum, sub);
            setSubProduct(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        if (sub.length > 0) {
            fetchSubData();
        }
    }, [pageNum, sub]);

    // 메인 상품
    const fetchMainData = async () => {
        try {
            const mainProducts = await getMain(pageNum, main);
            setMainProduct(mainProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        if (main.length > 0) {
            fetchMainData();
        }
    }, [pageNum, main]);

    // 필터 적용
    useEffect(() => {
        if (sub.length > 0) {
            setDisplayProducts(subProduct);
        } else if (main.length > 0) {
            setDisplayProducts(mainProduct);
        } else {
            setDisplayProducts(allProduct);
        }
    }, [allProduct, subProduct, mainProduct, sub, main]);

    // 필터링 적용
    const changeFilter = (e, items) => {
        if (items[0] === LABEL_DATA[0].id) {
            setMain(items);
            setSub([]);
        } else if (items[0] === LABEL_DATA[1].id) {
            setMain(items);
            setSub([]);
        } else if (items[0] === LABEL_DATA[2].id) {
            setMain(items);
            setSub([]);
        } else {
            setSub(items);
            setMain([]);
        }
    };

    const [click, setClick] = useState([]);

    // 초기화
    const resetFilters = () => {
        setSub([]);
        setMain([]);
        setClick([]);
    };

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
                                    selectedItems={sub}
                                ></RichTreeView>
                            </Box>
                        </div>
                    </div>
                    <div className="w80p">
                        <Box className="box">
                            <Box className="product-wrap no-wrap">
                                {displayProducts.map((list) => (
                                    <div
                                        className="product"
                                        key={list.productId}
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
