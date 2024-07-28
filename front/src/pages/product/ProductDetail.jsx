import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';

import 'chart.js/auto';

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import { getCookie } from "utils/cookieUtil";
import jwtAxios from "utils/jwtUtil";

import useCustomLogin from "hooks/useCustomLogin";

import { Box, Dialog, DialogTitle, Button, ToggleButton, TextField, DialogActions, DialogContent } from "@mui/material";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";


const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/products/";

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
    const [popupContent, setPopupContent] = useState('contract');
    const [visibleReviews, setVisibleReviews] = useState(4);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviewImg, setReviewImg] = useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
    const [bookmarkSize, setBookmarkSize] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [bookmarkCount, setBookmarkCount] = useState(0); // 북마크 개수 상태 추가

    const { exceptionHandler } = useCustomLogin();

    useEffect(() => {
        const checkUser = () => {
            const userInfo = getCookie("user");
            if (userInfo && userInfo.accessToken) {
                setIsLoggedIn(true);
            }
        };
        checkUser();
        fetchProductDetails();
        fetchBookmarkCount(); // 북마크 개수 가져오기
    }, [modelNum]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/products/detailInfo/${modelNum}`);
            setProduct(response.data);
            console.log("Fetched Product:", response.data); // product 객체 확인
        } catch (error) {
            console.error("Error fetching product details: ", error);
        }
    };

    const fetchBookmarkCount = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/product/bookmarkCount`, {
                params: { modelNum }
            });
            setBookmarkCount(response.data);
        } catch (error) {
            console.error("Error fetching bookmark count:", error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleMoreReviews = () => {
        setVisibleReviews((prev) => prev + 4);
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
                        label: '거래 가격',
                        data: [0],
                        borderColor: 'rgba(255,100,150,1)',
                        backgroundColor: 'rgba(50,1,192,0.2)',
                        borderWidth: 2,
                        pointRadius: 1,
                        lineTension: 0.2,
                    },
                ],
            };
        }

        const formattedData = data.map(item => ({
            contractDateTime: item.contractDateTime,
            averagePrice: item.averagePrice || 0 // 평균값이 없을 경우 0으로 설정
        }));

        // 데이터가 한 개일 경우 추가 포인트 생성
        if (formattedData.length === 1) {
            const singlePoint = formattedData[0];
            formattedData.push({ ...singlePoint, contractDateTime: `${singlePoint.contractDateTime} 23:59:59` });
        }

        // 최소값과 최대값을 계산하여 차트의 y축을 설정
        const minPrice = Math.min(...formattedData.map(item => item.averagePrice));
        const maxPrice = Math.max(...formattedData.map(item => item.averagePrice));

        return {
            labels: formattedData.map(item => item.contractDateTime),
            datasets: [
                {
                    label: '거래 가격',
                    data: formattedData.map(item => item.averagePrice),
                    borderColor: 'rgba(255,100,150,1)',
                    backgroundColor: 'rgba(50,1,192,0.2)',
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
        if (product.subDepartment === 'top' || product.subDepartment === 'outer' || product.subDepartment === 'bottom' || product.subDepartment === 'inner' || product.subDepartment === 'beauty') {
            return ['S', 'M', 'L', 'XL', 'XXL'];
        } else if (product.subDepartment === 'shoes') {
            return ['230', '235', '240', '245', '250', '255', '260', '270', '275', '280'];
        } else if (product.subDepartment === 'kitchen' || product.subDepartment === 'interior' || product.subDepartment === 'tech') {
            return ['ONESIZE'];
        } else {
            return [];
        }
    };

    const getSizePrice = (size) => {
        if (currentTab === 'buy' || currentTab === 'all') {
            const sizeInfo = product.groupByBuyingList.find(item => item.productSize === String(size));
            return sizeInfo ? <span className="red-label">{sizeInfo.buyingBiddingPrice.toLocaleString()} 원</span> : "-";
        } else if (currentTab === 'sales') {
            const sizeInfo = product.groupBySalesList.find(item => item.productSize === String(size));
            return sizeInfo ? <span className="green-label">{sizeInfo.productMaxPrice.toLocaleString()} 원 </span> : "-";
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

            const response = await jwtAxios.post(`/products/details/${modelNum}/review`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Review submitted successfully:", response.data);
            setReviewImg(null);
            setReviewContent("");
            setReviewDialogOpen(false);
            fetchProductDetails(); // 리뷰 제출 후 상품 정보를 다시 불러옵니다.
        } catch (error) {
            exceptionHandler(error);
            if (error.response && error.response.status === 409) {
                alert('리소스 충돌이 발생했습니다.');
            } else if (error.response && error.response.status === 401) {
                alert('인증 오류가 발생했습니다. 다시 로그인해 주세요.');
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

        const simplifiedSize = selectedSize.replace('size-', ''); // 'size-' 부분 제거
        console.log("Simplified Size:", simplifiedSize);

        const buyingProduct = product.groupByBuyingList.find(item => item.productSize === simplifiedSize);
        const salesProduct = product.groupBySalesList.find(item => item.productSize === simplifiedSize);

        console.log("Selected Buying Product:", buyingProduct);
        console.log("Selected Sales Product:", salesProduct);

        const size = simplifiedSize;
        const type = currentTab === 'buy' ? 'buy' : 'sales';
        const buyingBiddingPrice = buyingProduct ? buyingProduct.buyingBiddingPrice : null;
        const buyProductId = buyingProduct ? buyingProduct.buyProductId : null;
        const salesBiddingPrice = salesProduct ? salesProduct.productMaxPrice : null;
        const salesProductId = salesProduct ? salesProduct.salesProductId : null;

        const selectedProductId = currentTab === 'buy' ? (buyingProduct ? buyingProduct.productId : product.productId) : (salesProduct ? salesProduct.productId : product.productId);

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
            buyingBiddingPrice: buyingBiddingPrice ? buyingBiddingPrice.toLocaleString() : null,
            buyingProductId: buyProductId,
            salesProductId: salesProductId,
            salesBiddingPrice: salesBiddingPrice ? salesBiddingPrice.toLocaleString() : null,
            userId: userInfo.userId,
            currentTab: currentTab,
            biddingPrice: currentTab === 'buy' ? buyingBiddingPrice : salesBiddingPrice,
        };

        const mainDepartmentPath = product.mainDepartment ? product.mainDepartment : 'clothes'; // mainDepartment가 없으면 기본값을 'clothes'로 설정
        navigate(`/${mainDepartmentPath}/details/${modelNum}/bid?size=${size}&type=${type}`, { state });
        console.log("전송");
    };

    const handleLikeClick = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/like/${modelNum}`);
            if (response.status === 200) {
                setIsLiked(true);
                setProduct(prevProduct => ({
                    ...prevProduct,
                    productLike: (prevProduct.productLike || 0) + 1
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
                    productSize: bookmarkSize
                }
            });

            if (response.status === 200 || response.status === 204) {
                alert("관심상품으로 저장되었습니다.");
                setBookmarkModalOpen(false);
                setBookmarkSize(null);
                fetchBookmarkCount(); // 북마크 개수 업데이트
            } else {
                alert("관심상품으로 저장되었습니다.");
            }
        } catch (error) {
            console.error("요청 오류:", error);
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <Box className="product-page">
            <div className="left-section">
                <div className="img-container pos-sticky">
                    <div className="product-img">
                        <img src={`${CLOUD_STORAGE_BASE_URL}${product.productImg}`} alt="Sample Product" />
                    </div>
                </div>
            </div>
            <div className="right-section">
                <div className="alpha">
                    <div className="price-container">
                        <h4>즉시 구매가</h4>
                        <div className="now-price">
                            <p className="wonSize">{product.buyingBiddingPrice.toLocaleString()} 원</p>
                            <p>{product.productName}</p>
                        </div>
                    </div>
                    <div className="popup space-between MuiBox-root css-0" onClick={() => handleBuySellClick('all')}>
                        모든 사이즈
                        <span className="popup-icon"></span>
                    </div>
                    <div className="product-summary">
                        <div className="item">
                            <p>최근 거래가</p>
                            <p>{product.latestPrice ? product.latestPrice.toLocaleString() : "-"}원</p>
                            <p className={`price ${product.differenceContract < 0 ? "negative" : product.differenceContract > 0 ? "positive" : ""}`}>
                                {product.differenceContract !== null && product.differenceContract !== undefined ? product.differenceContract.toLocaleString() : "-"}
                            </p>
                            <p className={`price ${product.changePercentage < 0 ? "negative" : product.changePercentage > 0 ? "positive" : ""}`}>
                                ({product.changePercentage !== null && product.changePercentage !== undefined ? product.changePercentage : "-"})%
                            </p>
                        </div>
                        <div className="item">
                            <p>발매가</p>
                            <p>{product.originalPrice ? product.originalPrice.toLocaleString() : "-"}원</p>
                        </div>
                        <div className="item">
                            <p>모델 번호</p>
                            <p>{product.modelNum}</p>
                        </div>
                        <div className="item">
                            <p>출시일</p>
                            <p>{product.createDate}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="align-center flex-grow inline-flex flex-start buy-btn btn btn-text" onClick={() => handleBuySellClick('buy')}>
                            구매
                            <span>
                                <span>
                                    <p>{product.buyingBiddingPrice.toLocaleString() ? product.buyingBiddingPrice.toLocaleString() : "-"}원</p>
                                </span>
                                즉시 구매가
                            </span>
                        </button>
                        <button className="flex-grow align-center inline-flex flex-start sell-btn btn btn-text" onClick={() => handleBuySellClick('sales')}>
                            판매
                            <span>
                                <span>
                                    <p>{product.salesBiddingPrice.toLocaleString() ? product.salesBiddingPrice.toLocaleString() : "-"}원</p>
                                </span>
                                즉시 판매가
                            </span>
                        </button>
                    </div>
                    <div className="alpha">
                        <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary btn full-btn border-btn align-center css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            tabIndex="0"
                            type="button"
                            onClick={handleLikeClick}
                        >
                            <span>
                                <img src={isLiked ? "/static/media/heart-filled.svg" : "/static/media/heart-empty.svg"} alt="Like" />
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
                            <span>
                                <img src="/static/media/bookmark-off.6b051f0a6642a44e2147719b5bbbf331.svg" alt="BookmarkOff" />
                            </span>
                            관심상품
                            <span>{bookmarkCount}</span> {/* 북마크 개수를 동적으로 표시 */}
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                        </button>
                        {/* ... 다른 요소들 ... */}
                    </div>
                    <div className="product-tab">
                        <Tabs defaultValue={1} onChange={handleTabChange}>
                            <TabsList className="tabs-list">
                                <Tab value={1}>3일</Tab>
                                <Tab value={2}>1개월</Tab>
                                <Tab value={3}>6개월</Tab>
                                <Tab value={4}>1년</Tab>
                                <Tab value={5}>전체</Tab>
                            </TabsList>
                            <TabPanel value={1}>
                                <Line data={getChartData(1)} options={chartOptions} />
                            </TabPanel>
                            <TabPanel value={2}>
                                <Line data={getChartData(2)} options={chartOptions} />
                            </TabPanel>
                            <TabPanel value={3}>
                                <Line data={getChartData(3)} options={chartOptions} />
                            </TabPanel>
                            <TabPanel value={4}>
                                <Line data={getChartData(4)} options={chartOptions} />
                            </TabPanel>
                            <TabPanel value={5}>
                                <Line data={getChartData(5)} options={chartOptions} />
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="product-tab">
                        <Tabs defaultValue={1} onChange={handleSubTabChange}>
                            <TabsList className="tabs-list">
                                <div className="bid-info">
                                    <Tab value={1}>체결 거래</Tab>
                                </div>
                                <div className="bid-info">
                                    <Tab value={2}>판매 입찰</Tab>
                                </div>
                                <div className="bid-info">
                                    <Tab value={3}>구매 입찰</Tab>
                                </div>
                            </TabsList>
                            <TabPanel value={1}>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>거래가</th>
                                                <th>거래일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.contractInfoList.slice(0, visibleItems).map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.productContractPrice.toLocaleString()}원</td>
                                                    <td>{info.productContractDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {visibleItems < product.contractInfoList.length && (
                                        <button className="more-info-btn" onClick={() => handleMoreItems('contract')}>체결 내역 더보기</button>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel value={2}>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>판매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.salesHopeList.slice(0, visibleItems).map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.salesBiddingPrice.toLocaleString()}원</td>
                                                    <td>{info.salesQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {visibleItems < product.salesHopeList.length && (
                                        <button className="more-info-btn" onClick={() => handleMoreItems('sales')}>판매 내역 더보기</button>
                                    )}
                                </div>
                            </TabPanel>
                            <TabPanel value={3}>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>구매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.buyingHopeList.slice(0, visibleItems).map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.buyingBiddingPrice.toLocaleString()}원</td>
                                                    <td>{info.buyingQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {visibleItems < product.buyingHopeList.length && (
                                        <button className="more-info-btn" onClick={() => handleMoreItems('buying')}>구매 내역 더보기</button>
                                    )}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                {product.photoReviewList && product.photoReviewList.length > 0 ? product.photoReviewList.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className="photo-review">
                        <div className="image-container">
                            <img src={`${CLOUD_STORAGE_BASE_URL}${review.reviewImg}`} alt={`Review ${index + 1}`} />
                        </div>
                        <div className="review-content">
                            <p>{review.reviewContent}</p>
                        </div>
                    </div>
                )) : "-"}
                {visibleReviews < product.photoReviewList.length && (
                    <Button className="more-info-btn" onClick={handleMoreReviews}>
                        더보기
                    </Button>
                )}
                {isLoggedIn && (
                    <Button className="review-btn" onClick={handleReviewDialogOpen}>
                        스타일 리뷰 작성
                    </Button>
                )}
            </div>


            <Dialog open={reviewDialogOpen} onClose={handleReviewDialogClose}>
                <DialogTitle>스타일 리뷰 작성</DialogTitle>
                <Box className="dialog-container">
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                    />
                    {reviewImg && <img src={URL.createObjectURL(reviewImg)} alt="Review Preview" className="review-preview" />}
                    <TextField
                        label="리뷰 내용"
                        multiline
                        rows={4}
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleReviewSubmit} className="submit-btn">
                        제출
                    </Button>
                </Box>
            </Dialog>

            <Dialog open={openPopup} onClose={handleClosePopup}>
                <div className="popup-title-box">
                    <DialogTitle>
                        {popupContent === 'contract' ? '체결 내역' : popupContent === 'sales' ? '판매 내역' : '구매 내역'}<span>(가격 단위: 원)</span>
                    </DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={handleClosePopup}
                    ></Button>
                </div>

                <div className="popup-content">
                    <Box className="popup-product flex align-center">
                        <div className="w20p" >
                            <div style={{ background: "#ddd", height: "80px" }}>
                                <img src={product.productImg ? `${CLOUD_STORAGE_BASE_URL}${product.productImg}` : "-"} alt="-" style={{ width: "100px" }} />
                            </div>
                        </div>
                        <div className="product-info w80p">
                            <p>{product.modelNum}</p>
                            <p>{product.productName}</p>
                        </div>
                    </Box>
                    <Tabs value={popupContent} onChange={(e, val) => setPopupContent(val)}>
                        <TabsList className="tabs-list">
                            <div className="bid-info">
                                <Tab value='contract'>체결 내역</Tab>
                            </div>
                            <div className="bid-info">
                                <Tab value='sales'>판매 입찰</Tab>
                            </div>
                            <div className="bid-info">
                                <Tab value='buying'>구매 입찰</Tab>
                            </div>
                        </TabsList>
                        <div className="scroll">
                            <TabPanel value='contract'>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>거래가</th>
                                                <th>거래일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.contractInfoList.map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.productContractPrice.toLocaleString()}원</td>
                                                    <td>{info.productContractDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value='sales'>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>판매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.salesHopeList.map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.salesBiddingPrice.toLocaleString()}원</td>
                                                    <td>{info.salesQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value='buying'>
                                <div className="contract-info">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>구매 희망가</th>
                                                <th>수량</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.buyingHopeList.map((info, index) => (
                                                <tr key={index}>
                                                    <td>{info.productSize}</td>
                                                    <td>{info.buyingBiddingPrice.toLocaleString()}원</td>
                                                    <td>{info.buyingQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>

                <div className="popup-bottom justify-center">
                    <Button
                        className="cancel-btn"
                        onClick={handleClosePopup}
                    >
                        <span className="black-label">취소</span>
                    </Button>
                </div>
            </Dialog>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="popup-title-box">
                    <DialogTitle>
                        {currentTab === 'buy' ? <span className="red-label">구매하기</span> : currentTab === 'sales' ? <span className="green-label">판매하기</span> : '모든 사이즈'}<span>(가격 단위: 원)</span>
                    </DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={() => setOpen(false)}
                    ></Button>
                </div>

                <div className="popup-content">
                    <Box className="popup-product flex align-center">
                        <div className="w20p">
                            <div style={{ background: "#ddd", height: "80px" }}>
                                <img
                                    src={product.productImg ? `${CLOUD_STORAGE_BASE_URL}${product.productImg}` : "-"}
                                    alt={product.productName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="product-info w80p">
                            <span>{product.modelNum}</span>
                            <span>{product.productName}</span>
                        </div>
                    </Box>

                    <div className="scroll size-buttons">
                        {getSizeOptions().map((size, index) => (
                            <ToggleButton
                                key={index}
                                value={`size-${size}`}
                                selected={selectedSize === `size-${size}`}
                                onChange={() => handleToggleButtonChange(`size-${size}`)}
                                className="btn toggle-btn"
                            >
                                <span className="black-label">{size}</span>
                                <span className="red-label">{getSizePrice(size)}</span>
                            </ToggleButton>
                        ))}
                    </div>
                </div>

                {currentTab !== 'all' && (
                    <div className="popup-bottom justify-center">
                        <Button
                            className="cancel-btn"
                            onClick={() => setOpen(false)}
                        >
                            <span className="black-label">취소</span>
                        </Button>
                        <Button className="confirm-btn" onClick={handleConfirmClick}>
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
