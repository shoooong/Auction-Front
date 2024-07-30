import { useEffect, useState } from "react";

import { Dialog, DialogTitle } from "@mui/material";

import OrderCouponPopup from "components/OrderCouponPopup";

import arrowImg from "assets/images/arrow2.svg";

const OrderCouponInfo = ({
    selectedCoupon,
    setSelectedCoupon,
    setCouponAmount,
    setCouponDiscountType,
}) => {
    const [couponOpen, setCouponOpen] = useState(false);
    const handleSelectCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        setCouponAmount(coupon.amount);
        setCouponDiscountType(coupon.discountType);
        setCouponOpen(false); // 쿠폰 팝업 닫기
        // console.log("coupon====" + coupon);
        console.log("coupon===" + JSON.stringify(coupon, null, 2));
    };

    return (
        <div className="coupon_info_area info_area">
            <h3 className="title_txt">할인 혜택</h3>
            <p className="desc">쿠폰</p>
            <div
                className="coupon_box border_box"
                onClick={() => setCouponOpen(true)}
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
            <Dialog
                open={couponOpen}
                onClose={() => setCouponOpen(false)}
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
                <OrderCouponPopup onSelectCoupon={handleSelectCoupon} />
            </Dialog>
        </div>
    );
};

export default OrderCouponInfo;
