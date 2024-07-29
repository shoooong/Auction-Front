import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

import { useEffect, useState } from "react";

const OrderProductInfo = (product) => {
    const [productData, setProductData] = useState();

    useEffect(() => {
        if (product) {
            setProductData(product);
        } else {
            setProductData({
                modelNum: "",
                productId: null,
                productBrand: "",
                productName: "",
                subDepartment: "",
                productImg: "",
                productSize: "",
            });
        }
        console.log("account===" + JSON.stringify(product, null, 2));
        console.log("product===" + JSON.stringify(productData, null, 2));
    }, [product]);
    return (
        <div className="product_info_area info_area">
            <div className="product_info">
                <div className="buy_product">
                    <img
                        src={`${CLOUD_STORAGE_BASE_URL}/products/${productData?.product?.productImg}`}
                        alt="상품 이미지"
                    ></img>
                </div>
                <div className="product_detail">
                    <p className="product_model_number bold_title">
                        {productData?.product?.modelNum}
                    </p>
                    <p className="model_eng">
                        {productData?.product?.productName}
                    </p>
                    <p className="model_kor">
                        {productData?.product?.productName}
                    </p>
                    <p className="size_txt">
                        {productData?.product?.productSize}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderProductInfo;
