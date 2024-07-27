import React from "react";
import useUserCoupon from "hooks/useUserCoupon";
import { useNavigate } from "react-router-dom";
import "styles/coupon.css";
import CouponDday from "components/CouponDday";

export default function Event() {
    const { coupons } = useUserCoupon();
    const navigate = useNavigate();

    return (
        <>
            <div className="coupon_main_titleBox">
                <h3 className="coupon_main_title">쿠폰</h3>
                <button onClick={() => navigate("/event")}>쿠폰 발급하기</button>
            </div>

            <div className="mypage-coupon-main-container">
                {coupons.map((item) => (
                    // <div key={item.coupon.couponId} className="">
                    <div
                        key={item.coupon.couponId}
                        className="mypage-coupon-container"
                    >
                        <div className="mypage-coupon-content1">
                            <p className="coupon-amount">
                                {item.coupon.amount.toLocaleString()}
                                {item.coupon.discountType === "PERCENT"
                                    ? "%"
                                    : "원"}
                            </p>
                            {/* <p className="coupon-title">
                            {item.coupon.couponTitle}
                        </p> */}
                            <p className="coupon-content">
                                {item.coupon.content}
                            </p>
                            {/* <p className="text16">1인당 1장씩 발급 가능</p> */}
                            <div className="event_label">사용가능</div>
                            <div className="coupon_condition">
                                • 모든 상품에 사용 가능
                            </div>
                        </div>
                        <div className="mypage-coupon-content2">
                            <div className="coupon-exp">
                                <CouponDday
                                    startDate={item.coupon.startDate}
                                    endDate={item.coupon.endDate}
                                />
                            </div>
                            <p className="coupon-endDate">
                                {item.coupon.endDate.replace(/T/, " ")} 까지
                            </p>
                        </div>
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </>
    );
}
