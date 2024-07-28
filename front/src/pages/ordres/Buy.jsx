import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import OrderProductInfo from "components/order/OrderProdcutInfo";
import OrderAddressInfo from "components/order/OrderAddressInfo";
import useBid from "hooks/useBid";

import "styles/order.css";
import OrderCouponInfo from "components/order/OrderCouponInfo";
import OrderPayInfo from "components/order/OrderPayInfo";
import OrderPaymentInfo from "components/order/OrderPaymentInfo";

export default function Buy() {
    const location = useLocation();
    const bidData = location.state || {
        productId: 1,
        bidPrice: 128000,
        selectedDays: 30,
    };
    const { product, addressInfo } = useBid(bidData);

    const [orderData, setOrderData] = useState({
        productId: 0,
        couponId: 0,
        addressId: 0,
        price: 0,
        exp: 90,
    });

    const [userMemo, setUserMemo] = useState("");
    const [userAddress, setUserAddress] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    // const [payment, setPayment] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponDiscountType, setCouponDiscountType] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);
    // const [couponDiscount, setCouponDiscount] = useState(0);
    const [fee, setFee] = useState(0);

    console.log("data====" + bidData);
    console.log("jasn===" + JSON.stringify(bidData, null, 2));

    console.log("addressInfo==" + addressInfo);
    console.log("product===" + product);

    console.log("useBid==" + product);

    useEffect(() => {
        if (addressInfo && product) {
            setUserAddress(addressInfo);
            const calculatedFee = bidData?.bidPrice * 0.04;
            console.log("calculatedFee=" + calculatedFee);
            setFee(Math.floor(calculatedFee / 10) * 10);

            const newOrderData = {
                addressId: addressInfo.addressId,
                productId: bidData?.productId,
                couponId: selectedCoupon?.coupon?.couponId,
                price: bidData?.bidPrice - Math.floor(calculatedFee / 10) * 10,
                exp: bidData?.selectedDays,
                memo: userMemo,
            };

            setOrderData(newOrderData);

            if (
                addressInfo.addressId &&
                bidData?.productId &&
                bidData?.bidPrice != null
            ) {
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        }
    }, [userAddress, product, userMemo, bidData, selectedCoupon]);

    console.log("orderData===" + orderData);

    return (
        <div className="buy_bg">
            <div className="buy_container">
                <OrderProductInfo product={product} />

                <OrderAddressInfo
                    addressInfo={addressInfo}
                    userAddress={userAddress}
                    setUserAddress={setUserAddress}
                    userMemo={userMemo}
                    setUserMemo={setUserMemo}
                />

                <OrderCouponInfo
                    selectedCoupon={selectedCoupon}
                    setSelectedCoupon={setSelectedCoupon}
                    setCouponAmount={setCouponAmount}
                    setCouponDiscountType={setCouponDiscountType}
                />

                <OrderPayInfo />

                <OrderPaymentInfo
                    fee={fee}
                    couponDiscountType={couponDiscountType}
                    bidPrice={bidData?.bidPrice}
                    orderData={orderData}
                    couponAmount={couponAmount}
                />
            </div>
        </div>
    );
}
