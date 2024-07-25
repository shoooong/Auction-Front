import prImg from "assets/images/sample.png";
import postImg from "assets/images/icon-post.png";

import arrowImg from "assets/images/arrow2.svg";
import "styles/order.css";
import useSell from "hooks/useSell";
import { useEffect, useState } from "react";
import { Button, Box, Dialog, DialogTitle } from "@mui/material";
import OrderAddressComponent from "components/OrderAddressComponent";
import jwtAxios from "pages/user/jwtUtil";
import { SERVER_URL } from "../../api/serverApi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Event from "pages/user/mypage/CouponMain";
// import Postcode from "components/mypage/Postcode";
// ------  SDK 초기화 ------

// import useAddress from "hooks/useAddress";

export default function Sell() {
    const location = useLocation();
    const data = location.state || {};

    const navigate = useNavigate();
    const [open2, setOpen2] = useState(false);
    const [fee, setFee] = useState(0);
    // const [totalPrice, setTotalPrice] = useState(0);

    // const [open2, setOpen2] = useState(false);
    const { salesBidding, addressInfo } = useSell();

    const [orderData, setOrderData] = useState({
        productId: null,
        price: null,
        exp: 90,
        addressId: null,
    });

    useEffect(() => {
        console.log("Received data in Sell component:", data);
    }, [data]);

    useEffect(() => {
        if (addressInfo && salesBidding) {
            const calculatedFee = salesBidding.salesBiddingPrice * 0.04;
            setFee(calculatedFee);
            setOrderData((prevData) => ({
                ...prevData,
                addressId: addressInfo.addressId,
                productId: salesBidding.product.productId,
                price: salesBidding.salesBiddingPrice - calculatedFee,
                exp: 90,
            }));
        }
    }, [addressInfo, salesBidding]);
    // console.log(salesBidding);
    // console.log(addressInfo);
    // console.log(salesBidding?.product.productId);

    console.log(orderData);

    const handleSell = async () => {
        try {
            // 1단계: 입찰 정보 생성
            const orderResponse = await jwtAxios.post(
                `/bid/salesBidding/register`,
                orderData
            );

            // 성공 메시지
            alert("주문이 성공적으로 생성되었습니다.");
            navigate("/event");
        } catch (error) {
            console.error("주문 생성 중 오류가 발생했습니다.", error);
            alert("주문 생성 중 오류가 발생했습니다.");
        }
    };

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
                                {salesBidding?.product.modelNum}
                            </p>
                            <p className="model_eng">
                                {salesBidding?.product.productName}
                            </p>
                            <p className="model_kor">
                                {salesBidding?.product.productName}
                            </p>
                            <p className="size_txt">
                                {salesBidding?.product.productSize}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="account_info_area info_area">
                    <div className="account_info">
                        <h3 className="title_txt">판매 정산 계좌</h3>
                        <div className="info_box">
                            <dt className="buy_title">계좌</dt>
                            <dd className="desc">우리은행 1002960016078</dd>
                        </div>
                        <div className="info_box">
                            <dt className="buy_title">예금주</dt>
                            <dd className="desc">정종욱</dd>
                        </div>
                    </div>
                    <div className="account_btn btn_box">
                        <button className="btn_edit border_box">변경</button>
                    </div>
                </div>
                <div className="delivery_info_area info_area">
                    <div className="delivery_address_info">
                        <div className="delivery_title">
                            <h3 className="title_txt">반송 주소</h3>
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
                                    <button
                                        className="btn_edit border_box"
                                        onClick={() => setOpen2(true)}
                                    >
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
                        <h3 className="title_txt">발송 방법</h3>
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
                                                택배발송
                                            </span>
                                            <span className="desc">선불</span>
                                        </div>
                                        <p className="sub_text">
                                            착불 발송 시 정산금액에서 차감
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="coupon_info_area info_area">
                    <h3 className="title_txt">할인 혜택</h3>
                    <p className="desc">쿠폰</p>
                </div> */}
                {/* <div className="pay-info-area info_area">
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
                </div> */}

                <div className="final_order_info_area info_area sell_final">
                    <h3 className="title_txt">최종 주문 정보</h3>
                    <div className="order_main_title">
                        <div className="order_item">
                            <p className="desc">판매 희망가</p>
                            <p className="desc bold">
                                {salesBidding?.salesBiddingPrice.toLocaleString()}
                                원
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
                        <p className="pay_text20">
                            {orderData?.price?.toLocaleString()}원
                        </p>
                    </div>
                </div>
                <div className="final_payment_btn info_area">
                    <div className="pay_btn_box">
                        <button
                            className="pay_btn"
                            onClick={handleSell}
                            disabled={
                                !orderData.addressId ||
                                !orderData.productId ||
                                !orderData.price
                            }
                        >
                            {orderData?.price?.toLocaleString()}원 • 판매하기
                        </button>
                    </div>
                </div>
            </div>

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
            <Dialog
                open={open2}
                onClose={() => setOpen2(false)}
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
                <OrderAddressComponent />
            </Dialog>
        </div>
    );
}
