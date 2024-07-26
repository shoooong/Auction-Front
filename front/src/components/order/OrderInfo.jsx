import useBid from "hooks/useBid";
import useOrderApi from "api/order/useOrderApi";
const OrderInfo = ({ Order }) => {
    console.log(Order);
    return (
        <div className="order_info_box">
            <div className="total_box">
                <p className="total_pay">총 결제금액</p>
                <p className="total_pay pay_end">{Order?.orderPirce}</p>
            </div>
            <div className="final_info">
                <div className="order_item">
                    <p className="sub_text">입찰 희망가</p>
                    <p className="desc">
                        {Order?.buyingBidding.buyingBiddingPrice}
                    </p>
                </div>
                <div className="order_item">
                    <p className="sub_text">검수비</p>
                    <p className="desc">무료</p>
                </div>
                <div className="order_item">
                    <p className="sub_text">배송비</p>
                    <p className="desc">3,000원</p>
                </div>
                <div className="order_item">
                    <p className="sub_text">쿠폰 사용</p>
                    <p className="coupon_use desc">
                        {Order?.coupon.Amount > 0
                            ? `-${Order?.coupon.Amount.toLocaleString()}원`
                            : "-"}
                    </p>
                    {/* <p className="coupon_use desc">원</p> */}
                </div>
                <div className="line"></div>
                <div className="order_item">
                    <p className="sub_text">입찰 마감기한</p>
                    {/* <p className="coupon_use desc">
                                {couponAmount > 0
                                    ? `-${couponAmount.toLocaleString()}원`
                                    : "-"}
                            </p> */}
                    <p className="sub_text desc">
                        {Order?.buyingBidding.buyingBiddingTime}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default OrderInfo;
