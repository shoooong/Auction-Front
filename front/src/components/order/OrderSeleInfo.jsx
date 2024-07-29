// import { useState, useEffect, useNavigate } from "react";
import { SalesBidding } from "api/order/useOrderApi";
import { useNavigate } from "react-router-dom";
import jwtAxios from "utils/jwtUtil";

const OrderSaleInfo = ({ bidPrice, fee, orderData, isDisabled }) => {
    const navigate = useNavigate();
    const handleSell = async () => {
        try {
            let Type = "sale";
            let endpoint = "bid/salesBidding/register"; // 기본 엔드포인트
            if (orderData.buyingBiddingId) {
                endpoint = "bid/saleNow";
                Type = "saleNow";
            }
            const response = await jwtAxios
                .post(endpoint, orderData)
                .then((res) => {
                    return res.data;
                });

            console.log("orderData===" + JSON.stringify(orderData, null, 2));
            console.log("response===" + JSON.stringify(response, null, 2));
            alert("주문이 성공적으로 생성되었습니다.");

            navigate("/success", {
                state: { responseData: response, Type: Type },
            });
            // return response.data;
        } catch (error) {
            console.error("주문 생성 중 오류가 발생했습니다.", error);
            alert("주문 생성 중 오류가 발생했습니다.");
        }
    };
    return (
        <>
            <div className="final_order_info_area info_area sell_final">
                <h3 className="title_txt">최종 주문 정보</h3>
                <div className="order_main_title">
                    <div className="order_item">
                        <p className="desc">판매 희망가</p>
                        <p className="desc bold">
                            {bidPrice?.toLocaleString()}원
                        </p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">검수비</p>
                        <p className="desc">무료</p>
                    </div>

                    <div className="order_item">
                        <p className="sub_text">수수료</p>
                        <p className="desc">{fee?.toLocaleString()}원</p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">배송비</p>
                        <p className="desc">선불 · 판매자 부담</p>
                    </div>
                </div>
            </div>
            <div className="order_payment_area info_area">
                <div className="order_box">
                    <p className="pay_text16">정산금액</p>
                    <p className="pay_text20">{bidPrice?.toLocaleString()}원</p>
                </div>
            </div>
            <div className="final_payment_btn info_area">
                <div className="pay_btn_box">
                    <button
                        className="pay_btn"
                        onClick={handleSell}
                        disabled={
                            isDisabled
                            // !orderData?.addressId ||
                            // !orderData?.productId ||
                            // !orderData?.price
                        }
                    >
                        {bidPrice?.toLocaleString()}원 • 판매하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrderSaleInfo;
