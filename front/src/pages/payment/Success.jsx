import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "styles/order_complete.css";
import OrderProduct from "components/order/OrderProduct";
import OrderInfo from "components/order/OrderInfo";
import useOrderApi from "api/order/useOrderApi";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [order, setOrder] = useState(null);

    const [orderId, setOrderId] = useState("");

    const orderApi = useOrderApi({
        orderId: orderId,
    });

    useEffect(() => {
        // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            const response = await fetch("/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();

            if (!response.ok) {
                // 결제 실패 비즈니스 로직을 구현하세요.
                navigate(`/fail?message=${json.message}&code=${json.code}`);
                return;
            }

            const fullOrderId = searchParams.get("orderId"); // 예: "Zi9UdirQdheViE-orderId12345"

            console.log("fasfa" + fullOrderId);
            console.log(requestData.orderId);

            if (fullOrderId) {
                // '-orderId' 뒤의 값만 추출
                const extractedOrderId = fullOrderId.slice(
                    fullOrderId.indexOf("Zi9UdirQdheViE-1c0oca1") +
                        "Zi9UdirQdheViE-1c0oca1".length
                );
                setOrderId(extractedOrderId);
            }

            const orderData = await orderApi.Order();
            console.log(orderId);
            setOrder(orderData);

            // 결제 성공 비즈니스 로직을 구현하세요.
        }
        confirm();
    }, [orderApi, searchParams, navigate]);

    return (
        <div className="success_main">
            <div className="complete_box">
                <OrderProduct />
                {order && <OrderInfo order={order} />}
            </div>
        </div>
    );
}

export default SuccessPage;
