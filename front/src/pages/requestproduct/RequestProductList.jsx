import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SERVER_URL } from "api/serverApi";
import jwtAxios from "utils/jwtUtil";

const ProductRequestList = () => {
    const [requestProducts, setRequestProducts] = useState([]);

    useEffect(() => {
        const fetchRequestProducts = async () => {
            try {
                const response = await jwtAxios.get(
                    `${SERVER_URL}/product/requestList`
                );
                setRequestProducts(response.data);
            } catch (error) {
                console.error("Error fetching request products:", error);
            }
        };

        fetchRequestProducts();
    }, []);

    return (
        <div className="inquiry-registration ">
            <div className="pos-relative">
                <h2>미등록 상품 요청</h2>
                <Link to="/service/request/register">
                    <button className="small-btn title-btn">등록하기</button>
                </Link>
            </div>

            <div className="request-list">
                {requestProducts.map((product) => {
                    const statusText =
                        product.productStatus === "REJECTED"
                            ? "반려"
                            : "요청완료";

                    return (
                        <Link
                            to={`/service/request/${product.productId}`}
                            key={product.productId}
                        >
                            <div className="request-card">
                                <h3>{product.productName}</h3>
                                <p>
                                    <span>Brand:</span> {product.productBrand}
                                </p>
                                <p>
                                    <span>Status:</span> {statusText}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductRequestList;
