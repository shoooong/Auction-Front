import React, { useState } from "react";
import useUserCoupon from "hooks/useUserCoupon";
import { useNavigate } from "react-router-dom";
import jwtAxios from "pages/user/jwtUtil";
import "styles/coupon.css";
import { getCookie } from "pages/user/cookieUtil";
import { SERVER_URL } from "api/serverApi";

export default function Event() {
    const { coupons } = useUserCoupon();
    const navigate = useNavigate();

    const handleCouponIssue = async (couponId) => {
        try {
            const userInfo = getCookie("user");

            if (!userInfo || !userInfo.accessToken) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/user/login");
                return;
            }

            const { accessToken } = userInfo;

            const response = await jwtAxios.post(
                `${SERVER_URL}/coupon/${couponId}/issue`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(response.data);
            alert("쿠폰이 발급되었습니다!");
        } catch (error) {
            console.error(error);
            alert("쿠폰 발급에 실패했습니다.");
        }
    };

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
                        </p>
                        {/* <p className="coupon-title">
                            {item.coupon.couponTitle}
                        </p> */}
                        <p className="coupon-content">{item.coupon.content}</p>
                        {/* <p className="text16">1인당 1장씩 발급 가능</p> */}
                    </div>
                    <div
                        className="mypage-coupon-content2"
                        onClick={() => handleCouponIssue(item.coupon.couponId)}
                    >
                        <p className="coupon-exp">D-1</p>
                        <p className="coupon-endDate">{item.endDate}</p>
                    </div>
                    {/* </div> */}
                </div>
            ))}
        </div>
    );
}
