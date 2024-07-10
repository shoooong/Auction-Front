import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import sampleImage from "assets/images/event_banner.svg"; // 이미지 파일 경로를 올바르게 지정
import couponImage from "assets/images/coupon_main.svg"; // 이미지 파일 경로를 올바르게 지정
import "styles/event.css";
import { ACCESS_TOKEN } from "api/serverApi";
import { getCookie } from "pages/user/cookieUtil";
import { SERVER_URL } from "api/serverApi";
export default function EventSample() {
    const navigate = useNavigate();
    const { couponId } = useParams();
    const handleCouponIssue = async () => {
        try {
            const userInfo = getCookie("user");

            if (!userInfo || !userInfo.accessToken) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/user/login");
                return;
            }

            const { accessToken } = userInfo;

            const response = await axios.post(
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
                <div className="container flex justify-center align-center">
                    <div></div>
                    <div>
                        <img src={sampleImage} alt="Sample" />
                    </div>
                    <div className="text-center">
                        <div className="text-box">
                            <span className="text40 fc-blue">
                                매일매일{" "}
                                <span className="fc-black">진행되는</span>
                            </span>
                            <p className="text40 fc-black">타임어택 Event!</p>
                        </div>
                        <button
                            onClick={handleCouponIssue}
                            style={{ border: "none", background: "none" }}
                        >
                            <img src={couponImage} alt="coupon" />
                        </button>
                        <div className="bottom-box"></div>
                    </div>
                    <div className="coupon-container">
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    );
}
