import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import jwtAxios from "utils/jwtUtil";
import { getCookie } from "utils/cookieUtil";

import useCouponEvent from "hooks/useCouponEvent";

import couponDownBtn from "assets/images/coupon_down.svg";

export default function Event() {
    const [error, setError] = useState("");
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

            const response = await jwtAxios.post(
                `/coupon/${couponId}/issue`,
                {}
            );

            console.log(response.data);
            alert("쿠폰이 발급되었습니다!");
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
                alert(err.response.data.message);
                console.log(err.response.data);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            <div className="coupon-event bg-gray">
                <div className="event-banner"></div>
                <div className="container">
                    <div className="text-box text-center">
                        <span>
                            <span>매일매일</span> 진행되는
                        </span>
                        <p>타임어택 Event!</p>
                    </div>

                    {coupons.map((item) => (
                        <div key={item.couponId} className="justify-center">
                            <div>
                                <div className="coupon-container">
                                    <div className="coupon-content1">
                                        <h3>
                                            {item.amount.toLocaleString()}
                                            {item.discountType === "PERCENT"
                                                ? "%"
                                                : "원"}
                                        </h3>
                                        <h4 className="text18">
                                            {item.content}
                                        </h4>
                                        <p className="text16">
                                            1인당 1장씩 발급 가능
                                        </p>
                                    </div>
                                    <div
                                        className="coupon-content2 w20p"
                                        onClick={() =>
                                            handleCouponIssue(item.couponId)
                                        }
                                    >
                                        <div className="coupon-downBtn">
                                            <img
                                                src={couponDownBtn}
                                                alt="coupon"
                                            />
                                        </div>
                                        <span className="issue">발급</span>
                                    </div>
                                </div>
                                <p className="exp">
                                    * 쿠폰은 발급일로부터 7일 이내에 사용
                                    가능합니다.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bottom-box"></div>
            </div>
        </>
    );
}
