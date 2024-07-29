// import React, { useState, useEffect } from "react";

// import jwtAxios from "utils/jwtUtil";

// // 입찰 등록
// // 입찰 -> 주문페이지(productId,)
// export default function useBid(data) {
//     // 상태 정의

//     const [product, setProduct] = useState(null);
//     const [bidding, setBidding] = useState(null);
//     const [addressInfo, setAddressInfo] = useState(null);
//     const [accountInfo, setAccountInfo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // useEffect 훅을 사용해 데이터 가져오기
//     useEffect(() => {
//         const fetchData = async () => {
//             console.log(
//                 "userbidproductjasn===" + JSON.stringify(data, null, 2)
//             );
//             console.log(data);
//             try {
//                 setLoading(true);
//                 setError(null);

//                 // 상품 정보와 배송지 정보 가져오기

//                 if (data?.productId) {
//                     const productResponse = await jwtAxios.get(
//                         `/order/productOne`,
//                         {
//                             params: {
//                                 productId: data?.productId,
//                             },
//                         }
//                     );
//                     setProduct(productResponse.data);
//                 }

//                 if (data?.salesBiddingId) {
//                     const salesResponse = await jwtAxios.get(`/order/buy`, {
//                         params: {
//                             salesBiddingId: data?.salesBiddingId,
//                         },
//                     });
//                     setProduct(salesResponse.data.product);
//                     const updatedProduct = {
//                         ...product,
//                         price: salesResponse.salesBiddingPrice,
//                     };
//                     setProduct(updatedProduct);
//                 }

//                 if (data?.buyingBiddingId) {
//                     const buyingResponse = await jwtAxios.get(`/order/sales`, {
//                         params: {
//                             buyingBiddingId: data?.buyingBiddingId,
//                         },
//                     });
//                     setProduct(buyingResponse.data.product);
//                     const updatedProduct = {
//                         ...product,
//                         price: buyingResponse.buyingBiddingPrice,
//                     };
//                     setProduct(updatedProduct);
//                 }

//                 const accountInfoResponse = await jwtAxios.get(
//                     `/mypage/account`
//                 );

//                 const addressInfoResponse = await jwtAxios.get(`/order/addr`);

//                 setAccountInfo(accountInfoResponse.data);

//                 setAddressInfo(addressInfoResponse.data);

//                 // console.log(product);
//                 // console.log(addressInfo);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (data?.productId || data?.salesBiddingId || data?.buyingBiddingId) {
//             fetchData();
//         }
//     }, []);
//     // 로딩 상태 처리
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     // 에러 처리
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return { product, addressInfo, accountInfo };
// }

import React, { useState, useEffect } from "react";
import jwtAxios from "utils/jwtUtil";

export default function useBid(data) {
    // 상태 정의
    const [product, setProduct] = useState(null);
    const [addressInfo, setAddressInfo] = useState(null);
    const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // 상품 정보 가져오기
                if (data?.productId) {
                    const productResponse = await jwtAxios.get(
                        "/order/productOne",
                        {
                            params: {
                                productId: data?.productId,
                            },
                        }
                    );
                    setProduct(productResponse.data);
                }

                // 판매 입찰 정보 가져오기
                if (data?.salesBiddingId) {
                    const salesResponse = await jwtAxios.get("/order/sales", {
                        params: {
                            salesBiddingId: data?.salesBiddingId,
                        },
                    });

                    setProduct(salesResponse?.data?.product);

                    // 판매 입찰 정보가 있다면 상품의 가격을 업데이트
                    setProduct((prevProduct) => ({
                        ...prevProduct,
                        price: salesResponse.data.salesBiddingPrice,
                        salesBiddingId: salesResponse.data.salesBiddingId,
                    }));
                }

                // 구매 입찰 정보 가져오기
                if (data?.buyingBiddingId) {
                    const buyingResponse = await jwtAxios.get("/order/buy", {
                        params: {
                            buyingBiddingId: data?.buyingBiddingId,
                        },
                    });

                    setProduct(buyingResponse.data.product);
                    // 구매 입찰 정보가 있다면 상품의 가격을 업데이트
                    setProduct((prevProduct) => ({
                        ...prevProduct,
                        price: buyingResponse.data.buyingBiddingPrice,
                        buyingBiddigId: buyingResponse.data.buyingBiddingId,
                    }));
                }

                // 계좌 정보 가져오기
                const accountInfoResponse = await jwtAxios.get(
                    "/mypage/account"
                );
                setAccountInfo(accountInfoResponse.data);

                // 배송지 정보 가져오기
                const addressInfoResponse = await jwtAxios.get("/order/addr");
                setAddressInfo(addressInfoResponse.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (data?.productId || data?.salesBiddingId || data?.buyingBiddingId) {
            fetchData();
        }
    }, [data]);

    // 로딩 상태 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러 처리
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return { product, addressInfo, accountInfo };
}
