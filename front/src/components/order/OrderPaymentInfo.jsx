import { useState, useEffect } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import jwtAxios from "utils/jwtUtil";

const OrderPaymentInfo = ({
    bidPrice,
    fee,
    couponDiscountType,
    couponAmount,
    orderData,
    amount,
    setAmount,
    isDisabled,
}) => {
    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const customerKey = "HOytG9DDEHHgTxwNS0YWT";

    console.log("bidPrice===" + bidPrice);
    console.log("orderData===" + JSON.stringify(orderData, null, 2));
    const [couponDiscount, setCouponDiscount] = useState(0);
    // const [amount, setAmount] = useState({
    //     currency: "KRW",
    //     value: 0,
    // });
    const immediateBuyPrice = parseInt(bidPrice) || 0;
    const deliveryFee = 3000;
    const [payment, setPayment] = useState(null);

    // async function saveOrderData() {
    //     try {
    //         const response = await jwtAxios.post(
    //             `bid/buyingBidding/register`, // 주문 정보를 저장하는 API 엔드포인트
    //             orderData
    //         );
    //         return response.data; // 서버에서 반환한 주문 ID
    //     } catch (error) {
    //         console.error("Error saving order data:", error);
    //         throw error; // 오류가 발생하면 결제 요청을 진행하지 않음
    //     }
    // }
    async function saveOrderData() {
        try {
            let type = "buy";
            console.log("endorderData===" + JSON.stringify(orderData, null, 2));
            let endpoint = "bid/buyingBidding/register"; // 기본 엔드포인트

            // orderData에 따라 엔드포인트 변경
            if (orderData.salesBiddingId) {
                type = "buyNow";
                endpoint = "bid/buyNow";
            }

            const response = await jwtAxios.post(endpoint, orderData);
            return response.data; // 서버에서 반환한 주문 ID
        } catch (error) {
            console.error("Error saving order data:", error);
            throw error; // 오류가 발생하면 결제 요청을 진행하지 않음
        }
    }

    const calculateTotalAmount = () => {
        let total = immediateBuyPrice + deliveryFee + fee;
        let discount = 0;
        console.log("couponDiscountType====" + couponDiscountType);

        if (couponDiscountType === "PERCENT") {
            discount = (total * couponAmount) / 100;
        } else {
            discount = couponAmount;
        }

        total -= discount;
        total = total > 0 ? total : 0;

        return {
            totalAmount: Math.round(total),
            discount: discount,
        };
    };

    async function requestPayment() {
        if (!payment) {
            console.error("Payment object is not initialized.");
            return;
        }

        try {
            const orderId = await saveOrderData();
            console.log(typeof amount.value);
            await payment.requestPayment({
                method: "CARD",
                amount: amount,
                orderId: "Zi9UdirQdheViE-1c0oca1" + orderId,
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/success",
                failUrl: window.location.origin + "/fail",
                customerEmail: "이메일을 입력해주세요.",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error("Error requesting payment:", error);
        }
    }

    useEffect(() => {
        const { totalAmount, discount } = calculateTotalAmount();
        setAmount({
            currency: "KRW",
            value: totalAmount,
        });
        setCouponDiscount(discount);
    }, [couponDiscountType, couponAmount, bidPrice, fee]);

    useEffect(() => {
        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                const payment = tossPayments.payment({
                    customerKey,
                });
                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchPayment();
    }, []);

    return (
        <>
            <div className="final_order_info_area info_area">
                <h3 className="title_txt">최종 주문 정보</h3>
                <div className="order_main_title">
                    <div className="order_item">
                        <p className="desc">즉시 구매가</p>
                        <p className="desc bold">
                            {Number(bidPrice).toLocaleString()}원
                        </p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">검수비</p>
                        <p className="desc">무료</p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">수수료</p>
                        <p className="desc">{fee.toLocaleString()}원</p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">배송비</p>
                        <p className="desc">3,000원</p>
                    </div>
                    <div className="order_item">
                        <p className="sub_text">쿠폰 사용</p>
                        <p className="coupon_use desc">
                            {couponDiscount > 0
                                ? `-${couponDiscount.toLocaleString()}원`
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="order_payment_area info_area">
                <div className="order_box">
                    <p className="pay_text16">총 결제금액</p>
                    <p className="pay_text20">
                        {amount.value.toLocaleString()}원
                    </p>
                </div>
            </div>
            <div className="final_payment_btn info_area">
                <div className="pay_btn_box">
                    <button
                        className="pay_btn"
                        // disabled={
                        //     !orderData.addressId ||
                        //     !orderData.productId ||
                        //     !orderData.price
                        // }
                        disabled={isDisabled}
                        onClick={requestPayment}
                    >
                        {amount.value.toLocaleString()}원 • 일반배송 결제하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrderPaymentInfo;
