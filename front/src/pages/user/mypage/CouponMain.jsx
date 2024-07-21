import React, { useState } from "react";
import useUserCoupon from "hooks/useUserCoupon";
import { useNavigate } from "react-router-dom";
import jwtAxios from "pages/user/jwtUtil";
import "styles/coupon.css";
import { getCookie } from "pages/user/cookieUtil";
import { SERVER_URL } from "api/serverApi";
import CouponCountdown from "components/CountDown";
export default function Event() {
    const { coupons } = useUserCoupon();
    const navigate = useNavigate();

    return (
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
                            {item.discountType === "PERCENT" ? "%" : "원"}
                        </p>
                        {/* <p className="coupon-title">
                            {item.coupon.couponTitle}
                        </p> */}
                        <p className="coupon-content">{item.coupon.content}</p>
                        {/* <p className="text16">1인당 1장씩 발급 가능</p> */}
                    </div>
                    <div className="mypage-coupon-content2">
                        <p className="coupon-exp">
                            <CouponCountdown
                                startDate={item.coupon.startDate}
                                endDate={item.coupon.endDate}
                            />
                        </p>
                        <p className="coupon-endDate">
                            {item.coupon.endDate.replace(/T/, " ")} 까지
                        </p>
                    </div>
                    {/* </div> */}
                </div>
            ))}
        </div>
    );
}
