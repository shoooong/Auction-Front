import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/inquiry.css'
import InquiryItem from './InquiryItem';

const InquiryPage = () => {
    return (
        <div className="inquiry-page">
            <header className="header">
                <button className="back-button">&lt;</button>
                <h1 className="title">1:1 문의</h1>

            </header>

            <section className="info-section">
                <h2 className="info-title">운영 시간 안내</h2>
                <p className="info-text">접수시간 24시간 접수 가능</p>
                <p className="info-text">답변시간 평일 10:00 - 18:00 (토·일, 공휴일 휴무)</p>
                <p className="info-note">답변시간 이후 접수건은 운영시간 내 순차적으로 답변해드립니다.</p>
            </section>

            <button className="inquiry-button">
                <Link to="/service/inquiryRegistration">
                문의하기
                </Link>
                </button>
                    <InquiryItem />
            <nav className="bottom-nav">
                <Link to="/home" className="nav-item">HOME</Link>
                <Link to="/style" className="nav-item">STYLE</Link>
                <Link to="/shop" className="nav-item">SHOP</Link>
                <Link to="/saved" className="nav-item">SAVED</Link>
                <Link to="/my" className="nav-item">MY</Link>
            </nav>
        </div>
    );
};

export default InquiryPage;
