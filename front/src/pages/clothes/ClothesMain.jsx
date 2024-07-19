import MainNewBuy from "pages/product/MainNewBuy";
import RecommendedStyles from "../../pages/product/RecommendsStyles"; 
import MainLatestProduct from "../product/MainLatestProduct";
import MainProductPopular from "pages/product/MainProductPopular";
import MainNewSales from "pages/product/MainNewSales";

export default function Clothes() {
    return (
        <div>
            <MainProductPopular />
            <MainLatestProduct />
            <MainNewBuy />
            <MainNewSales />
            <RecommendedStyles />
        </div>
    );
}
