import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import useBid from "hooks/useBid";

import "styles/order.css";
import OrderAddressInfo from "components/order/OrderAddressInfo";
import OrderAccountInfo from "components/order/OrderAccountInfo";
import OrderProductInfo from "components/order/OrderProdcutInfo";
import OrderSaleInfo from "components/order/OrderSeleInfo";

export default function Sell() {
    // const [address, setAddress] = useState("");

    const location = useLocation();
    const bidData2 = location.state || {};
    const { product, addressInfo, accountInfo } = useBid(bidData2);

    const [orderData, setOrderData] = useState({
        productId: null,
        price: null,
        exp: null,
        addressId: null,
        memo: null,
    });

    const [type, setType] = useState(0);
    const [fee, setFee] = useState(0);
    const [userAddress, setUserAddress] = useState();
    const [userAccount, setUserAccount] = useState();
    const [userMemo, setUserMemo] = useState("");

    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(true);

    console.log("data====" + bidData2);

    console.log("jasn===" + JSON.stringify(bidData2, null, 2));

    console.log("addressInfo=" + addressInfo);
    console.log("product====" + product);

    console.log("accountInfo===" + accountInfo);
    console.log("bidData2====" + bidData2);

    useEffect(() => {
        // arddress와 product가
        if (addressInfo && product && accountInfo) {
            setUserAddress(addressInfo);
            setUserAccount(accountInfo);

            const calculatedFee = bidData2?.bidPrice * 0.04;
            setFee(Math.floor(calculatedFee / 10) * 10);
        }
    }, [addressInfo, product, bidData2?.bidPrice]);

    // useEffect(() => {
    //     console.log(userMemo);
    //     if (
    //         userAddress?.addressId &&
    //         bidData2?.productId &&
    //         bidData2?.bidPrice != null &&
    //         userAccount
    //     ) {
    //         setOrderData({
    //             productId: bidData2.productId,
    //             price: bidData2.bidPrice - fee,
    //             exp: bidData2.selectedDays,
    //             addressId: userAddress.addressId,
    //             // memo: userMemo,
    //         });
    //         setIsDisabled(false);
    //     } else {
    //         setIsDisabled(true);
    //     }
    // }, [userAddress, userMemo, userAccount, bidData2, fee]);

    useEffect(() => {
        console.log(userMemo);
        if (
            userAddress?.addressId &&
            userAccount &&
            (bidData2?.productId || bidData2?.buyingBiddingId) &&
            bidData2?.bidPrice != null
        ) {
            let newOrderData = null;

            if (bidData2.productId) {
                newOrderData = {
                    productId: bidData2.productId,
                    price: bidData2.bidPrice - fee,
                    exp: bidData2.selectedDays,
                    addressId: userAddress.addressId,
                    memo: userMemo,
                };
                setType("sale");
            } else if (bidData2.buyingBiddingId) {
                newOrderData = {
                    buyingBiddingId: bidData2.buyingBiddingId,
                    price: bidData2.bidPrice - fee,
                    addressId: userAddress.addressId,
                };
                setType("saleNow");
            }

            setOrderData(newOrderData);
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [userAddress, userMemo, userAccount, bidData2, fee]);

    return (
        <div className="buy_bg">
            <div className="buy_container">
                <OrderProductInfo product={product} />

                <OrderAccountInfo
                    userAccount={userAccount}
                    setUserAccount={setUserAccount}
                />

                <OrderAddressInfo
                    addressInfo={addressInfo}
                    userAddress={userAddress}
                    setUserAddress={setUserAddress}
                    userMemo={userMemo}
                    setUserMemo={setUserMemo}
                />

                <OrderSaleInfo
                    bidPrice={bidData2?.bidPrice}
                    fee={fee}
                    orderData={orderData}
                    isDisabled={isDisabled}
                    type={type}
                />
            </div>
        </div>
    );
}
