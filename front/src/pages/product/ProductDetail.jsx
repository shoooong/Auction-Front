import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import { getCookie } from "utils/cookieUtil";
import jwtAxios from "utils/jwtUtil";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

import useCustomLogin from "hooks/useCustomLogin";

import {
    Box,
    Dialog,
    DialogTitle,
    Button,
    ToggleButton,
    TextField,
    DialogActions,
    DialogContent,
} from "@mui/material";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

const CLOUD_STORAGE_BASE_URL =
    "https://kr.object.ncloudstorage.com/push/shooong/products/";

const ProductDetails = () => {
    const { modelNum } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [tabValue, setTabValue] = useState(1);
    const [subTabValue, setSubTabValue] = useState(1);
    const [visibleItems, setVisibleItems] = useState(5);
    const [openPopup, setOpenPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentTab, setCurrentTab] = useState("all");
    const [popupContent, setPopupContent] = useState("contract");
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviewImg, setReviewImg] = useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
    const [bookmarkSize, setBookmarkSize] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [bookmarkCount, setBookmarkCount] = useState(0); // 북마크 개수 상태 추가
    const [isBookmarked, setIsBookmarked] = useState(false); 

    const { exceptionHandler } = useCustomLogin();

    const checkIfBookmarked = async () => {
        try {
            const response = await jwtAxios.get(`/product/bookmark/exists`, {
                params: { modelNum }
            });
            setIsBookmarked(response.data);
        } catch (error) {
            console.error("Error checking bookmark status:", error);
        }
    };

    useEffect(() => {
        const checkUser = () => {
            const userInfo = getCookie("user");
            if (userInfo && userInfo.accessToken) {
                setIsLoggedIn(true);
                checkIfBookmarked();
            }
        };
        checkUser();
        fetchProductDetails();
        fetchBookmarkCount();
    }, [modelNum]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/products/detailInfo/${modelNum}`
            );
            setProduct(response.data);
            console.log("Fetched Product:", response.data); // product 객체 확인
        } catch (error) {
            console.error("Error fetching product details: ", error);
        }
    };

    const fetchBookmarkCount = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/product/bookmarkCount`,
                {
                    params: { modelNum },
                }
            );
            setBookmarkCount(response.data);
        } catch (error) {
            console.error("Error fetching bookmark count:", error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleMoreReviews = () => {
        setVisibleReviews((prev) => prev + 5);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSubTabChange = (event, newValue) => {
        setSubTabValue(newValue);
        setVisibleItems(5);
    };

    const handleMoreItems = (tab) => {
        setPopupContent(tab);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const getChartData = (tab) => {
        let data = [];
        switch (tab) {
            case 1:
                data = product.averagePriceResponseList.threeDayPrices;
                break;
            case 2:
                data = product.averagePriceResponseList.oneMonthPrices;
                break;
            case 3:
                data = product.averagePriceResponseList.sixMonthPrices;
                break;
            case 4:
                data = product.averagePriceResponseList.oneYearPrices;
                break;
            case 5:
                data = product.averagePriceResponseList.totalExecutionPrice;
                break;
            default:
                data = product.averagePriceResponseList.threeDayPrices;
        }

        if (!data || data.length === 0) {
            return {
                labels: ["데이터 없음"],
                datasets: [
                    {
                        label: "거래 가격",
                        data: [0],
                        borderColor: "rgba(255,100,150,1)",
                        backgroundColor: "rgba(50,1,192,0.2)",
                        borderWidth: 2,
                        pointRadius: 1,
                        lineTension: 0.2,
                    },
                ],
            };
        }

        const formattedData = data.map((item) => ({
            contractDateTime: item.contractDateTime,
            averagePrice: item.averagePrice || 0, // 평균값이 없을 경우 0으로 설정
        }));

        // 데이터가 한 개일 경우 추가 포인트 생성
        if (formattedData.length === 1) {
            const singlePoint = formattedData[0];
            formattedData.push({
                ...singlePoint,
                contractDateTime: `${singlePoint.contractDateTime} 23:59:59`,
            });
        }

        // 최소값과 최대값을 계산하여 차트의 y축을 설정
        const minPrice = Math.min(
            ...formattedData.map((item) => item.averagePrice)
        );
        const maxPrice = Math.max(
            ...formattedData.map((item) => item.averagePrice)
        );

        return {
            labels: formattedData.map((item) => item.contractDateTime),
            datasets: [
                {
                    label: "거래 가격",
                    data: formattedData.map((item) => item.averagePrice),
                    borderColor: "rgba(255,100,150,1)",
                    backgroundColor: "rgba(50,1,192,0.2)",
                    borderWidth: 2,
                    pointRadius: 1,
                    lineTension: 0.2,
                },
            ],
            options: {
                scales: {
                    y: {
                        min: minPrice > 0 ? 0 : minPrice,
                        max: maxPrice,
                    },
                },
            },
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `거래 가격: ${context.raw}원`;
                    },
                },
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: true,
                },
            },
        },
    };

    const handleBuySellClick = (type) => {
        setCurrentTab(type);
        setOpen(true);
    };

    const handleToggleButtonChange = (size) => {
        setSelectedSize(size);
    };

    const getSizeOptions = () => {
        if (
            product.subDepartment === "top" ||
            product.subDepartment === "outer" ||
            product.subDepartment === "bottom" ||
            product.subDepartment === "inner" ||
            product.subDepartment === "beauty"
        ) {
            return ["S", "M", "L", "XL", "XXL"];
        } else if (product.subDepartment === "shoes") {
            return [
                "230",
                "235",
                "240",
                "245",
                "250",
                "255",
                "260",
                "270",
                "275",
                "280",
            ];
        } else if (
            product.subDepartment === "kitchen" ||
            product.subDepartment === "interior" ||
            product.subDepartment === "tech"
        ) {
            return ["ONESIZE"];
        } else {
            return [];
        }
    };

    const getSizePrice = (size) => {
        if (currentTab === "buy" || currentTab === "all") {
            const sizeInfo = product.groupBySalesList.find(
                (item) => item.productSize === String(size)
            );
            return sizeInfo ? (
                <span className="red-label">
                    {sizeInfo.productMaxPrice.toLocaleString()} 원
                </span>
            ) : (
                "-"
            );
        } else if (currentTab === "sales") {
            const sizeInfo = product.groupByBuyingList.find(
                (item) => item.productSize === String(size)
            );
            return sizeInfo ? (
                <span className="green-label">
                    {sizeInfo.buyingBiddingPrice.toLocaleString()} 원{" "}
                </span>
            ) : (
                "-"
            );
        }
        return "-";
    };

    const handleReviewDialogOpen = () => {
        setReviewDialogOpen(true);
    };

    const handleReviewDialogClose = () => {
        setReviewDialogOpen(false);
    };

    const handleReviewSubmit = async () => {
        try {
            const formData = new FormData();
            if (reviewImg) {
                formData.append("temp_image_data", reviewImg);
            }
            formData.append("reviewContent", reviewContent);

            const response = await jwtAxios.post(
                `/products/details/${modelNum}/review`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Review submitted successfully:", response.data);
            setReviewImg(null);
            setReviewContent("");
            setReviewDialogOpen(false);
            fetchProductDetails(); // 리뷰 제출 후 상품 정보를 다시 불러옵니다.
        } catch (error) {
            exceptionHandler(error);
            if (error.response && error.response.status === 409) {
                alert("리소스 충돌이 발생했습니다.");
            } else if (error.response && error.response.status === 401) {
                alert("인증 오류가 발생했습니다. 다시 로그인해 주세요.");
            } else {
                console.error("Error submitting review: ", error);
            }
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setReviewImg(file);
        }
    };

    const handleConfirmClick = () => {
        const userInfo = getCookie("user");
        if (!userInfo || !userInfo.accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/user/login");
            return;
        }

        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }

        const simplifiedSize = selectedSize.replace("size-", ""); // 'size-' 부분 제거
        console.log("Simplified Size:", simplifiedSize);

        const buyingProduct = product.groupByBuyingList.find(
            (item) => item.productSize === simplifiedSize
        );
        const salesProduct = product.groupBySalesList.find(
            (item) => item.productSize === simplifiedSize
        );

        console.log("Selected Buying Product:", buyingProduct);
        console.log("Selected Sales Product:", salesProduct);

        const size = simplifiedSize;
        const type = currentTab === "buy" ? "buy" : "sales";
        const buyingBiddingPrice = buyingProduct
            ? buyingProduct.buyingBiddingPrice
            : null;
        const buyProductId = buyingProduct ? buyingProduct.buyProductId : null;
        const salesBiddingPrice = salesProduct
            ? salesProduct.productMaxPrice
            : null;
        const salesProductId = salesProduct
            ? salesProduct.salesProductId
            : null;

        const selectedProductId =
            currentTab === "buy"
                ? buyingProduct
                    ? buyingProduct.productId
                    : product.productId
                : salesProduct
                ? salesProduct.productId
                : product.productId;

        console.log("ProductID 상품 고유 :", selectedProductId);
        console.log("Model Number:", modelNum);
        console.log("Buying Bidding Price:", buyingBiddingPrice);
        console.log("Sales Bidding Price:", salesBiddingPrice);
        console.log("Buying Product ID:", buyProductId);
        console.log("Sales Product ID:", salesProductId);

        const state = {
            productId: selectedProductId,
            productImg: product.productImg,
            productName: product.productName,
            modelNum: product.modelNum,
            productSize: size,
            buyingBiddingPrice: buyingBiddingPrice
                ? buyingBiddingPrice.toLocaleString()
                : null,
            buyingProductId: buyProductId,
            salesProductId: salesProductId,
            salesBiddingPrice: salesBiddingPrice
                ? salesBiddingPrice.toLocaleString()
                : null,
            userId: userInfo.userId,
            currentTab: currentTab,
            biddingPrice:
                currentTab === "buy" ? buyingBiddingPrice : salesBiddingPrice,
        };

        const mainDepartmentPath = product.mainDepartment
            ? product.mainDepartment
            : "clothes"; // mainDepartment가 없으면 기본값을 'clothes'로 설정
        navigate(
            `/${mainDepartmentPath}/details/${modelNum}/bid?size=${size}&type=${type}`,
            { state }
        );
        console.log("전송");
    };

    const handleLikeClick = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/like/${modelNum}`);
            if (response.status === 200) {
                setIsLiked(true);
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    productLike: (prevProduct.productLike || 0) + 1,
                }));
            }
        } catch (error) {
            console.error("Error liking product:", error);
        }
    };

    const handleBookmarkClick = () => {
        setBookmarkModalOpen(true);
    };

    const handleBookmarkClose = () => {
        setBookmarkModalOpen(false);
        setBookmarkSize(null);
    };

    const handleBookmarkSave = async () => {
        if (!bookmarkSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }

        const userInfo = getCookie("user");
        if (!userInfo || !userInfo.accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/user/login");
            return;
        }

        try {
            const response = await jwtAxios.post(`/product/bookmark`, null, {
                params: {
                    modelNum: modelNum,
                    productSize: bookmarkSize,
                },
            });

            if (response.status === 200 || response.status === 204) {
                alert("관심상품으로 저장되었습니다.");
                setBookmarkModalOpen(false);
                setBookmarkSize(null);
                fetchBookmarkCount();
                setIsBookmarked(true);
                window.location.reload();
            } else {
                alert("관심상품으로 저장되었습니다.");
                window.location.reload();
            }
        } catch (error) {
            console.error("요청 오류:", error);
            alert("요청 처리 중 오류가 발생했습니다.");
            window.location.reload();
        }
    };
    return (
        <Box className="product-detail container">
            <div className="flex">
                <div className="w50p pdr30">
                    <div className="pos-sticky">
                        <div className="product-img-100">
                            <img
                                src={`${CLOUD_STORAGE_BASE_URL}${product.productImg}`}
                                alt="Sample Product"
                            />
                        </div>
                    </div>
                </div>
                <div className="w50p pdl30 border-h-line">
                    <div>
                        <h4 className="grey-label fw400">즉시 구매가</h4>
                        <p className="big-size-price">
                            {product.salesBiddingPrice
                                ? product.salesBiddingPrice.toLocaleString()
                                : "-"}{" "}
                            원
                        </p>
                        <p className="text-desc">{product.productName}</p>
                        <Box
                            className="popup space-between align-center mb40"
                            onClick={() => handleBuySellClick("all")}
                        >
                            모든 사이즈
                            <span className="popup-icon"></span>
                        </Box>
                        <div className="grid grid-column-4 mb40">
                            <div className="item">
                                <p
                                    className="grey-label fw300"
                                    style={{ marginBottom: "3px" }}
                                >
                                    최근 거래가
                                </p>
                                <p
                                    className="black-label fw300"
                                    style={{ marginBottom: "8px" }}
                                >
                                    {product.latestPrice
                                        ? product.latestPrice.toLocaleString()
                                        : "-"}
                                    원
                                </p>
                                <p
                                    className={`${
                                        product.differenceContract < 0
                                            ? "blue-label"
                                            : product.differenceContract > 0
                                            ? "red-label"
                                            : "black-label"
                                    }`}
                                >
                                    {product.differenceContract !== null &&
                                    product.differenceContract !== undefined
                                        ? product.differenceContract.toLocaleString()
                                        : "-"}
                                    <span style={{ paddingLeft: "3px" }}>
                                        (
                                        {product.changePercentage !== null &&
                                        product.changePercentage !== undefined
                                            ? product.changePercentage
                                            : "-"}
                                        %)
                                    </span>
                                </p>
                            </div>
                            <div className="item border-h-line pdl20">
                                <p
                                    className="grey-label fw300"
                                    style={{ marginBottom: "3px" }}
                                >
                                    발매가
                                </p>
                                <p className="black-label fw300">
                                    {product.originalPrice
                                        ? product.originalPrice.toLocaleString()
                                        : "-"}
                                    원
                                </p>
                            </div>
                            <div className="item border-h-line pdl20">
                                <p
                                    className="grey-label fw300"
                                    style={{ marginBottom: "3px" }}
                                >
                                    모델 번호
                                </p>
                                <p className="black-label fw300">
                                    {product.modelNum}
                                </p>
                            </div>
                            <div className="item border-h-line pdl20">
                                <p
                                    className="grey-label fw300"
                                    style={{ marginBottom: "3px" }}
                                >
                                    출시일
                                </p>
                                <p className="black-label fw300">
                                    {product.createDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-column-2 grid-gap-x20">
                        <button
                            className="align-center inline-flex flex-start buy-btn btn btn-text"
                            style={{ marginBottom: "20px" }}
                            onClick={() => handleBuySellClick("buy")}
                        >
                            구매
                            <span>
                                <span>
                                    {product.salesBiddingPrice.toLocaleString()
                                        ? product.salesBiddingPrice.toLocaleString()
                                        : "-"}
                                    원
                                </span>
                                즉시 구매가
                            </span>
                        </button>
                        <button
                            className="align-center inline-flex flex-start sell-btn btn btn-text"
                            style={{ marginBottom: "20px" }}
                            onClick={() => handleBuySellClick("sales")}
                        >
                            판매
                            <span>
                                <span>
                                    {product.buyingBiddingPrice.toLocaleString()
                                        ? product.buyingBiddingPrice.toLocaleString()
                                        : "-"}
                                    원
                                </span>
                                즉시 판매가
                            </span>
                        </button>
                    </div>

                    <div className="mb40">
                        {/* 정식이 파트 */}
                        <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary btn full-btn border-btn align-center css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            tabIndex="0"
                            type="button"
                            onClick={handleLikeClick}
                        >
                            <span>
                                <img
                                    src={
                                        isLiked
                                            ? "/static/media/heart-filled.svg"
                                            : "/static/media/heart-empty.svg"
                                    }
                                    alt="Like"
                                />
                            </span>
                            좋아요
                            <span>{product.productLike || 0}</span>
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                        </button>
                        <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary btn full-btn border-btn align-center css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            tabIndex="0"
                            type="button"
                            onClick={handleBookmarkClick}
                        >
                            <img src={isBookmarked ? BookmarkOn : BookmarkOff} alt="Bookmark Icon" />
                            {isBookmarked ? "관심상품" : "관심상품 취소"}
                            <span>{bookmarkCount}</span>
                        </button>
                        {/* 정식이 파트 */}
                    </div>

                    <div
                        className="product-tab"
                        style={{ marginBottom: "20px" }}
                    >
                        <Tabs defaultValue={1} onChange={handleTabChange}>
                            <TabsList className="tabs-list">
                                <Tab value={1}>3일</Tab>
                                <Tab value={2}>1개월</Tab>
                                <Tab value={3}>6개월</Tab>
                                <Tab value={4}>1년</Tab>
                                <Tab value={5}>전체</Tab>
                            </TabsList>
                            <TabPanel value={1}>
                                <Line
                                    data={getChartData(1)}
                                    options={chartOptions}
                                />
                            </TabPanel>
                            <TabPanel value={2}>
                                <Line
                                    data={getChartData(2)}
                                    options={chartOptions}
                                />
                            </TabPanel>
                            <TabPanel value={3}>
                                <Line
                                    data={getChartData(3)}
                                    options={chartOptions}
                                />
                            </TabPanel>
                            <TabPanel value={4}>
                                <Line
                                    data={getChartData(4)}
                                    options={chartOptions}
                                />
                            </TabPanel>
                            <TabPanel value={5}>
                                <Line
                                    data={getChartData(5)}
                                    options={chartOptions}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>

                    <div className="product-tab">
                        <Tabs defaultValue={1} onChange={handleSubTabChange}>
                            <TabsList className="tabs-list">
                                <Tab value={1}>체결 거래</Tab>
                                <Tab value={2}>판매 입찰</Tab>
                                <Tab value={3}>구매 입찰</Tab>
                            </TabsList>
                            <TabPanel value={1}>
                                <div className="contract-info">
                                    <table>
                                        <colgroup>
                                            <col width="60%" />
                                            <col width="20%" />
                                            <col width="20%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>거래가</th>
                                                <th>거래일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.contractInfoList
                                                .slice(0, visibleItems)
                                                .map((info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.productContractPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {
                                                                info.productContractDate
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    {visibleItems <
                                        product.contractInfoList.length && (
                                        <Button
                                            className="full-btn border-btn align-center pdy10"
                                            style={{ marginTop: "15px" }}
                                            onClick={() =>
                                                handleMoreItems("contract")
                                            }
                                        >
                                            체결 내역 더보기
                                        </Button>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel value={2}>
                                <div className="contract-info">
                                    <table>
                                        <colgroup>
                                            <col width="60%" />
                                            <col width="20%" />
                                            <col width="20%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>판매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.buyingHopeList
                                                .slice(0, visibleItems)
                                                .map((info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.buyingBiddingPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {info.buyingQuantity}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    {visibleItems <
                                        product.buyingHopeList.length && (
                                        <button
                                            className="more-info-btn"
                                            onClick={() =>
                                                handleMoreItems("sales")
                                            }
                                        >
                                            판매 내역 더보기
                                        </button>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel value={3}>
                                <div className="contract-info">
                                    <table>
                                        <colgroup>
                                            <col width="60%" />
                                            <col width="20%" />
                                            <col width="20%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>구매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.salesHopeList
                                                .slice(0, visibleItems)
                                                .map((info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.salesBiddingPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {
                                                                info.buyingQuantity
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    {visibleItems <
                                        product.salesHopeList.length && (
                                        <Button
                                            className="full-btn border-btn align-center pdy10"
                                            style={{ marginTop: "15px" }}
                                            onClick={() =>
                                                handleMoreItems("buying")
                                            }
                                        >
                                            구매 내역 더보기
                                        </Button>
                                    )}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="mb80">
                {isLoggedIn && (
                    <Button
                        className="small-btn cancel-btn"
                        style={{ marginTop: "40px" }}
                        onClick={handleReviewDialogOpen}
                    >
                        스타일 리뷰 작성
                    </Button>
                )}
                <div className="grid grid-column-5 grid-gap-x20">
                    {product.photoReviewList &&
                    product.photoReviewList.length > 0
                        ? product.photoReviewList
                              .slice(0, visibleReviews)
                              .map((review, index) => (
                                  <div key={index}>
                                      <div className="product-img-230">
                                          <img
                                              src={`${CLOUD_STORAGE_BASE_URL}${review.reviewImg}`}
                                              alt={`Review ${index + 1}`}
                                              className="object-fit-scale-down"
                                          />
                                      </div>
                                      <p className="text-review text-ellipsis">
                                          {review.reviewContent}
                                      </p>
                                  </div>
                              ))
                        : ""}
                </div>

                {visibleReviews < product.photoReviewList.length && (
                    <Button
                        className="full-btn border-btn align-center pdy20"
                        style={{ marginTop: "20px" }}
                        onClick={handleMoreReviews}
                    >
                        더보기
                    </Button>
                )}
            </div>

            <Dialog open={reviewDialogOpen} onClose={handleReviewDialogClose}>
                <div className="popup-title-box">
                    <DialogTitle>스타일 리뷰 작성</DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={handleReviewDialogClose}
                    ></Button>
                </div>
                <Box className="popup-content">
                    {/* <div className="profile-input-container">
                        <input
                            type="file"
                            id="file-input"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-input"
                            className="profile-input-label"
                        >
                            파일 선택
                        </label>
                    </div> */}
                    <div className="inline-flex align-end w100p">
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className="w30p inline-flex">
                            {reviewImg && (
                                <img
                                    src={URL.createObjectURL(reviewImg)}
                                    alt="Review Preview"
                                    className="w100p"
                                />
                            )}
                        </div>
                    </div>
                    <textarea
                        className="textarea"
                        placeholder="리뷰 내용"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </Box>

                <div className="popup-bottom justify-center">
                    <Button
                        onClick={handleReviewSubmit}
                        className="confirm-btn"
                    >
                        <span className="white-label">제출</span>
                    </Button>
                </div>
            </Dialog>

            <Dialog open={openPopup} onClose={handleClosePopup}>
                <div className="popup-title-box">
                    <DialogTitle>
                        {popupContent === "contract"
                            ? "체결 내역"
                            : popupContent === "sales"
                            ? "판매 내역"
                            : "구매 내역"}
                        <span>(가격 단위: 원)</span>
                    </DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={handleClosePopup}
                    ></Button>
                </div>

                <div className="popup-content">
                    <Box className="popup-product flex align-center">
                        <div className="w20p">
                            <img
                                src={
                                    product.productImg
                                        ? `${CLOUD_STORAGE_BASE_URL}${product.productImg}`
                                        : "-"
                                }
                                alt="-"
                                className="w100p"
                                style={{ borderRadius: "4px" }}
                            />
                        </div>
                        <div className="product-info w80p">
                            <span>{product.modelNum}</span>
                            <span>{product.productName}</span>
                        </div>
                    </Box>
                    <div className="product-tab">
                        <Tabs
                            value={popupContent}
                            onChange={(e, val) => setPopupContent(val)}
                        >
                            <TabsList className="tabs-list">
                                <Tab className="mb0" value="contract">
                                    체결 내역
                                </Tab>
                                <Tab className="mb0" value="sales">
                                    판매 입찰
                                </Tab>
                                <Tab className="mb0" value="buying">
                                    구매 입찰
                                </Tab>
                            </TabsList>

                            <TabPanel value="contract">
                                <div className="contract-info scroll">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>거래가</th>
                                                <th>거래일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.contractInfoList.map(
                                                (info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.productContractPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {
                                                                info.productContractDate
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value="sales">
                                <div className="contract-info scroll">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>판매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.salesHopeList.map(
                                                (info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.salesBiddingPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {info.salesQuantity}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value="buying">
                                <div className="contract-info scroll">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>구매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.buyingHopeList.map(
                                                (info, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {info.productSize}
                                                        </td>
                                                        <td>
                                                            {info.buyingBiddingPrice.toLocaleString()}
                                                            원
                                                        </td>
                                                        <td>
                                                            {
                                                                info.buyingQuantity
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

                <div className="popup-bottom justify-center">
                    <Button className="cancel-btn" onClick={handleClosePopup}>
                        <span className="black-label">취소</span>
                    </Button>
                </div>
            </Dialog>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="popup-title-box">
                    <DialogTitle>
                        {currentTab === "buy"
                            ? "구매하기"
                            : currentTab === "sales"
                            ? "판매하기"
                            : "모든 사이즈"}
                        <span>(가격 단위: 원)</span>
                    </DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={() => setOpen(false)}
                    ></Button>
                </div>

                <div className="popup-content">
                    <Box className="popup-product flex align-center">
                        <div className="w20p">
                            <div>
                                <img
                                    src={
                                        product.productImg
                                            ? `${CLOUD_STORAGE_BASE_URL}${product.productImg}`
                                            : "-"
                                    }
                                    alt={product.productName}
                                    className="w100p"
                                    style={{ borderRadius: "4px" }}
                                />
                            </div>
                        </div>
                        <div className="product-info w80p">
                            <span>{product.modelNum}</span>
                            <span>{product.productName}</span>
                        </div>
                    </Box>

                    <div className="scroll">
                        <div className="grid grid-column-4 grid-gap-x12">
                            {getSizeOptions().map((size, index) => (
                                <ToggleButton
                                    key={index}
                                    value={`size-${size}`}
                                    selected={selectedSize === `size-${size}`}
                                    onChange={() =>
                                        handleToggleButtonChange(`size-${size}`)
                                    }
                                    className="btn toggle-btn"
                                >
                                    <span className="black-label">{size}</span>
                                    <span className="red-label">
                                        {getSizePrice(size)}
                                    </span>
                                </ToggleButton>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="popup-bottom"></div>

                {currentTab !== "all" && (
                    <div className="popup-bottom justify-center">
                        <Button
                            className="cancel-btn"
                            onClick={() => setOpen(false)}
                        >
                            <span className="black-label">취소</span>
                        </Button>
                        <Button
                            className="confirm-btn"
                            onClick={handleConfirmClick}
                        >
                            <span className="white-label">확인</span>
                        </Button>
                    </div>
                )}
            </Dialog>

            <Dialog open={bookmarkModalOpen} onClose={handleBookmarkClose}>
                <DialogTitle>관심상품 저장</DialogTitle>
                <DialogContent>
                    <div className="scroll size-buttons">
                        {getSizeOptions().map((size, index) => (
                            <ToggleButton
                                key={index}
                                value={size}
                                selected={bookmarkSize === size}
                                onChange={() => setBookmarkSize(size)}
                                className="btn toggle-btn"
                            >
                                <span className="black-label">{size}</span>
                            </ToggleButton>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBookmarkClose}>취소</Button>
                    <Button onClick={handleBookmarkSave}>저장</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductDetails;
