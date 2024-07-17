import React, { useState } from "react";
import useUserCoupon from "hooks/useUserCoupon";
import { useNavigate } from "react-router-dom";
import jwtAxios from "pages/user/jwtUtil";
import couponDownBtn from "assets/images/coupon_down.svg";
import "styles/event.css";
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
        <>
            {coupons.map((item) => (
                <div
                    key={item.coupon.couponId}
                    className="flex align-center column-direction justify-center"
                >
                    <div className="coupon-container">
                        <div className="coupon-content1">
                            <p className="text60">
                                {item.coupon.amount.toLocaleString()}
                            </p>
                            <p className="text18">{item.coupon.content}</p>
                            {/* <p className="text16">1인당 1장씩 발급 가능</p> */}
                        </div>
                        <div
                            className="coupon-content2"
                            onClick={() =>
                                handleCouponIssue(item.coupon.couponId)
                            }
                        >
                            <div className="coupon-downBtn">
                                {/* <img src={couponDownBtn} alt="coupon" /> */}
                            </div>
                            <div className="issue">
                                {/* <p className="issue-p"></p> */}
                            </div>
                        </div>
                    </div>
                    <p className="exp text16"></p>
                </div>
            ))}
        </>
    );
}
