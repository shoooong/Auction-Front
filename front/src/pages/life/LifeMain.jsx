import MainNewBuy from "pages/product/MainNewBuy";
import RecommendedStyles from "pages/product/RecommendsStyles";
import MainProductPopular from "pages/product/MainProductPopular";
import MainLatestProduct from "../product/MainLatestProduct";
import MainNewSales from "pages/product/MainNewSales";

import SubBanner from "assets/images/sub-banner.png";

export default function LifeMain() {
    return (
        <>
            <div className="container">
                <MainProductPopular />
                <MainLatestProduct />
            </div>
            <div style={{ margin: "40px 0" }}>
                <img src={SubBanner} alt="sub-banner" className="w100p" />
            </div>
            <div className="container" style={{ marginBottom: "80px" }}>
                <MainNewBuy />
                <MainNewSales />
                <RecommendedStyles />
            </div>
        </>
    );
}
