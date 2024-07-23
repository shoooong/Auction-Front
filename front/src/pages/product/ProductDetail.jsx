import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import { Box, Dialog, DialogTitle, Button, ToggleButton, TextField } from "@mui/material";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";
import { Line } from 'react-chartjs-2';
import { SERVER_URL } from "../../api/serverApi";
import img1 from "../../assets/images/feed6.png";
import 'chart.js/auto';
import { getCookie } from "../../pages/user/cookieUtil"; // 쿠키 유틸리티를 import

const ProductDetails = () => {
    const { modelNum } = useParams();
    const navigate = useNavigate(); // navigate 함수 추가
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
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [reviewImg, setReviewImg] = useState(null); // 리뷰 이미지
    const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false); // 리뷰 작성 폼 다이얼로그

    useEffect(() => {
        const checkUser = () => {
            const userInfo = getCookie("user");
            if (userInfo && userInfo.accessToken) {
                setIsLoggedIn(true);
            }
        };
        checkUser();
        fetchProductDetails();
    }, [modelNum]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/products/detailInfo/${modelNum}`);
            setProduct(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching product details: ", error);
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
        let data;
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
        return {
            labels: data.map(item => item.contractDateTime),
            datasets: [
                {
                    label: '거래 가격',
                    data: data.map(item => item.averagePrice),
                    borderColor: 'rgba(255,100,150,1)',
                    backgroundColor: 'rgba(50,1,192,0.2)',
                    borderWidth: 2,
                    pointRadius: 1,
                    lineTension: 0.2,
                },
            ],
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
        if (product.subDepartment === 'top' || product.subDepartment === 'outer' || product.subDepartment === 'bottom' || product.subDepartment === 'inner' || product.subDepartment === 'beauty' || product.subDepartment === 'tech') {
            return ['S', 'M', 'L', 'XL', 'XXL'];
        } else if (product.subDepartment === 'shoes') {
            return ['230', '235', '240', '245', '250', '255', '260', '270', '275'];
        } else if (product.subDepartment === 'kitchen' || product.subDepartment === 'interior') {
            return ['oneSize'];
        } else {
            return [];
        }
    };

    const getSizePrice = (size) => {
        if (currentTab === 'buy' || currentTab === 'all') {
            const sizeInfo = product.groupByBuyingList.find(item => item.productSize === String(size));
            return sizeInfo ? <span className="red-label">{sizeInfo.buyingBiddingPrice.toLocaleString()} 원</span> : "-";
        } else if (currentTab === 'sell') {
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
        const userInfo = getCookie("user");
        if (!userInfo || !userInfo.accessToken) {
            alert("로그인이 필요합니다.");
            console.log(modelNum)
            return;
        }
    
        try {
            // 임의의 작은 문자열로 대체하여 테스트
            const smallImgData = "temp_image_data";
    
            await axios.post(`${SERVER_URL}/products/details/${modelNum}/review`, {
                userId: userInfo.userId,
                reviewImg: smallImgData,
                reviewContent,
                productId: product.productId,
            }, {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                    'Content-Type': 'application/json' // JSON 형식의 Content-Type 설정
                }
            });
            // 리뷰를 성공적으로 제출한 후 상태를 초기화하고 폼을 닫습니다.
            setReviewImg(null);
            setReviewContent("");
            setReviewDialogOpen(false);
            fetchProductDetails(); // 리뷰 제출 후 상품 정보를 다시 불러옵니다.
        } catch (error) {
            console.error("Error submitting review: ", error);
            // 409 Conflict 에러 핸들링
            if (error.response && error.response.status === 409) {
                alert('리소스 충돌이 발생했습니다.');
            } else if (error.response && error.response.status === 401) {
                alert('인증 오류가 발생했습니다. 다시 로그인해 주세요.');
            }
        }
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReviewImg(reader.result); // Base64 문자열로 설정
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirmClick = () => {
        const userInfo = getCookie("user");
        if (!userInfo || !userInfo.accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }
    
        // 사이즈 값을 직접 비교합니다.
        const selectedProduct = currentTab === 'buy'
            ? product.groupByBuyingList.find(item => item.productSize === selectedSize)
            : product.groupBySalesList.find(item => item.productSize === selectedSize);
    
        if (!selectedProduct) {
            alert("선택한 사이즈에 해당하는 상품이 없습니다.");
            return;
        }
    
        console.log(modelNum);
        console.log(selectedProduct.buyingBiddingPrice);
        console.log(selectedProduct.salesBiddingPrice);
    
        const size = selectedProduct.productSize;
        const type = currentTab === 'buy' ? 'buy' : 'sales';
    
        navigate(`/products/details/${modelNum}/bid?size=${size}&type=${type}`, {
            state: {
                productImg: product.productImg,
                productName: product.productName,
                modelNum: product.modelNum,
                productSize: size,
                biddingPrice: currentTab === 'buy' ? selectedProduct.buyingBiddingPrice : selectedProduct.salesBiddingPrice,
                productId: selectedProduct.productId,
                userId: userInfo.userId,
                currentTab: currentTab
            }
        });
    };
    
    

    return (
        <Box className="product-page">
            <div className="left-section">
                <div className="img-container pos-sticky">
                    <div className="product-img">
                        <img src={img1} alt="Sample Product" />
                    </div>
                </div>
            </div>
            <div className="right-section">
                <div className="alpha">
                    <div className="price-container">
                        <h4>즉시 구매가</h4>
                        <div className="now-price">
                            <p className="wonSize">{product.buyingBiddingPrice} 원</p>
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
                            <p>{product.latestPrice ? product.latestPrice : "-"}원</p>
                            <p className={`price ${product.differenceContract < 0 ? "negative" : product.differenceContract > 0 ? "positive" : ""}`}>
                                {product.differenceContract !== null && product.differenceContract !== undefined ? product.differenceContract : "-"}
                            </p>
                            <p className={`price ${product.changePercentage < 0 ? "negative" : product.changePercentage > 0 ? "positive" : ""}`}>
                                ({product.changePercentage !== null && product.changePercentage !== undefined ? product.changePercentage : "-"})%
                            </p>
                        </div>
                        <div className="item">
                            <p>발매가</p>
                            <p>{product.originalPrice ? product.originalPrice : "-"}₩</p>
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
                                    <p>{product.buyingBiddingPrice ? product.buyingBiddingPrice : "-"}원</p>
                                </span>
                                즉시 구매가
                            </span>
                        </button>
                        <button className="flex-grow align-center inline-flex flex-start sell-btn btn btn-text" onClick={() => handleBuySellClick('sell')}>
                            판매
                            <span>
                                <span>
                                    <p>{product.salesBiddingPrice ? product.salesBiddingPrice : "-"}원</p>
                                </span>
                                즉시 판매가
                            </span>
                        </button>
                    </div>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary btn full-btn border-btn align-center css-1e6y48t-MuiButtonBase-root-MuiButton-root" tabIndex="0" type="button">
                        <span>
                            <img src="/static/media/bookmark-off.6b051f0a6642a44e2147719b5bbbf331.svg" alt="BookmarkOff" />
                        </span>
                        관심상품
                        <span>3,298</span>
                        <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                    </button>
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
                                                    <td>{info.productContractPrice}원</td>
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
                                                    <td>{info.salesBiddingPrice}원</td>
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
                                                    <td>{info.buyingBiddingPrice}원</td>
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
                            <img src={review.reviewImg} alt={`Review ${index + 1}`} />
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
                    {reviewImg && <img src={reviewImg} alt="Review Preview" className="review-preview" />}
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
                        <div className="w20p">
                            <div style={{ background: "#ddd", height: "80px" }}>
                                {product.productImg ? product.productImg : "-"}
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
                                                    <td>{info.productContractPrice}원</td>
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
                                                    <td>{info.salesBiddingPrice}원</td>
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
                                                    <td>{info.buyingBiddingPrice}원</td>
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
                    <Button className="confirm-btn" onClick={handleConfirmClick}>
                        <span className="white-label">확인</span>
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
                                {product.productImg ? product.productImg : "-"}
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
            </Dialog>
        </Box>
    );
};

export default ProductDetails;
