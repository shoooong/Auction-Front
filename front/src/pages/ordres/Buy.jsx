import prImg from "assets/images/sample.png";
import postImg from "assets/images/icon-post.png";
import tossImg from "assets/images/icon-toss.png";
import arrowImg from "assets/images/arrow2.svg";
import "styles/order.css";
import useOrder from "hooks/useOrder";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { Button, Box, Dialog, DialogTitle } from "@mui/material";
import useUserCoupon from "hooks/useUserCoupon";
// import Event from "pages/user/mypage/CouponMain";
import OrderCouponComponent from "components/OrderCouponComponent";
// import Postcode from "components/mypage/Postcode";
// ------  SDK 초기화 ------

// import useAddress from "hooks/useAddress";
import { getCookie } from "pages/user/cookieUtil";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "HOytG9DDEHHgTxwNS0YWT";

export default function Buy() {
    const { coupons } = useUserCoupon();
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);
    // const { handleCancel, isAdding, selectedAddress, handleSave } =
    //     useAddress();
    const [payment, setPayment] = useState(null);
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 50000,
    });

    const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);

    const { buyingBidding, addressInfo } = useOrder();

    const handleSelectCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        setCouponAmount(coupon.amount);
        setOpen(false); // 쿠폰 팝업 닫기
    };
    // SDK 초기화 및 결제 객체 설정
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

    const immediateBuyPrice = buyingBidding?.buyingBiddingPrice || 0;
    const deliveryFee = 3000;
    const fee = 8000;
    const calculateTotalAmount = () => {
        const total = immediateBuyPrice + deliveryFee + fee - couponAmount;
        return total > 0 ? total : 0; // 총 결제 금액이 음수일 수 없으므로 0으로 설정
    };
    useEffect(() => {
        setAmount({
            currency: "KRW",
            value: calculateTotalAmount(),
        });
    }, [couponAmount, buyingBidding?.buyingBiddingPrice]);

    // 결제 요청 함수
    async function requestPayment() {
        if (!payment) {
            console.error("Payment object is not initialized.");
            return;
        }

        try {
            await payment.requestPayment({
                method: "CARD",
                amount: amount,
                orderId: "Zi9UdirQdheViE-1c0oca",
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/success",
                failUrl: window.location.origin + "/fail",
                customerEmail: "customer123@gmail.com",
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

    return (
        <div className="buy_bg">
            <div className="buy_container">
                <div className="product_info_area info_area">
                    <div className="product_info">
                        <div className="buy_product">
                            <img src={prImg} alt="상품 이미지"></img>
                        </div>
                        <div className="product_detail">
                            <p className="product_model_number bold_title">
                                {buyingBidding?.product.modelNum}
                            </p>
                            <p className="model_eng">
                                {buyingBidding?.product.productName}
                            </p>
                            <p className="model_kor">
                                {buyingBidding?.product.productName}
                            </p>
                            <p className="size_txt">
                                {buyingBidding?.product.productSize}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="delivery_info_area info_area">
                    <div className="delivery_address_info">
                        <div className="delivery_title">
                            <h3 className="title_txt">배송 주소</h3>
                            <a href="#" className="add_more_btn sub_text">
                                + 새 주소 추가
                            </a>
                        </div>
                        <div className="delivery_content">
                            <div className="delivery_info">
                                <div className="address-info">
                                    <dl className="info_list">
                                        <div className="info_box">
                                            <dt className="buy_title">
                                                받는 분
                                            </dt>
                                            <dd className="desc">
                                                {addressInfo?.name}
                                            </dd>
                                        </div>
                                        <div className="info_box">
                                            <dt className="buy_title">
                                                연락처
                                            </dt>
                                            <dd className="desc">
                                                {addressInfo?.addrPhone}
                                            </dd>
                                        </div>
                                        <div className="info_box">
                                            <dt className="buy_title">
                                                배송 주소
                                            </dt>
                                            <dd className="desc">
                                                ({addressInfo?.zonecode}
                                                )&nbsp;
                                                {addressInfo?.roadAddress}
                                                &nbsp;
                                                {addressInfo?.detailAddress}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="btn_box">
                                    <button className="btn_edit border_box">
                                        변경
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                <div className="memo_box border_box">
                                    <button class="btn_shipping_memo ">
                                        <span className="shipping_memo">
                                            요청사항 없음
                                        </span>
                                    </button>
                                    <img src={arrowImg} alt="" />
                                </div>
                            </div>
                            <div class="border_line"></div>
                        </div>
                    </div>
                    <div className="delivery_delivery_type_info">
                        <h3 className="title_txt">배송 방법</h3>
                        <div className="delivery_option">
                            <div className="delivery_way">
                                <div className="way_info border_box">
                                    <div className="way_icon">
                                        <img
                                            src={postImg}
                                            class="way_img"
                                        ></img>
                                    </div>
                                    <div className="way_desc flex_space">
                                        <div className="post">
                                            <span className="bold_title">
                                                일반배송
                                            </span>
                                            <span className="desc">
                                                3,000원
                                            </span>
                                        </div>
                                        <p className="sub_text">
                                            검수 후 배송 ・ 5-7일 내 도착 예정
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="coupon_info_area info_area">
                    <h3 className="title_txt">할인 혜택</h3>
                    <p className="desc">쿠폰</p>
                    <div
                        className="coupon_box border_box"
                        onClick={() => setOpen(true)}
                    >
                        {selectedCoupon ? (
                            <button className="btn_shipping_memo">
                                <span>{selectedCoupon.content}</span>
                            </button>
                        ) : (
                            <button className="btn_shipping_memo">
                                <span>사용할 쿠폰을 선택해 주세요.</span>
                            </button>
                        )}
                        <img src={arrowImg} alt="" />
                    </div>
                </div>
                <div className="pay-info-area info_area">
                    <h3 className="title_txt">결제 방법</h3>
                    <div className="main_title">
                        <p className="desc">일반 결제</p>
                        <p className="sub_text">일시불·할부</p>
                    </div>
                    <button className="payment_btn border_box">
                        <span>토스페이</span>
                        <img src={tossImg} class="pay_img"></img>
                    </button>
                    <p className="sub_text">
                        체결 후 결제 정보 변경은 불가하며 분할 납부 변경은
                        카드사 문의 바랍니다. 단, 카드사별 정책에 따라 분할 납부
                        변경 시 수수료가 발생할 수 있습니다.
                    </p>
                </div>

                <div className="final_order_info_area info_area">
                    <h3 className="title_txt">최종 주문 정보</h3>
                    <div className="order_main_title">
                        <div className="order_item">
                            <p className="desc">즉시 구매가</p>
                            <p className="desc bold">
                                {buyingBidding?.buyingBiddingPrice.toLocaleString()}
                                원
                            </p>
                        </div>
                        <div className="order_item">
                            <p className="sub_text">검수비</p>
                            <p className="desc">무료</p>
                        </div>
                        <div className="order_item">
                            <p className="sub_text">수수료</p>
                            <p className="desc">8,000원</p>
                        </div>
                        <div className="order_item">
                            <p className="sub_text">배송비</p>
                            <p className="desc">3,000원</p>
                        </div>
                        <div className="order_item">
                            <p className="sub_text">쿠폰 사용</p>
                            <p className="coupon_use desc">
                                {couponAmount > 0
                                    ? `-${couponAmount.toLocaleString()}원`
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="order_payment_area info_area">
                    <div className="order_box">
                        <p className="pay_text16">총 결제금액</p>
                        <p className="pay_text20">
                            {calculateTotalAmount().toLocaleString()}원
                        </p>
                    </div>
                </div>
                <div className="final_payment_btn info_area">
                    <div className="pay_btn_box">
                        <button className="pay_btn" onClick={requestPayment}>
                            {calculateTotalAmount().toLocaleString()}원 •
                            일반배송 결제하기
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------------------- 쿠폰 팝업창 ------------------*/}
            {/* <Dialog
                open={open}
                PaperProps={{
                    style: {
                        width: "520px", // 원하는 width 값 설정
                        maxWidth: "90vw", // 화면 크기에 따라 최대 너비 조정
                        maxHeight: "800px",
                        borderRadius: "15px",
                    },
                }}
            >
                <div className="popup-title-box">
                    <DialogTitle>쿠폰</DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={() => setOpen(false)}
                    ></Button>
                </div>

                <div className="popup-content">
                    <OrderCouponComponent />
                </div>
                <div className="scroll"></div>
                <div className="popup-bottom"></div>
            </Dialog> */}

            {/* 쿠폰 팝업 */}
            {/* 쿠폰 팝업 */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: {
                        textAlign: "center",
                        width: "520px",
                        maxWidth: "unset",
                        height: "600px",
                        maxHeight: "unset",
                        // borderRadius: "15px",
                    },
                }}
            >
                <DialogTitle>쿠폰 선택</DialogTitle>
                <OrderCouponComponent onSelectCoupon={handleSelectCoupon} />
            </Dialog>

            {/* ----------------------- 배송지 팝업창 ------------------*/}
            {/* <Dialog
                open={open2}
                onClose={handleCancel}
                PaperProps={{
                    style: {
                        width: "100%",
                        maxWidth: "500px",
                        margin: "auto",
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <div className="popup-title-box">
                        <DialogTitle>배송지 관리</DialogTitle>
                        <Button
                            className="popup-close-btn"
                            onClick={() => setOpen2(false)}
                        />
                    </div>

                    <div className="popup-content">
                        {(isAdding || selectedAddress) && (
                            <Postcode
                                onSave={handleSave}
                                selectedAddress={selectedAddress}
                            />
                        )}
                    </div>
                </Box>
            </Dialog> */}
        </div>
    );
}