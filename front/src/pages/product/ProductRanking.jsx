import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import { Box } from "@mui/material";
import Heart from "assets/images/like-on.svg";

const CLOUD_STORAGE_BASE_URL =
    "https://kr.object.ncloudstorage.com/push/shooong/products/";

const ProductRanking = () => {
    const { mainDepartment } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductsByLikes = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/all_product_likes`,
                    {
                        params: { mainDepartment },
                    }
                );
                console.log(
                    "Fetched products:",
                    JSON.stringify(response.data, null, 2)
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products by likes:", error);
                setError("상품 정보를 불러오는 데 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchProductsByLikes();
    }, [mainDepartment]);

    const getFilteredProducts = (departmentName) => {
        return products.filter(
            (product) => product.mainDepartment === departmentName
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const departments = ["clothes", "life", "tech"];
    const departmentNames = {
        clothes: "의류",
        life: "라이프",
        tech: "테크",
    };

    return (
        <div className="container">
            <div
                style={{
                    height: "300px",
                    background: "#ddd",
                    marginBottom: "20px",
                }}
            >
                배너 넣을거야
            </div>
            {departments.map((department) => {
                const departmentProducts = getFilteredProducts(department);
                if (departmentProducts.length === 0) return null;

                return (
                    <div
                        key={department}
                        className={`department-section ${department}`}
                    >
                        <Box className="product-title-box">
                            <h2 className="product-title">
                                지금 많이 거래되는 상품
                            </h2>
                            <h3 className="product-sub-title">
                                {departmentNames[department]}
                            </h3>
                        </Box>
                        <div className="grid grid-column-5 grid-gap-x30 product-wrap">
                            {departmentProducts.map((product) => (
                                <div key={product.productId}>
                                    <Link
                                        to={`/clothes/details/${product.modelNum}`}
                                    >
                                        <div className="product">
                                            <div className="product-img-230">
                                                <img
                                                    src={`${CLOUD_STORAGE_BASE_URL}${product.productImg}`}
                                                    alt={product.productName}
                                                    className="w100p"
                                                />
                                            </div>
                                            <div>
                                                <p className="semibold-black">
                                                    {product.productBrand}
                                                </p>
                                                <p className="light-black">
                                                    {product.productName}
                                                </p>

                                                <span className="red-bullet">
                                                    {product.modelNum}
                                                </span>
                                                <span className="semibold-black">
                                                    {product.biddingPrice
                                                        ? `${Number(
                                                              product.biddingPrice
                                                          ).toLocaleString()} 원`
                                                        : "정보 없음"}
                                                </span>
                                                <span className="light-grey">
                                                    즉시 구매가
                                                </span>
                                                <span
                                                    className="inline-flex align-center black-label"
                                                    style={{
                                                        padding: "5px 0",
                                                    }}
                                                >
                                                    <img
                                                        src={Heart}
                                                        alt="heart"
                                                        style={{
                                                            paddingRight: "5px",
                                                        }}
                                                    />
                                                    {product.productLike}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductRanking;
