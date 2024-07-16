import React, { useState } from "react";
import useCouponEvent from "hooks/useCouponEvent";
import { useNavigate } from "react-router-dom";
import jwtAxios from "pages/user/jwtUtil";
import couponDownBtn from "assets/images/coupon_down.svg";
import "styles/event.css";
import { getCookie } from "pages/user/cookieUtil";
import { SERVER_URL } from "api/serverApi";

export default function Event() {
    const { coupons } = useCouponEvent();
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
            <div className="bg bg-gray">
                <div className="event-banner"></div>
                <div className="container fle column-direction justify-center align-center">
                    <div></div>
                    <div className="text-center">
                        <div className="text-box">
                            <span className="text40 fc-blue">
                                매일매일{" "}
                                <span className="fc-black">진행되는</span>
                            </span>
                            <p className="text40 fc-black">타임어택 Event!</p>
                        </div>
                    </div>

                    {coupons.map((item) => (
                        <div
                            key={item.couponId}
                            className="flex align-center column-direction justify-center"
                        >
                            <div className="coupon-container">
                                <div className="coupon-content1">
                                    <p className="text60">
                                        {item.amount.toLocaleString()}
                                    </p>
                                    <p className="text18">{item.content}</p>
                                    <p className="text16">
                                        1인당 1장씩 발급 가능
                                    </p>
                                </div>
                                <div
                                    className="coupon-content2"
                                    onClick={() =>
                                        handleCouponIssue(item.couponId)
                                    }
                                >
                                    <div className="coupon-downBtn">
                                        <img src={couponDownBtn} alt="coupon" />
                                    </div>
                                    <div className="issue">
                                        <p className="issue-p">발급</p>
                                    </div>
                                </div>
                            </div>
                            <p className="exp text16">
                                쿠폰은 발급일로부터 7일 이내에 사용 가능합니다.
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bottom-box"></div>
            </div>
        </>
    );
}
