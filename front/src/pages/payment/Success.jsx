import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Order } from "api/order/useOrderApi";

import OrderBuyProduct from "components/order/OrderBuyProduct";
import OrderSaleProduct from "components/order/OrderSaleProduct";
import OrderInfo from "components/order/OrderInfo";

import "styles/order_complete.css";

export function SuccessPage() {
    const location = useLocation();
    const { responseData, type } = location.state || {};

    const queryParams = new URLSearchParams(window.location.search);
    const fullOrderId = queryParams.get("orderId"); // 예: "Zi9UdirQdheViE-orderId12345"
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [order, setOrder] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("tyep====" + type);

    console.log("responseData===" + JSON.stringify(location.state, null, 2));
    console.log("responseData===" + location.state?.responseData);
    console.log(responseData);
    console.log(type);
    // console.log(searchParams.get("orderId"));

    useEffect(() => {
        if (fullOrderId) {
            const extractedOrderId = fullOrderId.slice(
                fullOrderId.indexOf("Zi9UdirQdheViE-") +
                    "Zi9UdirQdheViE-1c0oca1".length
            );
            setOrderId(extractedOrderId);
        }
        if (responseData) {
            setOrderId(responseData);
        }
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const data = await Order(orderId);
                setOrderData(data);
                console.log("data===" + data);
                console.log(JSON.stringify(data, null, 2));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [Order, orderId, fullOrderId]);
    console.log("orderId after===" + orderId);

    // '-orderId' 뒤의 값만 추출

    useEffect(() => {
        // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            // console.log("fasfa" + fullOrderId);
            // console.log(requestData.orderId);

            // const orderData = await Order(orderId);
            // console.log("orderData===" + orderData);

            console.log("order===" + order);

            const response = await fetch("/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();
            // setOrder(orderData);

            if (!response.ok) {
                // 결제 실패 비즈니스 로직을 구현하세요.
                navigate(`/fail?message=${json.message}&code=${json.code}`);
                return;
            }
            // 결제 성공 비즈니스 로직을 구현하세요.
        }

        confirm();
    }, [order, searchParams, navigate]);
    console.log("ord" + orderData);

    return (
        <div className="success_main">
            <div className="complete_box">
                {responseData ? (
                    <OrderSaleProduct orderData={orderData} />
                ) : (
                    <OrderBuyProduct orderData={orderData} />
                )}
                {orderData && <OrderInfo order={orderData} />}
            </div>
        </div>
    );
}

export default SuccessPage;
