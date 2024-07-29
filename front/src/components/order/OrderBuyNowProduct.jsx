import prImg from "assets/images/sample.png";

const OrderBuyNowProduct = (product) => {
    return (
        <div className="order_product_box">
            <h3 className="order_main_title">구매가 완료되었습니다.</h3>
            <p className="order_sub_title">
                검수에 합격한 상품이 등록한 배송지로 배송됩니다.
            </p>
            <div className="order_img">
                <img src={prImg} alt="" />
            </div>
            <button className="buyHistory_btn">구매 내역 상세 보기</button>
            <p className="order_sub_title">
                ‘구매내역 > 진행 중' 에서 진행 상황을 확인할 수 있습니다.
            </p>
        </div>
    );
};

export default OrderBuyNowProduct;
