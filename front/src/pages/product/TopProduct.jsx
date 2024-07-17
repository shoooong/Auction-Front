import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, Button, Box } from "@mui/material";
import BookmarkOff from "../../assets/images/bookmark-off.svg";
import BookmarkOn from "../../assets/images/bookmark-on.svg";
import Product from "./Product";
import "../../styles/product.css";
import tempImg from "../../assets/images/feed6.png";
import { SERVER_URL } from '../../api/serverApi';

const TopProduct = () => {
    const [like, setLike] = useState(false);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(5);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/products/신발`
                );
                const data = response.data.map((product) => ({
                    productId: product.productId,
                    productImg: tempImg,
                    productBrand: product.productBrand,
                    productName: product.productName,
                    productLike: product.productLike,
                    modelNum: product.modelNum,
                    productMinPrice: product.productMinPrice,
                }));
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
    };

    return (
        <div className="container">
            <Box className="box">
                <Box className="product-title-box">
                    <h2 className="product-title">구매입찰이 많은 상품</h2>
                </Box>
                <Box className="product-wrap no-wrap">
                    {products
                        .slice(0, visibleProducts)
                        .map((product, index) => (
                            <Product
                                key={index}
                                rank={index + 1} // 순위 전달
                                productImg={product.productImg}
                                productBrand={product.productBrand}
                                productName={product.productName}
                                productLike={product.productLike}
                                modelNum={product.modelNum}
                                productMinPrice={product.productMinPrice}
                                setLike={setLike}
                                like={like}
                            />
                        ))}
                </Box>

                {visibleProducts < products.length && (
                    <div className="text-center">
                        <Button className="add-btn" onClick={loadMoreProducts}>
                            더보기
                        </Button>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default TopProduct;
