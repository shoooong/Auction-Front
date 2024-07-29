import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SERVER_URL } from "api/serverApi";

import { Box } from "@mui/material";

const CLOUD_STORAGE_BASE_URL =
    "https://kr.object.ncloudstorage.com/push/shooong/products/";

export default function ProductBid() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {}; // 데이터가 없을 경우 기본값 설정
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const isSales = type === "sales"; // 판매 경로인지 확인
    const [currentForm, setCurrentForm] = useState(
        type === "buy" ? "buy" : "sell"
    ); // 현재 폼 상태 관리
    const [selectedDays, setSelectedDays] = useState(1); // 선택된 입찰 마감 기한 일수
    const [endDate, setEndDate] = useState(""); // 마감 기한 날짜 문자열
    const [bidPrice, setBidPrice] = useState(0); // 희망가 입력 필드 상태
    const MIN_BID_PRICE = 20000; // 최소 입찰 희망가를 20000으로 설정

    useEffect(() => {
        setCurrentForm(type === "buy" ? "buy" : "sell");
    }, [type]);

    useEffect(() => {
        calculateEndDate(selectedDays);
    }, [selectedDays]);

    const handleTabChange = (tab) => {
        setCurrentForm(tab);
    };

    const handleDaysChange = (days) => {
        setSelectedDays(days);
    };

    const calculateEndDate = (days) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        setEndDate(`${year}/${month}/${day}`);
    };

    const handleBidPriceChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) >= 0) {
            setBidPrice(Number(value));
        }
    };

    const handleSubmit = async () => {
        if (bidPrice < MIN_BID_PRICE) {
            alert(`입찰 최소 금액은 ${MIN_BID_PRICE.toLocaleString()}원입니다.`);
            return;
        }
    
        const productId = data.productId; // 입찰할 때 상품 고유 ID 사용
        const url = currentForm === "buy" ? "/buy" : "/sell";
        const postData = {
            bidPrice,
            productId,
            selectedDays, // 선택한 입찰 마감 기한 일수 추가
        };
    
        console.log(`Submitting to URL: ${SERVER_URL}${url}`);
        console.log("Post Data:", JSON.stringify(postData));
    
        try {
            navigate(url, { state: postData });
        } catch (error) {
            console.error("에러 발생:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        }
    };

    const handleInstantSubmit = async () => {
        let biddingId, biddingPrice, url, postData;
    
        if (currentForm === "buy_now") {
            biddingId = data.salesProductId || data.productId;
            biddingPrice = data.salesBiddingPrice || 0;
            url = "/buy";
            postData = {
                biddingPrice: parseInt(biddingPrice.toString().replace(/,/g, ''), 10), // 문자열에서 콤마 제거 및 정수 변환
                salesBiddingId: biddingId,
            };
        } else if (currentForm === "sell_now") {
            biddingId = data.buyingProductId || data.productId;
            biddingPrice = data.buyingBiddingPrice || 0;
            url = "/sell";
            postData = {
                biddingPrice: parseInt(biddingPrice.toString().replace(/,/g, ''), 10), // 문자열에서 콤마 제거 및 정수 변환
                buyingBiddingId: biddingId,
            };
        }
    
        console.log(`Submitting to URL: ${SERVER_URL}${url}`);
        console.log("Post Data:", JSON.stringify(postData));
    
        try {
            navigate(url, { state: postData });
        } catch (error) {
            console.error("에러 발생:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        }
    };

    const isBuyNowDisabled =
        currentForm === "buy_now" && !data.salesBiddingPrice;
    const isSellNowDisabled =
        currentForm === "sell_now" && !data.buyingBiddingPrice;

    return (
        <Box className="bg-grey bidding-page">
            <div className="bg-white" style={{ marginBottom: "10px" }}>
                <div className="flex bidding-info-box">
                    <div>
                        <img
                            src={`${CLOUD_STORAGE_BASE_URL}${data.productImg}`}
                            alt={data.productName}
                        />
                    </div>
                    <div className="product-info w80p">
                        <span className="model_number">
                            <p>모델 번호: {data.modelNum}</p>
                        </span>
                        <span className="model_title">{data.productName}</span>
                        <span className="model_desc">{data.productSize}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="price-box">
                    <ul
                        className="flex justify-center"
                        style={{ padding: "30px 0" }}
                    >
                        <li className="text-center w50p">
                            <span className="grey-label miner-size-amount">
                                즉시 구매가
                            </span>
                            <span className="black-label fw400">
                                {data.salesBiddingPrice
                                    ? data.salesBiddingPrice.toLocaleString()
                                    : "-"}
                                원
                            </span>
                        </li>
                        <li className="w50p text-center border-h-line">
                            <span className="grey-label miner-size-amount">
                                즉시 판매가
                            </span>
                            <span className="black-label fw400">
                                {data.buyingBiddingPrice
                                    ? data.buyingBiddingPrice.toLocaleString()
                                    : "-"}
                                원
                            </span>
                        </li>
                    </ul>
                    <div
                        className={`tab_area ${
                            isSales ? "sell_tab" : "buy_tab"
                        }`}
                    >
                        <ul role="tablist" className="tab_list">
                            <li
                                role="tab"
                                aria-selected={
                                    currentForm === (isSales ? "sell" : "buy")
                                }
                                aria-controls="panel1"
                                className={`item ${
                                    currentForm === (isSales ? "sell" : "buy")
                                        ? "on"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleTabChange(isSales ? "sell" : "buy")
                                }
                            >
                                <span className="item_link">
                                    {isSales ? "판매 입찰" : "구매 입찰"}
                                </span>
                            </li>
                            <li
                                role="tab"
                                aria-selected={
                                    currentForm ===
                                    (isSales ? "sell_now" : "buy_now")
                                }
                                aria-controls="panel2"
                                className={`item ${
                                    currentForm ===
                                    (isSales ? "sell_now" : "buy_now")
                                        ? "on"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleTabChange(
                                        isSales ? "sell_now" : "buy_now"
                                    )
                                }
                            >
                                <span className="item_link">
                                    {isSales ? "즉시 판매" : "즉시 구매"}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {currentForm === "buy" && !isSales && (
                    <div className="bidding-form">
                        <div>
                            <b className="black-label fw600">구매 희망가</b>

                            <div>
                                <input
                                    type="number"
                                    pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                                    required="required"
                                    placeholder="희망가 입력"
                                    autoComplete="off"
                                    className="input_amount"
                                    onChange={handleBidPriceChange}
                                    value={bidPrice}
                                />
                                <span>원</span>
                            </div>

                            <p
                                className="grey-label"
                                style={{ margin: "30px 0 60px" }}
                            >
                                총 결제금액은 다음 화면에서 계산됩니다.
                            </p>
                        </div>

                        <div>
                            <span
                                className="black-label fw600"
                                style={{ marginBottom: "10px" }}
                            >
                                입찰 마감기한
                            </span>
                            <div className="bid_deadline">
                                <p
                                    className="black-label"
                                    style={{ marginBottom: "5px" }}
                                >
                                    {selectedDays}일 ({endDate} 마감)
                                </p>
                                <div className="deadline-tab">
                                    <button
                                        onClick={() => handleDaysChange(1)}
                                        className={`btn small-btn ${
                                            selectedDays === 1
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        1
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(3)}
                                        className={`btn small-btn ${
                                            selectedDays === 3
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        3
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(7)}
                                        className={`btn small-btn ${
                                            selectedDays === 7
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        7
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(30)}
                                        className={`btn small-btn ${
                                            selectedDays === 30
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        30
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(60)}
                                        className={`btn small-btn ${
                                            selectedDays === 60
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        60
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(90)}
                                        className={`btn small-btn ${
                                            selectedDays === 90
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        90
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(180)}
                                        className={`btn small-btn ${
                                            selectedDays === 180
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        180
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className="confirm-box"
                            style={{ padding: "40px 35px" }}
                        >
                            <div
                                className="flex space-between"
                                style={{ marginBottom: "16px" }}
                            >
                                <span className="black-label">총 결제금액</span>
                                <span className="grey-label medium-size">
                                    다음 화면에서 확인
                                </span>
                            </div>
                            <div style={{ paddingBottom: "40px" }}>
                                <button
                                    type="button"
                                    className="btn full-btn buy"
                                    onClick={handleSubmit}
                                >
                                    구매 입찰 계속
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentForm === "sell" && isSales && (
                    <div className="bidding-form">
                        <div>
                            <b className="black-label fw600">판매 희망가</b>

                            <div>
                                <input
                                    type="number"
                                    pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                                    required="required"
                                    placeholder="희망가 입력"
                                    autoComplete="off"
                                    className="input_amount"
                                    onChange={handleBidPriceChange}
                                    value={bidPrice}
                                />
                                <span>원</span>
                            </div>

                            <p
                                className="grey-label"
                                style={{ margin: "30px 0 60px" }}
                            >
                                총 결제금액은 다음 화면에서 계산됩니다.
                            </p>
                        </div>

                        <div>
                            <span
                                className="black-label fw600"
                                style={{ marginBottom: "10px" }}
                            >
                                입찰 마감기한
                            </span>
                            <div className="bid_deadline">
                                <p
                                    className="black-label"
                                    style={{ marginBottom: "5px" }}
                                >
                                    {selectedDays}일 ({endDate} 마감)
                                </p>
                                <div className="deadline-tab">
                                    <button
                                        onClick={() => handleDaysChange(1)}
                                        className={`btn small-btn ${
                                            selectedDays === 1
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        1
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(3)}
                                        className={`btn small-btn ${
                                            selectedDays === 3
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        3
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(7)}
                                        className={`btn small-btn ${
                                            selectedDays === 7
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        7
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(30)}
                                        className={`btn small-btn ${
                                            selectedDays === 30
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        30
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(60)}
                                        className={`btn small-btn ${
                                            selectedDays === 60
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        60
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(90)}
                                        className={`btn small-btn ${
                                            selectedDays === 90
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        90
                                    </button>
                                    <button
                                        onClick={() => handleDaysChange(180)}
                                        className={`btn small-btn ${
                                            selectedDays === 180
                                                ? "is_active"
                                                : ""
                                        }`}
                                    >
                                        180
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className="confirm-box"
                            style={{ padding: "40px 35px" }}
                        >
                            <div
                                className="flex space-between"
                                style={{ marginBottom: "16px" }}
                            >
                                <span className="black-label">총 결제금액</span>
                                <span className="grey-label medium-size">
                                    다음 화면에서 확인
                                </span>
                            </div>
                        </div>

                        <div style={{ paddingBottom: "40px" }}>
                            <button
                                type="button"
                                className="btn full-btn sales"
                                onClick={handleSubmit}
                            >
                                판매 입찰 계속
                            </button>
                        </div>
                    </div>
                )}

                {currentForm === "buy_now" && !isSales && (
                    <div className="bidding-form">
                        <div>
                            <b className="black-label fw600">즉시 구매가</b>

                            <div>
                                <span>
                                    {data.salesBiddingPrice
                                        ? data.salesBiddingPrice.toLocaleString()
                                        : "-"}
                                </span>
                                <span>원</span>
                            </div>

                            <p
                                className="grey-label"
                                style={{ margin: "30px 0 60px" }}
                            >
                                총 결제금액은 다음 화면에서 계산됩니다.
                            </p>
                        </div>

                        <div
                            className="confirm-box"
                            style={{ padding: "40px 35px" }}
                        >
                            <div
                                className="flex space-between"
                                style={{ marginBottom: "16px" }}
                            >
                                <span className="black-label">총 결제금액</span>
                                <span className="grey-label medium-size">
                                    다음 화면에서 확인
                                </span>
                            </div>
                            <div style={{ paddingBottom: "40px" }}>
                                <button
                                    type="button"
                                    className={`btn full-btn buy ${
                                        isBuyNowDisabled ? "disabled" : ""
                                    }`}
                                    onClick={handleInstantSubmit}
                                    disabled={isBuyNowDisabled}
                                >
                                    즉시 구매 계속
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentForm === "sell_now" && isSales && (
                    <div className="bidding-form">
                        <div>
                            <b className="black-label fw600">즉시 구매가</b>
                            <div>
                                <span>
                                    {data.buyingBiddingPrice
                                        ? data.buyingBiddingPrice.toLocaleString()
                                        : "-"}
                                </span>
                                <span>원</span>
                            </div>
                            <p
                                className="grey-label"
                                style={{ margin: "30px 0 60px" }}
                            >
                                총 결제금액은 다음 화면에서 계산됩니다.
                            </p>
                        </div>

                        <div
                            className="confirm-box"
                            style={{ padding: "40px 35px" }}
                        >
                            <div
                                className="flex space-between"
                                style={{ marginBottom: "16px" }}
                            >
                                <span className="black-label">총 결제금액</span>
                                <span className="grey-label medium-size">
                                    다음 화면에서 확인
                                </span>
                            </div>
                        </div>
                        <div style={{ paddingBottom: "40px" }}>
                            <button
                                type="button"
                                className={`btn full-btn sales ${
                                    isSellNowDisabled ? "disabled" : ""
                                }`}
                                onClick={handleInstantSubmit}
                                disabled={isSellNowDisabled}
                            >
                                즉시 판매 계속
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
