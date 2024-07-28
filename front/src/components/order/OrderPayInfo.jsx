import tossImg from "assets/images/icon-toss.png";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const OrderPayInfo = () => {
    return (
        <div className="pay-info-area info_area">
            <h3 className="title_txt">결제 방법</h3>
            <div className="main_title">
                <p className="desc">일반 결제</p>
                <p className="sub_text">일시불·할부</p>
            </div>
            <button className="payment_btn border_box">
                <span>토스페이</span>
                <img src={tossImg} className="pay_img"></img>
            </button>
            <p className="sub_text">
                체결 후 결제 정보 변경은 불가하며 분할 납부 변경은 카드사 문의
                바랍니다. 단, 카드사별 정책에 따라 분할 납부 변경 시 수수료가
                발생할 수 있습니다.
            </p>
        </div>
    );
};
export default OrderPayInfo;
