import prImg from "assets/images/sample.png";

const OrderSaleNowProduct = (product) => {
    return (
        <div className="order_product_box">
            <h3 className="order_main_title">판매가 완료되었습니다.</h3>
            <p className="order_sub_title">
                거래가 체결되고 상품이 검수에 합격한 후, 등록한 계좌로 정산이
                진행됩니다.
            </p>
            <div className="order_img">
                <img src={prImg} alt="" />
            </div>
            <button className="buyHistory_btn">판매 내역 상세 보기</button>
            <p className="order_sub_title">
                ‘판매내역 > 진행 중’에서 진행 상황을 확인할 수 있습니다.
            </p>
        </div>
    );
};

export default OrderSaleNowProduct;
