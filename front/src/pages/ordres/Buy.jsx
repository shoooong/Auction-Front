import prImg from "assets/images/sample.png";
import postImg from "assets/images/icon-post.png";
import tossImg from "assets/images/icon-toss.png";
import arrowImg from "assets/images/arrow.svg";
import "styles/order.css";
import useOrderPage from "hooks/useOrder";
export default function Buy() {
    const { buyingBidding, addressInfo } = useOrderPage();
    console.log(buyingBidding);
    console.log(addressInfo);
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
                                                ({addressInfo?.zonecode})&nbsp;
                                                {addressInfo?.roadAddress}
                                                &nbsp;
                                                {addressInfo?.detailAddress}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="btn_box">
                                    <a href="" className="btn_edit border_box">
                                        변경
                                    </a>
                                </div>
                            </div>
                            <div className="">
                                <div className="memo_box">
                                    <button class="btn_shipping_memo border_box">
                                        <span className="shipping_memo">
                                            요청사항 없음
                                        </span>
                                        {/* <svg></svg> */}
                                    </button>
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
                    <button className="coupon_box btn_shipping_memo border_box">
                        <span>선착순 쿠폰1</span>
                    </button>
                </div>
                <div className="pay-info-area info_area">
                    <h3 className="title_txt">결제 방법</h3>
                    <div className="main_title">
                        <p className="desc">일반 결제</p>
                        <p className="sub_text">일시불-할부</p>
                    </div>
                    <button className="payment_btn border_box">
                        <span>토스페이</span>
                        <img src={tossImg} class="pay_img"></img>
                    </button>
                    <p className="sub_text">
                        체결 후 결제 정보 변경은 불가하며 분할 납부 변경은
                        카드사 문의 바랍니다. 단, 카드사별 정책에 따라 분할 납부
                        변경 시 수수료 가 발생할 수 있습니다.
                    </p>
                </div>
                <div className="final-order-info-arae info_area"></div>
                <div className="order-payment-area info_area"></div>
            </div>
        </div>
    );
}
