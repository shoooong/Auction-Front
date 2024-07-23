import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";
import '../../styles/productBid.css'

export default function ProductBid() {
    const location = useLocation();
    const data = location.state || {}; // 데이터가 없을 경우 기본값 설정
    const [currentForm, setCurrentForm] = useState('buy'); // 현재 폼 상태 관리

    if (!data.productImg) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const handleTabChange = (tab) => {
        setCurrentForm(tab);
    };

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
                                <span className='price'>{data.biddingPrice}</span>
                                <span className='unit'>원</span>
                            </li>
                            <li className='list_item'>
                                <p className='title'>즉시 판매가</p>
                                <span className='price'>{data.biddingPrice}</span>
                                <span className='unit'>원</span>
                            </li>
                        </ul>
                        <div className="instant_group">
                            <div className="tab_area buy_tab">
                                <ul role="tablist" className='tab_list'>
                                    <li
                                        role='tab'
                                        aria-selected={currentForm === 'buy'}
                                        aria-controls='panel1'
                                        className={`item ${currentForm === 'buy' ? 'on' : ''}`}
                                        onClick={() => handleTabChange('buy')}
                                    >
                                        <span className='item_link'>구매 입찰</span>
                                    </li>
                                    <li
                                        role='tab'
                                        aria-selected={currentForm === 'sell'}
                                        aria-controls='panel2'
                                        className={`item ${currentForm === 'sell' ? 'on' : ''}`}
                                        onClick={() => handleTabChange('sell')}
                                    >
                                        <span className='item_link'>즉시 구매</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {currentForm === 'buy' && (
                    <div className="buy_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>구매 희망가</dt>
                                <dd className='price'>
                                    <input type="text" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" required="required" placeholder="희망가 입력" autoComplete="off" className="input_amount" />
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
                                    <p className='deadline_txt'>1일</p>
                                    <div className="deadline_tab">
                                        <a href="#" className="btn outlinegrey medium is_active"> 1일 </a>
                                        <a href="#" className="btn outlinegrey medium"> 3일 </a>
                                        <a href="#" className="btn outlinegrey medium"> 5일 </a>
                                        <a href="#" className="btn outlinegrey medium"> 7일 </a>
                                        <a href="#" className="btn outlinegrey medium"> 30일 </a>
                                        <a href="#" className="btn outlinegrey medium"> 180일 </a>
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
                            <button type="button" className="btn full solid false disabled" disabled="disabled"> 구매 입찰 계속 </button>
                        </div>
                    </div>
                )}

                {currentForm === 'sell' && (
                    <div className="sell_form">
                        <div className="price_now">
                            <dl className="price_now_box">
                                <dt className='price_now_title'>즉시 구매가</dt>
                                <dd className='price'>
                                    <span className='price'>{data.biddingPrice}</span>
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
                            <button type="button" className="btn full solid false disabled" disabled="disabled"> 즉시 구매 계속 </button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
