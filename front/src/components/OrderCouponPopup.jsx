import React from "react";

import CouponDday from "components/CouponDday";
import useUserCoupon from "hooks/useUserCoupon";

import "styles/order.css";
import "styles/order_coupon.css";

const OrderCouponPopup = ({ onSelectCoupon }) => {
    const { coupons } = useUserCoupon();

    return (
        <div className="order-coupon-main-container">
            {coupons.map((item) => (
                <div
                    key={item.coupon.couponId}
                    className="order-coupon-container"
                    onClick={() => onSelectCoupon(item.coupon)}
                >
                    <div className="order-coupon-content1">
                        <p className="coupon-amount">
                            {item.coupon.amount.toLocaleString()}
                            {item.coupon.discountType === "PERCENT"
                                ? "%"
                                : "원"}
                        </p>
                        <p className="coupon-content">{item.coupon.content}</p>
                        <div className="event_label">사용가능</div>
                        <div className="coupon_condition">
                            • 모든 상품에 사용 가능
                        </div>
                    </div>
                    <div className="order-coupon-content2">
                        <p className="coupon-exp">
                            <CouponDday
                                startDate={item.coupon.startDate}
                                endDate={item.coupon.endDate}
                            />
                        </p>
                        <p className="coupon-endDate">
                            {item.coupon.endDate.replace(/T/, " ")} 까지
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default OrderCouponPopup;
