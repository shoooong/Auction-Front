import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import { Box, IconButton } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";
import Sample from "assets/images/sample.png";

import "styles/sub.css";

function getItemDescendantsIds(item) {
    const ids = [];
    item.children?.forEach((child) => {
        ids.push(child.id);
        ids.push(...getItemDescendantsIds(child));
    });

    return ids;
}

export default function Shop() {
    const [like, setLike] = useState(false);
    const [product, setProduct] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);
    const toggledItemRef = useRef({});
    const apiRef = useTreeViewApiRef();

    // 무한스크롤
    let num = 0;
    let hasNext = true;
    let isFetching = false;

    // axios
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/shop/all?pageNumber=${num}`
                );

                const data = response.data.content;
                setProduct(data);
                console.log(response);

                // 다음페이지 유무
                // if (response.data.content.length === 0) {
                //     hasNext = false;
                //     return;
                // }

                num++;
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetch();
    }, [num]);

    // 트리뷰
    const MUI_X_PRODUCTS = [
        {
            id: "grid",
            label: "Data Grid",
            children: [
                { id: "grid-community", label: "@mui/x-data-grid" },
                { id: "grid-pro", label: "@mui/x-data-grid-pro" },
                { id: "grid-premium", label: "@mui/x-data-grid-premium" },
            ],
        },
        {
            id: "pickers",
            label: "Date and Time Pickers",
            children: [
                { id: "pickers-community", label: "@mui/x-date-pickers" },
                { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
            ],
        },
        {
            id: "charts",
            label: "Charts",
            children: [{ id: "charts-community", label: "@mui/x-charts" }],
        },
        {
            id: "tree-view",
            label: "Tree View",
            children: [
                { id: "tree-view-community", label: "@mui/x-tree-view" },
            ],
        },
    ];

    const handleItemSelectionToggle = (event, itemId, isSelected) => {
        toggledItemRef.current[itemId] = isSelected;
    };

    const handleSelectedItemsChange = (event, newSelectedItems) => {
        setSelectedItems(newSelectedItems);

        // Select / unselect the children of the toggled item
        const itemsToSelect = [];
        const itemsToUnSelect = {};
        Object.entries(toggledItemRef.current).forEach(
            ([itemId, isSelected]) => {
                const item = apiRef.current.getItem(itemId);
                if (isSelected) {
                    itemsToSelect.push(...getItemDescendantsIds(item));
                } else {
                    getItemDescendantsIds(item).forEach((descendantId) => {
                        itemsToUnSelect[descendantId] = true;
                    });
                }
            }
        );

        const newSelectedItemsWithChildren = Array.from(
            new Set(
                [...newSelectedItems, ...itemsToSelect].filter(
                    (itemId) => !itemsToUnSelect[itemId]
                )
            )
        );

        setSelectedItems(newSelectedItemsWithChildren);

        toggledItemRef.current = {};
    };

    // 무한스크롤
    // scroll.addEventListener("scroll", () => {
    //     if (isFetching || !hasNext) {
    //         return;
    //     }

    //     if (
    //         scroll.scrollTop + scroll.clientHeight + 50 >=
    //         scroll.scrollHeight
    //     ) {
    //         listService.myList();
    //     }
    // });

    return (
        <>
            <div className="container">
                <div className="sub-nav"></div>

                <Box className="flex">
                    <div className="w20p">
                        <div className="tree-view">
                            <b>
                                필터
                                <span>초기화</span>
                            </b>
                            <Box>
                                <RichTreeView
                                    multiSelect
                                    checkboxSelection
                                    apiRef={apiRef}
                                    items={MUI_X_PRODUCTS}
                                    selectedItems={selectedItems}
                                    onSelectedItemsChange={
                                        handleSelectedItemsChange
                                    }
                                    onItemSelectionToggle={
                                        handleItemSelectionToggle
                                    }
                                />
                            </Box>
                        </div>
                    </div>
                    <div className="w80p">
                        <Box className="box">
                            <Box className="product-wrap no-wrap">
                                {product.map((list) => (
                                    <div
                                        className="product"
                                        key={list.productId}
                                    >
                                        <div>
                                            <div className="product-img">
                                                <img
                                                    src={Sample}
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
