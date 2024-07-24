import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import '../../styles/productBid.css';

export default function ProductBid() {
    const location = useLocation();
    const data = location.state || {}; // 데이터가 없을 경우 기본값 설정
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const isSales = type === 'sales'; // 판매 경로인지 확인
    const [currentForm, setCurrentForm] = useState(type === 'buy' ? 'buy' : 'sell'); // 현재 폼 상태 관리
    const [selectedDays, setSelectedDays] = useState(1); // 선택된 입찰 마감 기한 일수
    const [endDate, setEndDate] = useState(""); // 마감 기한 날짜 문자열
    const [bidPrice, setBidPrice] = useState(""); // 희망가 입력 필드 상태

    useEffect(() => {
        setCurrentForm(type === 'buy' ? 'buy' : 'sell');
    }, [type]);

    useEffect(() => {
        calculateEndDate(selectedDays);
    }, [selectedDays]);

    if (!data.productImg) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

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
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        setEndDate(`${year}/${month}/${day}`);
    };

    const handleBidPriceChange = (e) => {
        setBidPrice(e.target.value);
    };

    const handleSubmit = () => {
        const productId = currentForm === 'buy' ? data.buyingProductId : data.salesProductId;
        alert(`희망가: ${bidPrice.toLocaleString()}\n입찰 마감기한: ${selectedDays}일\n제품 ID: ${data.modelNum}\n상품 고유 ID : ${productId}`);
    };

    const handleInstantSubmit = () => {
        const productId = currentForm === 'buy_now' ? data.salesProductId : data.buyingProductId;
        const biddingPrice = currentForm === 'buy_now' ? data.buyingBiddingPrice : data.salesBiddingPrice;
        alert(`희망가: ${biddingPrice.toLocaleString()}\n상품 고유 ID : ${productId}`);
    };

    const isBuyNowDisabled = currentForm === 'buy_now' && !data.salesBiddingPrice;
    const isSellNowDisabled = currentForm === 'sell_now' && !data.buyingBiddingPrice;

    return (
        <Box className="product_bid_page">
            <div className='bid_form'>
                <div className="product_info_area">
                    <div className="product_info">
                        <div className='product'>
                            <div className="product_img">
                                <img src={data.productImg} alt={data.productName} className='product_img' />
                            </div>
                        </div>
                        <div className="product_detail">
                            <strong className="model_number">
                                <p>모델 번호: {data.modelNum}</p>
                            </strong>
                            <p className='model_title'>
                                {data.productName}
                            </p>
                            <p className='model_desc'>
                                {data.productSize}
                            </p>
                        </div>
                    </div>

                    <div className="price_box">
                        <ul className='price_list'>
                            <li className='list_item'>
                                <p className='title'>즉시 구매가</p>
                                <span className='price'>{data.buyingBiddingPrice}</span>
                                <span className='unit'>원</span>
                            </li>
                            <li className='list_item'>
                                <p className='title'>즉시 판매가</p>
                                <span className='price'>{data.salesBiddingPrice}</span>
                                <span className='unit'>원</span>
                            </li>
                        </ul>
                        <div className="instant_group">
                            <div className={`tab_area ${isSales ? 'sell_tab' : 'buy_tab'}`}>
                                <ul role="tablist" className='tab_list'>
                                    <li
                                        role='tab'
                                        aria-selected={currentForm === (isSales ? 'sell' : 'buy')}
                                        aria-controls='panel1'
                                        className={`item ${currentForm === (isSales ? 'sell' : 'buy') ? 'on' : ''}`}
                                        onClick={() => handleTabChange(isSales ? 'sell' : 'buy')}
                                    >
                                        <span className='item_link'>{isSales ? '판매 입찰' : '구매 입찰'}</span>
                                    </li>
                                    <li
                                        role='tab'
                                        aria-selected={currentForm === (isSales ? 'sell_now' : 'buy_now')}
                                        aria-controls='panel2'
                                        className={`item ${currentForm === (isSales ? 'sell_now' : 'buy_now') ? 'on' : ''}`}
                                        onClick={() => handleTabChange(isSales ? 'sell_now' : 'buy_now')}
                                    >
                                        <span className='item_link'>{isSales ? '즉시 판매' : '즉시 구매'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {currentForm === 'buy' && !isSales && (
                    <div className="buy_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>구매 희망가</dt>
                                <dd className='price'>
                                    <input type="text" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" required="required" placeholder="희망가 입력" autoComplete="off" className="input_amount" onChange={handleBidPriceChange} value={bidPrice} />
                                    <span className='unit'>원</span>
                                </dd>
                            </dl>

                            <div className="price_bind">
                                <p className="price_bind_empty">총 결제금액은 다음 화면에서 계산됩니다.</p>
                            </div>
                        </div>

                        <div className="deadline_info_area">
                            <div className="section-title">
                                <h3 className='title_text'>입찰 마감기한</h3>
                            </div>
                            <div className="section-content">
                                <div className="bid_deadline">
                                    <p className='deadline_txt'>{selectedDays}일 ({endDate} 마감)</p>
                                    <div className="deadline_tab">
                                        <button onClick={() => handleDaysChange(1)} className={`btn outlinegrey medium ${selectedDays === 1 ? 'is_active' : ''}`}>1</button>
                                        <button onClick={() => handleDaysChange(3)} className={`btn outlinegrey medium ${selectedDays === 3 ? 'is_active' : ''}`}>3</button>
                                        <button onClick={() => handleDaysChange(7)} className={`btn outlinegrey medium ${selectedDays === 7 ? 'is_active' : ''}`}>7</button>
                                        <button onClick={() => handleDaysChange(30)} className={`btn outlinegrey medium ${selectedDays === 30 ? 'is_active' : ''}`}>30</button>
                                        <button onClick={() => handleDaysChange(60)} className={`btn outlinegrey medium ${selectedDays === 60 ? 'is_active' : ''}`}>60</button>
                                        <button onClick={() => handleDaysChange(90)} className={`btn outlinegrey medium ${selectedDays === 90 ? 'is_active' : ''}`}>90</button>
                                        <button onClick={() => handleDaysChange(180)} className={`btn outlinegrey medium ${selectedDays === 180 ? 'is_active' : ''}`}>180</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="buy_total_confirm">
                            <div className="price_total">
                                <dl className="price_box price_empty">
                                    <dt className="price_title">총 결제금액</dt>
                                    <dd className="price_empty_desc">다음 화면에서 확인</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bid_confirm">
                            <a href="#" className="blind full solid false"> 계속하기 </a>
                            <button type="button" className="btn full solid" onClick={handleSubmit}> 구매 입찰 계속 </button>
                        </div>
                    </div>
                )}

                {currentForm === 'sell' && isSales && (
                    <div className="sell_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>판매 희망가</dt>
                                <dd className='price'>
                                    <input type="text" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" required="required" placeholder="희망가 입력" autoComplete="off" className="input_amount" onChange={handleBidPriceChange} value={bidPrice} />
                                    <span className='unit'>원</span>
                                </dd>
                            </dl>

                            <div className="price_bind">
                                <p className="price_bind_empty">총 결제금액은 다음 화면에서 계산됩니다.</p>
                            </div>
                        </div>

                        <div className="deadline_info_area">
                            <div className="section-title">
                                <h3 className='title_text'>입찰 마감기한</h3>
                            </div>
                            <div className="section-content">
                                <div className="bid_deadline">
                                    <p className='deadline_txt'>{selectedDays}일 ({endDate} 마감)</p>
                                    <div className="deadline_tab">
                                        <button onClick={() => handleDaysChange(1)} className={`btn outlinegrey medium ${selectedDays === 1 ? 'is_active' : ''}`}>1</button>
                                        <button onClick={() => handleDaysChange(3)} className={`btn outlinegrey medium ${selectedDays === 3 ? 'is_active' : ''}`}>3</button>
                                        <button onClick={() => handleDaysChange(7)} className={`btn outlinegrey medium ${selectedDays === 7 ? 'is_active' : ''}`}>7</button>
                                        <button onClick={() => handleDaysChange(30)} className={`btn outlinegrey medium ${selectedDays === 30 ? 'is_active' : ''}`}>30</button>
                                        <button onClick={() => handleDaysChange(60)} className={`btn outlinegrey medium ${selectedDays === 60 ? 'is_active' : ''}`}>60</button>
                                        <button onClick={() => handleDaysChange(90)} className={`btn outlinegrey medium ${selectedDays === 90 ? 'is_active' : ''}`}>90</button>
                                        <button onClick={() => handleDaysChange(180)} className={`btn outlinegrey medium ${selectedDays === 180 ? 'is_active' : ''}`}>180</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="buy_total_confirm">
                            <div className="price_total">
                                <dl className="price_box price_empty">
                                    <dt className="price_title">총 결제금액</dt>
                                    <dd className="price_empty_desc">다음 화면에서 확인</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bid_confirm">
                            <a href="#" className="blind full solid false"> 계속하기 </a>
                            <button type="button" className="btn full solid" onClick={handleSubmit}> 판매 입찰 계속 </button>
                        </div>
                    </div>
                )}

                {currentForm === 'buy_now' && !isSales && (
                    <div className="buy_now_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>즉시 구매가</dt>
                                <dd className='price'>
                                    <span className='price'>{data.buyingBiddingPrice}</span>
                                    <span className='unit'>원</span>
                                </dd>
                            </dl>

                            <div className="price_bind">
                                <p className="price_bind_empty">총 결제금액은 다음 화면에서 계산됩니다.</p>
                            </div>
                        </div>

                        <div className="buy_total_confirm">
                            <div className="price_total">
                                <dl className="price_box price_empty">
                                    <dt className="price_title">총 결제금액</dt>
                                    <dd className="price_empty_desc">다음 화면에서 확인</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bid_confirm">
                            <a href="#" className="blind full solid false"> 계속하기 </a>
                            <button
                                type="button"
                                className={`btn full solid ${isBuyNowDisabled ? 'disabled' : ''}`}
                                onClick={handleInstantSubmit}
                                disabled={isBuyNowDisabled}
                            >
                                즉시 구매 계속
                            </button>
                        </div>
                    </div>
                )}

                {currentForm === 'sell_now' && isSales && (
                    <div className="sell_now_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>즉시 판매가</dt>
                                <dd className='price'>
                                    <span className='price'>{data.salesBiddingPrice}</span>
                                    <span className='unit'>원</span>
                                </dd>
                            </dl>

                            <div className="price_bind">
                                <p className="price_bind_empty">총 결제금액은 다음 화면에서 계산됩니다.</p>
                            </div>
                        </div>

                        <div className="buy_total_confirm">
                            <div className="price_total">
                                <dl className="price_box price_empty">
                                    <dt className="price_title">총 결제금액</dt>
                                    <dd className="price_empty_desc">다음 화면에서 확인</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bid_confirm">
                            <a href="#" className="blind full solid false"> 계속하기 </a>
                            <button
                                type="button"
                                className={`btn full solid ${isSellNowDisabled ? 'disabled' : ''}`}
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
