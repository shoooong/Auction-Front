import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "../../styles/productBid.css";
import { SERVER_URL } from "api/serverApi";

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/products/";

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
        if (!isNaN(value)) {
            setBidPrice(Number(value));
        }
    };

    const handleSubmit = async () => {
        const productId =
            currentForm === "buy"
                ? data.buyingProductId || data.productId
                : data.salesProductId || data.productId; // 입찰일 경우 적절한 productId 사용
        const url = currentForm === "buy" ? "/buy" : "/sell";
        const postData = {
            bidPrice,
            selectedDays,
            productId,
        };

        console.log(`Submitting to URL: ${SERVER_URL}${url}`);
        console.log("Post Data:", postData);

        try {
            // 요청이 성공적으로 완료되면 페이지를 이동
            navigate(url, { state: postData });
        } catch (error) {
            console.error("에러 발생:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        }
    };

    const handleInstantSubmit = async () => {
        let productId, biddingPrice, url;

        if (currentForm === "buy_now") {
            productId = data.salesProductId || data.productId; // 즉시 구매가의 ID가 없으면 상품 고유 ID 사용
            biddingPrice = data.salesBiddingPrice || 0; // 즉시 구매가가 없으면 기본값 사용
            url = "/buy";
        } else if (currentForm === "sell_now") {
            productId = data.buyingProductId || data.productId; // 즉시 판매가의 ID가 없으면 상품 고유 ID 사용
            biddingPrice = data.buyingBiddingPrice || 0; // 즉시 판매가가 없으면 기본값 사용
            url = "/sell";
        }

        const postData = {
            biddingPrice,
            productId,
        };

        console.log(`Submitting to URL: ${SERVER_URL}${url}`);
        console.log("Post Data:", postData);

        try {
            // 요청이 성공적으로 완료되면 페이지를 이동
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
        <Box className="product_bid_page">
            <div className="bid_form">
                <div className="product_info_area">
                    <div className="product_info">
                        <div className="product">
                            <div className="product_img">
                                <img
                                    src={
                                        data.productImg
                                            ? `${CLOUD_STORAGE_BASE_URL}${data.productImg}`
                                            : "/path/to/default/image.jpg" // 기본 이미지 경로 설정
                                    }
                                    alt={data.productName}
                                    className="product_img"
                                />
                            </div>
                        </div>
                        <div className="product_detail">
                            <strong className="model_number">
                                <p>모델 번호: {data.modelNum}</p>
                            </strong>
                            <p className="model_title">{data.productName}</p>
                            <p className="model_desc">{data.productSize}</p>
                        </div>
                    </div>

                    <div className="price_box">
                        <ul className="price_list">
                            <li className="list_item">
                                <p className="title">즉시 구매가</p>
                                <span className="price">
                                    {data.salesBiddingPrice
                                        ? data.salesBiddingPrice.toLocaleString()
                                        : "-"}
                                </span>
                                <span className="unit">원</span>
                            </li>
                            <li className="list_item">
                                <p className="title">즉시 판매가</p>
                                <span className="price">
                                    {data.buyingBiddingPrice
                                        ? data.buyingBiddingPrice.toLocaleString()
                                        : "-"}
                                </span>
                                <span className="unit">원</span>
                            </li>
                        </ul>
                        <div className="instant_group">
                            <div
                                className={`tab_area ${
                                    isSales ? "sell_tab" : "buy_tab"
                                }`}
                            >
                                <ul role="tablist" className="tab_list">
                                    <li
                                        role="tab"
                                        aria-selected={
                                            currentForm ===
                                            (isSales ? "sell" : "buy")
                                        }
                                        aria-controls="panel1"
                                        className={`item ${
                                            currentForm ===
                                            (isSales ? "sell" : "buy")
                                                ? "on"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleTabChange(
                                                isSales ? "sell" : "buy"
                                            )
                                        }
                                    >
                                        <span className="item_link">
                                            {isSales
                                                ? "판매 입찰"
                                                : "구매 입찰"}
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
                                            {isSales
                                                ? "즉시 판매"
                                                : "즉시 구매"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {currentForm === "buy" && !isSales && (
                    <div className="buy_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className="price_now_title">구매 희망가</dt>
                                <dd className="price">
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
                                    <span className="unit">원</span>
                                </dd>
                            </dl>

                            <div className="price_bind">
                                <p className="price_bind_empty">
                                    총 결제금액은 다음 화면에서 계산됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="deadline_info_area">
                            <div className="section-title">
                                <h3 className="title_text">입찰 마감 기한</h3>
                            </div>
                            <ul className="deadline_info">
                                <li
                                    className={`item ${
                                        selectedDays === 1 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(1)}
                                >
                                    1일
                                </li>
                                <li
                                    className={`item ${
                                        selectedDays === 3 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(3)}
                                >
                                    3일
                                </li>
                                <li
                                    className={`item ${
                                        selectedDays === 7 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(7)}
                                >
                                    7일
                                </li>
                            </ul>
                            <div className="selected_deadline">
                                <strong className="title">
                                    선택한 마감 기한
                                </strong>
                                <span className="deadline_date">{endDate}</span>
                            </div>
                        </div>
                        <div className="btn_area">
                            <button
                                type="button"
                                className="btn_instant"
                                disabled={isBuyNowDisabled}
                                onClick={handleInstantSubmit}
                            >
                                즉시 구매
                            </button>
                            <button
                                type="button"
                                className="btn_submit"
                                onClick={handleSubmit}
                            >
                                입찰하기
                            </button>
                        </div>
                    </div>
                )}

                {currentForm === "sell" && isSales && (
                    <div className="sell_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className="price_now_title">판매 희망가</dt>
                                <dd className="price">
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
                                    <span className="unit">원</span>
                                </dd>
                            </dl>
                            <div className="price_bind">
                                <p className="price_bind_empty">
                                    총 결제금액은 다음 화면에서 계산됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="deadline_info_area">
                            <div className="section-title">
                                <h3 className="title_text">판매 마감 기한</h3>
                            </div>
                            <ul className="deadline_info">
                                <li
                                    className={`item ${
                                        selectedDays === 1 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(1)}
                                >
                                    1일
                                </li>
                                <li
                                    className={`item ${
                                        selectedDays === 3 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(3)}
                                >
                                    3일
                                </li>
                                <li
                                    className={`item ${
                                        selectedDays === 7 ? "on" : ""
                                    }`}
                                    onClick={() => handleDaysChange(7)}
                                >
                                    7일
                                </li>
                            </ul>
                            <div className="selected_deadline">
                                <strong className="title">
                                    선택한 마감 기한
                                </strong>
                                <span className="deadline_date">{endDate}</span>
                            </div>
                        </div>
                        <div className="btn_area">
                            <button
                                type="button"
                                className="btn_instant"
                                disabled={isSellNowDisabled}
                                onClick={handleInstantSubmit}
                            >
                                즉시 판매
                            </button>
                            <button
                                type="button"
                                className="btn_submit"
                                onClick={handleSubmit}
                            >
                                입찰하기
                            </button>
                        </div>
                    </div>
                )}

                {(currentForm === "buy_now" || currentForm === "sell_now") && (
                    <div className="instant_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className="price_now_title">
                                    {currentForm === "buy_now"
                                        ? "즉시 구매가"
                                        : "즉시 판매가"}
                                </dt>
                                <dd className="price">
                                    {currentForm === "buy_now"
                                        ? data.salesBiddingPrice
                                        : data.buyingBiddingPrice}
                                    <span className="unit">원</span>
                                </dd>
                            </dl>
                        </div>
                        <div className="btn_area">
                            <button
                                type="button"
                                className="btn_instant"
                                onClick={handleInstantSubmit}
                            >
                                {currentForm === "buy_now"
                                    ? "즉시 구매"
                                    : "즉시 판매"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
