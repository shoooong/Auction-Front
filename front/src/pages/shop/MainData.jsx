import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";
import { getSub, getAll } from "api/shopApi";

import { Box, IconButton } from "@mui/material";
import { RichTreeView, SimpleTreeView, TreeItem } from "@mui/x-tree-view";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

import "styles/sub.css";

const LABEL_DATA = [
    { id: "상의", label: "상의" },
    { id: "하의", label: "하의" },
    { id: "아우터", label: "아우터" },
    { id: "신발", label: "신발" },
    { id: "이너웨어", label: "이너웨어" },
    { id: "인테리어", label: "인테리어" },
    { id: "키친", label: "키친" },
    { id: "뷰티", label: "뷰티" },
    { id: "테크", label: "테크" },
];

export default function Shop() {
    const [like, setLike] = useState(false);

    // 모든 상품
    const [allProduct, setAllProduct] = useState([]);
    const [subProduct, setSubProduct] = useState([]);
    const [sub, setSub] = useState([]);
    const [click, setClick] = useState(false);

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
    }, [pageNum, click]);

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
        fetchSubData();
    }, [sub]);

    const changeSub = (event, newValue) => {
        setSub(newValue);
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
                                <span
                                    onClick={() => {
                                        setClick(true);
                                    }}
                                >
                                    초기화
                                </span>
                            </b>
                            <Box>
                                <RichTreeView
                                    items={LABEL_DATA}
                                    multiSelect
                                    checkboxSelection
                                    onSelectedItemsChange={changeSub}
                                ></RichTreeView>
                            </Box>
                        </div>
                    </div>
                    <div className="w80p">
                        <Box className="box">
                            <Box className="product-wrap no-wrap">
                                {}
                                {subProduct.map((list) => (
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
