import { useState } from "react";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

const OrderSaleProduct = ({ orderData }) => {
    console.log("order===" + orderData);
    console.log("responseData===" + JSON.stringify(orderData, null, 2));
    console.log(
        "responseData===" + JSON.stringify(orderData?.product, null, 2)
    );
    return (
        <div className="order_product_box">
            <h3 className="order_main_title">판매가 완료되었습니다.</h3>
            <p className="order_sub_title">
                거래가 체결되고 상품이 검수에 합격한 후, 등록한 계좌로 정산이
                진행됩니다.
            </p>
            <div className="order_img">
                <img
                    src={`${CLOUD_STORAGE_BASE_URL}/products/${orderData?.product?.productImg}`}
                    alt=""
                />
            </div>
            <button className="buyHistory_btn">판매 내역 상세 보기</button>
            <p className="order_sub_title">
                ‘판매내역 > 입찰 중’ 상태일 때는 입찰 지우기가 가능합니다.
            </p>
        </div>
    );
};

export default OrderSaleProduct;
